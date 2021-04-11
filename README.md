[![CircleCI](https://circleci.com/gh/the22mastermind/gourmet-admin.svg?style=shield)](https://app.circleci.com/pipelines/github/the22mastermind/gourmet-admin?branch=main) [![Coverage Status](https://coveralls.io/repos/github/the22mastermind/gourmet-admin/badge.svg?branch=main)](https://coveralls.io/github/the22mastermind/gourmet-admin?branch=main) [![codecov](https://codecov.io/gh/the22mastermind/gourmet-admin/branch/main/graph/badge.svg?token=G3NH2RPAZJ)](https://codecov.io/gh/the22mastermind/gourmet-admin)

# Gourmet Admin
Admin portal for Gourmet Online Food Ordering App
<br/><br/>

## Description

Gourmet Admin is a web app that helps the admin/manager of Gourmet restaurant to manage customers orders.<br/><br/>

## Features

- [x] Authentication (Login and Logout)
- [x] View Orders List
- [x] View Single Order
- [x] Update Order Status

## Technologies/tools used

- React
- Material UI
- React Hook Form
- React Testing Library
- Parcel
- React Router Dom

## Tests

- Unit & Integration Tests (Jest & RTL)
- End-to-End Tests (Cypress)

## CI/CD

1. Circle CI
2. Netlify

## Author

Bertrand Masabo

## Getting started

### Running locally

- Ensure you have Node 12+ installed on your machine
- Clone this repo and cd into the project root directory
  ```
  $ git clone https://github.com/the22mastermind/gourmet-admin.git && cd gourmet-admin
  ```
- Install dependencies
  ```
  $ yarn install
  ```
- Run server and launch app in the browser
  ```
  $ yarn start --open
  ```

### Testing locally

- Unit & integration tests:
  ```
  $ yarn test
  ```
- End to end tests:
  ```
  $ yarn test:e2e
  ```
