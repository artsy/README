import * as fs from "fs"
import * as includes from "lodash.includes"
import * as getYAMLHeadline from "markdown-yaml-metadata-parser"
import { execSync } from "child_process"
import * as glob from "glob"

import { join } from "path"

const skipFolders = ["node_modules", "scripts"]
const aboveTOC = "<!-- prettier-ignore-start -->\n<!-- start_toc -->"
const belowTOC = "<!-- end_toc -->\n<!-- prettier-ignore-end -->"

const readmeFolders = fs
  .readdirSync(".")
  .filter(f => fs.lstatSync(f).isDirectory()) // dirs only
  .filter(f => !includes(skipFolders, f)) // ignore particular folders
  .filter(f => f.indexOf(".") !== 0) // no .git or .vscode

// Create an overview README per folder
readmeFolders.forEach(folder => {
  const readmePath = join(folder, "README.md")

  // Make something if there is nothing there yet
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `### [TODO]\n\n${aboveTOC}\n${belowTOC}\n\n[TODO]`, "utf8")
  }

  // We want to swap out the center of a toc with a new version of the README
  const content = fs.readFileSync(readmePath, "utf8")
  const before = `${content.split(aboveTOC)[0]}${aboveTOC}\n`
  const after = `\n${belowTOC}${content.split(belowTOC)[1]}`

  // Make a TOC with all the markdown files in that folder
  const docs = fs
    .readdirSync(folder)
    .filter(f => f !== "README.md") // No READMEs
    .map(f => join(folder, f))
    .filter(f => fs.lstatSync(f).isFile()) // files only
    .filter(f => includes(f, ".md")) // only md files
    .map(subREADMEPath => {
      const subREADMEContents = fs.readFileSync(subREADMEPath, "utf8")
      const headerMetadata = getYAMLHeadline(subREADMEContents).metadata

      const title =
        (headerMetadata && headerMetadata.title) || `[TODO] add title via yml front-matter to ${subREADMEPath}`
      const description =
        (headerMetadata && headerMetadata.description) ||
        `[TODO] add description via yml front-matter to ${subREADMEPath}`

      return `| [${title}](/${subREADMEPath}#readme) | ${description} |`
    })

  const inside = `| Doc | Overview |\n|--|--|\n${docs.join("\n")}`

  const newContent = `${before}${inside}${after}`
  fs.writeFileSync(readmePath, newContent, "utf8")
})

// Edit the root README to highlight the areas of docs
const content = fs.readFileSync("README.md", "utf8")
const before = `${content.split(aboveTOC)[0]}${aboveTOC}\n`
const after = `\n${belowTOC}${content.split(belowTOC)[1]}`

const docs = readmeFolders.map(f => {
  const jsonPath = join(f, "summary.json")
  if (!fs.existsSync(jsonPath)) {
    return `| [[TODO] Add a summary.json to ${f}](/${f}) | [TODO] |`
  } else {
    const settings = JSON.parse(fs.readFileSync(jsonPath, "utf8"))
    return `| [${settings.title}](/${f}#readme) | ${settings.description} |`
  }
})
const inside = `| Section |  |\n|--|--|\n${docs.join("\n")}`
const newContent = `${before}${inside}${after}`
fs.writeFileSync("README.md", newContent, "utf8")

// Update the TOC on files that have the "<!-- START doctoc -->" tag
glob("**/**/*.md", (err, matches) => {
  matches.forEach(f => {
    // Skip those modules
    if (f.indexOf("node_modules") !== -1) {
      return
    }

    const content = fs.readFileSync(f, "utf8")
    if (content.indexOf("<!-- START doctoc ") !== -1) {
      execSync(`yarn doctoc ${f}`)
    }
  })
})
