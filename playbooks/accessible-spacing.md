---
title: Accessible Spacing
description: Using tabs instead of spaces for indentation, for easier reading.
---

## Accessible Spacing

We use tabs for indentation in our JS/TS code.

We do this because we want each developer to be able to set their own tab width for maximum readability, and not be forced to use 2 spaces.

To set your tab width, you can:
- use a `.editorconfig` file in your home dir, with a config similar to
```
[*]
tab_width = 4
```
which will not change anything in the actual code files, but it will make your editor render tabs as 4-wide. You sometimes need an editor plugin https://editorconfig.org/#download.

- use your editor's settings (eg. `"editor.tabSize": 4` for VSCode, `set tabstop=4` in vim, etc).
