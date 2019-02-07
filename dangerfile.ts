import { danger, warn, fail } from "danger"
import { readFileSync } from "fs"
import { basename } from "path"

const files = [...danger.git.created_files, ...danger.git.modified_files]
const markdowns = files.filter(f => f.indexOf(".md") !== -1)
const skipTODOCheck = ["dangerfile.ts", "CONTRIBUTING.md"]

// Check for [TODO]s in all files changed

const wordsToAvoid = [
  { word: "Github", reason: "Please use GitHub, capital 'H'" },
  { word: "Cocoapods", reason: "Please use CocoaPods, capital 'P'" },
  { word: "Javascript", reason: "Please use JavaScript, capital 'S'" },
  { word: "Typescript", reason: "Please use TypeScript, capital 'S'" },
  { word: "Fastlane", reason: "Please use fastlane, lowercase 'f'" },
  { word: "localhost:4000", reason: "You may have left an internal link in the markdown" },
  { word: "[]: ???", reason: "You've missed a link" },
  { word: "[TODO]", reason: "You may have missed a TODO here" },
  { word: "react native", reason: "Please use React Native with capitals" }
]

markdowns.forEach(f => {
  if (skipTODOCheck.indexOf(f) !== -1) {
    return
  }

  const content = readFileSync(f, "utf8")
  const lines = content.split("\n")
  lines.forEach(l => {
    wordsToAvoid.forEach(word => {
      if (lines.indexOf(word.word) !== -1) {
        const isLocal = !danger.github
        const message = isLocal ? `${word.reason} in ${f}:${lines.indexOf(l) + 1}` : word.reason
        warn(message, f, lines.indexOf(l) + 1)
      }
    })
  })
})

// Ensure we stay with kebab-case
const underscores = danger.git.created_files.filter(f => basename(f).indexOf("_") !== -1)
underscores.forEach(path => {
  fail(`Found a new file with underscores, this repo uses kebab-case for files: ${path}`)
})
