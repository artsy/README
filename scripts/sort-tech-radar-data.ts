import { readFileSync, writeFileSync } from "fs"

const DATA_FILE = "./playbooks/technology_radar/data.csv"

enum FIELDS {
  NAME = 0,
  RING,
  QUADRANT,
  IS_NEW,
  DESC
}

const data = readFileSync(DATA_FILE, "utf8")

const [headers, ...entries] = data.split("\n")

const sortedEntries = entries
  .filter(e => e.trim().length > 0)
  .sort((a, b) => {
    const fieldsA = a.split(",")
    const fieldsB = b.split(",")
    return (
      fieldsA[FIELDS.QUADRANT].localeCompare(fieldsB[FIELDS.QUADRANT]) ||
      fieldsA[FIELDS.NAME].localeCompare(fieldsB[FIELDS.NAME])
    )
  })

writeFileSync(DATA_FILE, [headers, ...sortedEntries].join("\n"), "utf8")
