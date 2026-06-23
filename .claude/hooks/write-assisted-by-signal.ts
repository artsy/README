#!/usr/bin/env node
// Claude Code PostToolUse hook: accumulates Assisted-by trailers after file edits.
// Reads the current model from the session transcript (handles mid-session model
// changes) and records one trailer per unique model used since the last commit.
//
// Written in TypeScript (the repo's language) and run directly via Node's native
// type-stripping (`node file.ts`, no ts-node), which is fast enough to run after
// every edit. Requires node >= 22.18; on older node it fails open (no trailer,
// the commit still succeeds).
//
// The signal is stored in the repository's own .git directory (not ~/.claude) so
// it is scoped to this repo and never collides with work in another checkout.
// Signal file format (<git-dir>/pending-assisted-by):
//   <unix-timestamp>
//   Assisted-by: Claude:Opus-4.8 [claude-code]
//   Assisted-by: Claude:Sonnet-4.6 [claude-code]

// CommonJS require (with type casts) rather than `import`, so Node parses this
// as CommonJS and runs it without the MODULE_TYPELESS_PACKAGE_JSON warning the
// repo's type-less package.json would otherwise trigger on an ESM .ts file.
const fs = require("node:fs") as typeof import("node:fs")
const path = require("node:path") as typeof import("node:path")
const { execFileSync } = require("node:child_process") as typeof import("node:child_process")

interface Payload {
  transcript_path?: string
  cwd?: string
}

interface TranscriptEntry {
  model?: string
  message?: { model?: string }
}

let payload: Payload
try {
  payload = JSON.parse(fs.readFileSync(0, "utf8"))
} catch {
  process.exit(0)
}

// A missing/unreadable transcript is handled by currentModel (returns null).
const transcript = payload.transcript_path
if (!transcript) process.exit(0)

const cwd = payload.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd()

let gitDir: string
try {
  gitDir = execFileSync("git", ["rev-parse", "--absolute-git-dir"], {
    cwd,
    encoding: "utf8"
  }).trim()
} catch {
  process.exit(0) // not a git repo — nothing to attribute
}
const signalFile = path.join(gitDir, "pending-assisted-by")

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

function normalize(raw: string): string | null {
  // claude-opus-4-8 -> Claude:Opus-4.8 ; claude-haiku-4-5-20251001 -> Claude:Haiku-4.5
  let m = raw.match(/^claude-([a-z]+)-(\d+)-(\d+)/)
  if (m) return `Claude:${cap(m[1])}-${m[2]}.${m[3]}`
  // older ordering: claude-3-5-sonnet-20241022 -> Claude:Sonnet-3.5
  m = raw.match(/^claude-(\d+)-(\d+)-([a-z]+)/)
  if (m) return `Claude:${cap(m[3])}-${m[1]}.${m[2]}`
  return null
}

function currentModel(file: string): string | null {
  let buf: Buffer
  try {
    const fd = fs.openSync(file, "r")
    const { size } = fs.fstatSync(fd)
    const len = Math.min(size, 100000)
    buf = Buffer.alloc(len)
    fs.readSync(fd, buf, 0, len, size - len)
    fs.closeSync(fd)
  } catch {
    return null
  }
  const lines = buf.toString("utf8").split("\n")
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim()
    if (!line) continue
    let entry: TranscriptEntry
    try {
      entry = JSON.parse(line)
    } catch {
      continue
    }
    const raw = entry.model || entry.message?.model || ""
    if (raw && raw !== "<synthetic>") {
      const name = normalize(raw)
      if (name) return name
    }
  }
  return null
}

const model = currentModel(transcript)
if (!model) process.exit(0)

const trailer = `Assisted-by: ${model} [claude-code]`

// Load existing trailers if the signal is fresh (<1h); otherwise start over.
let trailers: string[] = []
try {
  const content = fs
    .readFileSync(signalFile, "utf8")
    .split("\n")
    .filter(Boolean)
  const fresh =
    content.length > 0 && /^\d+$/.test(content[0]) && Date.now() / 1000 - parseInt(content[0], 10) <= 3600
  if (fresh) {
    trailers = content.slice(1).filter(l => l.startsWith("Assisted-by:"))
  }
} catch {
  trailers = []
}

// Add this model's trailer if not already present (preserve first-seen order).
if (!trailers.includes(trailer)) trailers.push(trailer)

// Atomic write so prepare-commit-msg never reads a half-written signal file.
const tmp = `${signalFile}.tmp`
fs.writeFileSync(tmp, `${Math.floor(Date.now() / 1000)}\n${trailers.join("\n")}\n`)
fs.renameSync(tmp, signalFile)
