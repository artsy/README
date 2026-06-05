---
title: RFC
description: Use Version Constraints for Dependencies
---

## Proposal

All repository dependencies should include version constraints.

For example:

```ruby
# Gemfile
gem "elasticsearch", "< 7.14" # https://github.com/elastic/elasticsearch-ruby/issues/1429
gem "estella", "~> 7.0"
gem "omniauth", "1.9.2"
```

```typescript
// package.json
{
	...
	dependencies {
		...
		"dotenv": "4.0.0",
		"easy-peasy": "^6.1.0",
		"ejs": "3.1.10",
		"express": "4.22.1",
	}
}
```

## Reasoning

While Artsy _generally_ does use dependency version constraints (can't speak to Artnet), we have discrepancies between repos and a recent PR generate debate about the necessity of defining version constraints. It would be nice for us to have a position on this for quick decision making.

More generally, dependency management is a constant maintenance task that includes risk when not properly implemented. Untested versions can (and often do) break functionality and/or introduce security vulnerabilities.

Version constraints encourage deliberate decision making around our dependencies and can help prevent unintentional breakages. They also allow us to use native dependency manager functionality, e.g. `bundle update` or `npm update`, which can be helpful for maintenance.

## Exceptions

Internal packages (e.g. `@artsy/palette`) would be exempted, but their own dependencies should include versions.

Code/repo maintainers should ultimately decide if a dependency should be unrestricted, but this should be an exception and its reasoning should be documented with a comment.

This RFC is constrained to `typescript`, `javascript`, `ruby` and `python` dependencies as I can't speak on other language version management.

## Additional Context

### Is this really necessary if we're using lockfiles?

- Lockfiles are important for dependency management as they give us deterministic installs, which is critical for our CI/CD pipeline, but they are designed to be modified by the dependency manager the generates them and not modified directly. Not using version constraints can break native dependency manager functionality, e.g. `bundle update`. Manifests are for humans, lockfiles are for computers.

### What is your position on how we should version them? Pin/pessimistic/optimistic versioning?

- This RFC doesn't take a position on which versioning strategy should be used. In practice it will depend on the dependency and any opinions of the code/repo maintainers. It just suggests we should version as the default.

### Has this ever actually been an issue at Artsy?

- I'll admit I was surprised my slack search didn't surface more examples of dependency issues. The last I can recall off the top of my head was the [cython version update fallout](https://artsy.slack.com/archives/CA8SANW3W/p1691420429917559). But I'm guessing this RFC may surface others. If not, I would still argue its good practice as it encourages deliberate decision making around our dependencies.

## How is this RFC resolved?

- If approved, A new github action is added to our repos adding a non-blocking warning for dependency updates that don't use version control.
- If rejected, no action is taken, but this RFC will be preserved for future reference, as needed.

