import { danger, warn } from "danger"
import { readFileSync } from "fs"

const files = [...danger.git.created_files, ...danger.git.modified_files]
const markdowns = files.filter(f => f.indexOf(".md") !== -1)
const skipTODOCheck = ["dangerfile.ts", "CONTRIBUTING.md"]

// Check for [TODO]s in all files changed
markdowns.forEach(f => {
  if (skipTODOCheck.indexOf(f) !== -1) {
    return
  }

  const content = readFileSync(f, "utf8")
  const lines = content.split("\n")
  lines.forEach(l => {
    if (l.indexOf("[TODO]") !== -1) {
      const isLocal = !!danger.github
      const message = isLocal ? `TODO detected in ${f}:${lines.indexOf(l)}` : "TODO Detected"
      warn(message, f, lines.indexOf(l))
    }
  })
})
