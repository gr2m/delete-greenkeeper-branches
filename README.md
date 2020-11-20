# delete-greenkeeper-branches

This is a script for [mutate-github-repositories-cli](https://github.com/gr2m/mutate-github-repositories-cli/). It deletes all branches that start with "greenkeeper/"

## Usage

```
git clone https://github.com/gr2m/delete-greenkeeper-branches.git
cd delete-greenkeeper-branches
$ npx mutate-github-repositories-cli \
  --token 0123456789012345678901234567890123456789 \
  script.js \
  "octokit/*"
```

## Licenses

[ISC](LICENSE.md)
