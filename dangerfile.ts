import { danger, warn } from "danger"
import { readFileSync } from "fs"

const files = [...danger.git.created_files, ...danger.git.modified_files]
const markdowns = files.filter(f => f.indexOf(".md") !== -1)

// Check for [TODO]s in all files changed
markdowns.forEach(f => {
  const content = readFileSync(f, "utf8")
  const lines = content.split("\n")
  lines.forEach(l => {
    if (l.includes("[TODO]")) {
      warn(`TODO detected in ${f}:${lines.indexOf(l)}`, f, lines.indexOf(l))
    }
  })
})
