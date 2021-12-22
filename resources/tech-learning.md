---
title: How to get started on any of our tech stacks
description: The getting started guides
---

# Tech Learning

We often hear that learning to google (or perhaps [DuckDuckGo](https://duckduckgo.com/)) and use stack overflow are
the most important core competencies of any programmer, but growth and learning happen best outside the vacuum of
the internet. This page is a list of the engineering team's favorite resources -tutorials, essays, starting points
and general thoughts- on a variety of programming topics.

This is a living document; if you find something out of date or have an addition please open a pull request.

## Good starting points & tools

| Name                                   | Description                                                                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [b0rk's zines][zines]                  | [Julia Evans](https://www.twitter.com/b0rk) makes great comics about \*nix programming - [here's a team favorite on learning](https://jvns.ca/wizard-zine.pdf) |
| [Learn X in Y minutes][learn_x_in_y]   | Scenic tours of pretty much every language                                                                                                                     |
| [exercism.io][]                        | Algorithmic code challenges with social feedback                                                                                                               |
| [@damassi/learn-vim][learn_vim]        | "It's not so bad, really."                                                                                                                                     |
| [what-happens-when][what_happens_when] | An answer to the classic interview question, "what happens when you type google.com into your browser and hit enter?"                                          |

## &nbsp;

## Languages + General Tools

### JavaScript + NodeJS

_See also [Frontend Practice Resources](#frontend-practice) below_

| Name                                       | Description                                                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [JavaScript: The Weird Parts][js_weird]    | [video] - 'An advanced Javascript course for everyone, giving a deep understanding of the language by understanding how it works under the hood' |
| [Intro to ES6][es6]                        | An intro to modern JS features                                                                                                                   |
| [Modern JS explained for dinosaurs][dinos] | How we got from `<script src='foo'/> <script src='bar' /> <script...` to `export default App`                                                    |

&nbsp;
### React

_See also [Platform Practice Resources](#platform-practice) below_

| Name                                           | Description                               |
| ---------------------------------------------- | ----------------------------------------- |
| [advancedreact][advancedreact]                 | Advanced React course. For access check 1Password in the engineering vault “React + Graph QL Course)”   |

<!--
&nbsp;
### Ruby

_See also [Platform Practice Resources](#platform-practice) below_

| Name                                           | Description                               |
| ---------------------------------------------- | ----------------------------------------- |
| [ruby-doc.org][rdoc]                           | Tons of info, efficiently-laid-out here   |
| [Why's Poignant Guide to Ruby][poignant_guide] | Tons of context, not efficiently-laid-out |
| []()                                           |                                           |

<!--
&nbsp;
### Elixir
*See also [Platform Practice Resources](#platform-practice) below*
| Name | Description |
| -- | -- |
| []() |  |
-->

&nbsp;

### Scala

_See also [Platform Practice Resources](#platform-practice) below_

| Name                                                                             | Description                                                                |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Scala Exercises][scala_exercises]                                               | Exercises divided by topic (std lib, akka, play, fp...)                    |
| [Ramping up a team in scala][ramping_scala]                                      | Short video tour of the language from Thoughtworks engineer Susie Marshall |
| [Effective Scala][effective_scala]                                               | Style Guide + Patterns from Twitter                                        |
| [Free ebooks from Underscore][underscore]                                        | Essential Scala, Slick, Play...                                            |
| [Scala Book](https://docs.scala-lang.org/overviews/scala-book/introduction.html) | Free Scala book from Alvin Alexander                                       |

&nbsp;

### iOS, React Native, Swift & Objective C

iOS, and specifically iOS at Artsy, is such a large topic that we have resources collected under the
[`mobile` directory](./mobile).

| Name                             | Description                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| [Cocoa Core Competencies][cocoa] | Deprecated but still useful context around development for iOS, especially Objective-C |

## &nbsp;

## Practice Groups

### Platform Practice

| Name                                         | Description                                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [RailsGuides][railsguides]                   | Good starting points for foundational Rails Concepts, covention over configuration and so on |
| [Michael Hartl's Rails Tutorial][rails_tuts] | Another popular rails tutorial in book form                                                  |
| [Platform Practice][plat]                    |                                                                                              |

### Web Practice

| Name                                               | Description                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [[A.] JavaScriptures][javascriptures]              | A series of Artsy workshops covering our 2018 frontend stack: Js, TypeScript, React, Relay and more                      |
| [[A.] Is GraphQL the future?][is_graphql]          | Thoughts from Artsy Alum Alan Johnson                                                                                    |
| [Getting Started- React][getting_started_react]    | From the official react docs                                                                                             |
| [React Patterns][react_patterns]                   | A rundown on clean & effective react syntax                                                                              |
| [How to pass props to components in React][props]  | Key to understanding React as a whole                                                                                    |
| [Learn GraphQL][learn_gql]                         | "GraphQL is a query language for your API" - specify only the data you need in the shape that works for your application |
| [Relay][relay]                                     | Define your components' api dependencies in the same file and let relay request them automatically via GraphQL           |
| [Redux - Egghead.io][redux_egghead]                | [subscription required] An introduction to Redux with creator Dan Abramov                                                |
| [A Gist about Jest and Enzyme][jest_enz]           | Difference between `shallow`, `mount` and `render` of Enzyme                                                             |
| [TypeScript Deep Dive][ts_dive]                    | Get to the part where TypeScript feels good quicker                                                                      |
| [The hidden power of Jest matchers][jest_matchers] | Check out all the cool matchers built into Jest                                                                          |

### Mobile Practice

_See also [JavaScript](#javascript-+-nodejs) & [Swift + Objective C](#swift-+-objective-c)_

| Name                                               | Description       |
| -------------------------------------------------- | ----------------- |
| [React Native][rn]                                 | The official docs |
| [iOS Learning Group (Notion) 🔐][ios_learn_notion] |                   |
| [iOS Learning Resources][ios_learn]                |                   |

<!--
  ## MORE: Papers we love? Computer Science Topics? Emotional Intelligence x tech? ...
-->
[advancedreact]: https://advancedreact.com/
[zines]: https://jvns.ca/zines
[learn_x_in_y]: https://learnxinyminutes.com/
[learn_vim]: https://github.com/damassi/learn-vim
[exercism.io]: https://exercism.io
[js_weird]: https://youtu.be/Bv_5Zv5c-Ts
[es6]: https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f
[dinos]: https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70
[rdoc]: https://ruby-doc.org/core-2.5.1/
[poignant_guide]: https://poignant.guide/book/chapter-3.html
[scala_exercises]: https://www.scala-exercises.org/
[ramping_scala]: https://www.thoughtworks.com/talks/scala-the-good-parts-how-to-ramp-up-a-team-in-scala
[effective_scala]: https://twitter.github.io/effectivescala
[underscore]: https://underscore.io/training
[cocoa]: https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Cocoa.html
[railsguides]: https://guides.rubyonrails.org
[rails_tuts]: https://www.railstutorial.org/book
[plat]: /practices/platform.md
[javascriptures]: https://artsy.github.io/series/javascriptures
[is_graphql]: https://artsy.github.io/blog/2018/05/08/is-graphql-the-future
[getting_started_react]: https://reactjs.org/docs/getting-started.html
[react_patterns]: https://reactpatterns.com
[props]: https://www.robinwieruch.de/react-pass-props-to-component
[learn_gql]: https://graphql.org/learn
[relay]: https://auth0.com/blog/getting-started-with-relay/
[redux_egghead]: https://egghead.io/lessons/react-redux-the-single-immutable-state-tree
[jest_enz]: https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913
[ts_dive]: https://basarat.gitbooks.io/typescript
[rn]: https://facebook.github.io/react-native
[jest_matchers]: https://medium.com/@boriscoder/the-hidden-power-of-jest-matchers-f3d86d8101b0
[what_happens_when]: https://github.com/alex/what-happens-when
[ios_learn]: ../resources/mobile/README.md
[ios_learn_notion]: https://www.notion.so/artsy/iOS-Learning-Plan-262fe977a5f44c9d96470e685fffbe64
