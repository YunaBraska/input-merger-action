# input-merger-action

Combines user and default inputs for your workflows.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=HFHFUT3G6TZF6)

[![Build][build_shield]][build_link]
[![Maintainable][maintainable_shield]][maintainable_link]
[![Coverage][coverage_shield]][coverage_link]
[![Issues][issues_shield]][issues_link]
[![Commit][commit_shield]][commit_link]
[![License][license_shield]][license_link]
[![Tag][tag_shield]][tag_link]
[![Size][size_shield]][size_shield]
![Label][label_shield]
![Label][node_version]

## Motivation
I just want to use the inputs without taking care where they come from (rest, ui, trigger).

## Usage

```yaml
# RUNNER
on:
  repository_dispatch:
  workflow_call:
    inputs:
      input_1:
        type: string
        required: false
        default: 'default_1'
      input_2:
        type: string
        required: false
        default: 'default_2'
  workflow_dispatch:
    inputs:
      input_1:
        type: string
        required: false
        default: 'default_3'
      input_2:
        type: string
        required: false
        default: 'default_4'

jobs:
  tag:
    runs-on: ubuntu-latest
    steps:
      - name: "Read Input Info"
        id: "input_info"
        uses: YunaBraska/input-merger-action@main

      # PRINT
      - name: "Print Input Info"
        run: |
          echo "input_1 [${{ steps.input_info.outputs.input_1 }}]"
          echo "input_2 [${{ steps.input_info.outputs.input_2 }}]"

```

### Inputs

| parameter              | default | description                                                            |
|------------------------|---------|------------------------------------------------------------------------|
| work-dir               | '.'     | work dir                                                               |
| ignore-files           | null    | regex list to ignore files (comma separated) e.g. '/\.txt$/, /\.doc$/' |
| branch-fallback        | 'main'  | fallback if no branch_default could be found                           |
| tag-fallback           | null    | fallback if no tag could be found                                      |
| fallback-commit-type   | ''      | fallback for commits without type (Conventional Commits)               |
| fallback-commit-scope  | ''      | fallback for commits without scope (Conventional Commits)              |
| commit-msg-with-footer | true    | include footer from commit messages (Conventional Commits)             |

### Outputs

| Name                        | default | description                                                                               |
|-----------------------------|---------|-------------------------------------------------------------------------------------------|
| branch                      | main    | current branch                                                                            |
| branch_default              | main    | default branch                                                                            |
| commits_ahead               | 0       | branch commits that are not in the branch_default                                         |
| commits_behind              | 0       | branch_default commits that are not in the branch                                         |
| is_default_branch           | false   | true if `branch` == `branch_default`                                                      |
| has_changes                 | false   | true if `sha_latest` != `sha_latest_tag`                                                  |
| has_local_changes           | false   | true if there are changes on non committed files                                          |
| has_breaking_changes        | false   | true if a commit has a breaking change (Conventional Commits)                             |
| sha_latest                  | null    | sha from latest commit                                                                    |
| sha_latest_tag              | null    | sha from latest tag                                                                       |
| tag_latest                  | 0.0.1   | latest tag                                                                                |
| ticket_numbers              | ""      | list of ticket numbers (Jira  GitHub)                                                     |
| commit_types                | ""      | list of types (Conventional Commits)                                                      |
| commit_scopes               | ""      | list of scopes (Conventional Commits)                                                     |
| commit_type_\<type>         | ""      | list of commit messages for the given commit type (Conventional Commits)                  |
| commit_scope_\<scope>       | ""      | list of commit messages for the given commit scope (Conventional Commits)                 |
| x_has_changes_\<lang>       | false   | true on file changes exists between current sha and latest tag                            |
| x_has_local_changes_\<lang> | false   | true if there are changes on non committed files for the specific language                |
| x_language_list             | -       | a list of supported languages for `x_has_changes_<lang>` and `x_has_local_changes_<lang>` |

### \[DEV] Setup Environment

* clean environment: `./clean_node.sh`
* Build: `npm run build` to "compile" `index.ts` to `./lib/index.js`
* Test: `npm run build && npm run test:coverage`
* NodeJs 16: do not upgrade nodeJs as GitHub actions latest version is 16
* Hint: please do not remove the node modules as they are required for custom GitHub actions :(

[build_shield]: https://github.com/YunaBraska/input-merger-action/workflows/RELEASE/badge.svg

[build_link]: https://github.com/YunaBraska/input-merger-action/actions/workflows/publish.yml/badge.svg

[maintainable_shield]: https://img.shields.io/codeclimate/maintainability/YunaBraska/input-merger-action?style=flat-square

[maintainable_link]: https://codeclimate.com/github/YunaBraska/input-merger-action/maintainability

[coverage_shield]: https://img.shields.io/codeclimate/coverage/YunaBraska/input-merger-action?style=flat-square

[coverage_link]: https://codeclimate.com/github/YunaBraska/input-merger-action/test_coverage

[issues_shield]: https://img.shields.io/github/issues/YunaBraska/input-merger-action?style=flat-square

[issues_link]: https://github.com/YunaBraska/input-merger-action/commits/main

[commit_shield]: https://img.shields.io/github/last-commit/YunaBraska/input-merger-action?style=flat-square

[commit_link]: https://github.com/YunaBraska/input-merger-action/issues

[license_shield]: https://img.shields.io/github/license/YunaBraska/input-merger-action?style=flat-square

[license_link]: https://github.com/YunaBraska/input-merger-action/blob/main/LICENSE

[tag_shield]: https://img.shields.io/github/v/tag/YunaBraska/input-merger-action?style=flat-square

[tag_link]: https://github.com/YunaBraska/input-merger-action/releases

[size_shield]: https://img.shields.io/github/repo-size/YunaBraska/input-merger-action?style=flat-square

[label_shield]: https://img.shields.io/badge/Yuna-QueenInside-blueviolet?style=flat-square

[gitter_shield]: https://img.shields.io/gitter/room/YunaBraska/input-merger-action?style=flat-square

[gitter_link]: https://gitter.im/input-merger-action/Lobby

[node_version]: https://img.shields.io/badge/node-16-blueviolet?style=flat-square
