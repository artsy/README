{
  "devDependencies": {
    "@types/node": "^10.7.1",
    "danger": "^7.0.9",
    "doctoc": "^1.3.1",
    "glob": "^7.1.2",
    "husky": "^0.14.3",
    "lint-staged": "^7.2.2",
    "lodash.includes": "^4.3.0",
    "markdown-yaml-metadata-parser": "^1.1.0",
    "prettier": "^1.16.4",
    "ts-node": "^7.0.1",
    "typescript": "^3.0.1"
  },
  "scripts": {
    "precommit": "yarn setup-structure; yarn sort-tech-radar-data; lint-staged",
    "prepush": "echo 'skipping yarn danger local'",
    "setup-structure": "ts-node --skip-project scripts/create-readmes.ts; git add .",
    "sort-tech-radar-data": "ts-node scripts/sort-tech-radar-data.ts; git add ."
  },
  "lint-staged": {
    "*.{ts,json,md}": [
      "yarn prettier --write",
      "git add"
    ]
  },
  "prettier": {
    "printWidth": 115,
    "semi": false,
    "singleQuote": false,
    "bracketSpacing": true,
    "proseWrap": "always"
  },
  "license": "CC-BY-4.0"
}
