# Git Trends (React App)
This repository contains application created during the
recrutation process. It consumes GitHub API to show the most
popular repositories with ability to like them (stored in local storage) and filter by languages. Main reason of creating it was to
show in isolated, simple environment how React application
could be structurized and tested properly, ideally with
TDD approach.

## Useful commands
Since it has been bootstrapped with CRA, simply run
```
yarn start
```
to get things going!

Try
```
yarn run test
```
to ensure that eveything is working as expected after any modifications.

## Why XYZ has been used?
###
- 98.css - it is probably one of the few opportunities to use something definitely not production or real client facing ready and at the same time I feel very nostalgic about my first OS 👴
- Tanstack Query - since we are handling different requests (languahe filters!) and Github API have some usage limitations it is nice to cache the results. And also to see updating fetching status in `status-bar-field` (98.css ❤️)
- no React meta frameworks - it was tempting to use Next or Remix but since that's probably end of the development of this app there is absolutely no point in using edge-ready remix-like solutions with advanced routing etc. There is just a single view here!

## TODO
- [ ] handle pagination via `useInfiniteQuery`
- [ ] extract API request to separate abstraction layer
- [ ] add proper eslint/prettier config!
