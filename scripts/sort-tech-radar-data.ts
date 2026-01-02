/**
 * This script organizes technology radar entries in a consistent order for better readability and maintenance.
 */

import { readFileSync, writeFileSync } from "fs"

const DATA_FILE = "./playbooks/technology_radar/artsy-tech-radar.csv"

enum FIELDS {
  NAME = 0,
  RING,
  QUADRANT,
  IS_NEW,
  DESC
}

const RING_ORDER = ["adopt", "trial", "assess", "hold"]

const data = readFileSync(DATA_FILE, "utf8")

const [headers, ...entries] = data.split("\n")

/**
 * Sorts entries by:
 * - Ring (adopt → trial → assess → hold)
 * - Quadrant (alphabetically)
 * - Name (alphabetically)
 */
const sortedEntries = entries.filter(e => e.trim().length > 0).sort((a, b) => {
  const fieldsA = a.split(",")
  const fieldsB = b.split(",")
  return (
    RING_ORDER.indexOf(fieldsA[FIELDS.RING]) - RING_ORDER.indexOf(fieldsB[FIELDS.RING]) ||
    fieldsA[FIELDS.QUADRANT].localeCompare(fieldsB[FIELDS.QUADRANT]) ||
    fieldsA[FIELDS.NAME].localeCompare(fieldsB[FIELDS.NAME])
  )
})

writeFileSync(DATA_FILE, [headers, ...sortedEntries].join("\n"), "utf8")
