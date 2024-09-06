# vue-google-drive

Example application of using the Google Drive API from Vue.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Usage

This project depends on Google Oauth2. For the 508.dev deployed version, the Oauth2 credentials are not "verified by Google," which means they only work for allow-listed emails. If you want the 508.dev deployed version to allow you to login, you must email caleb@508.dev to add your email to the allow-list. Alternatively, you can deploy your own version, and follow the authentication portion of the Drive API [quickstart guide](https://developers.google.com/drive/api/quickstart/js) to get your own keys.


## Project Setup

### Environment Variables

Copy `.example.env` to `.env`

`cp .example.env .env`

Edit `.env` with valid values. See https://developers.google.com/drive/api/quickstart/js

### Install 

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Or auto-fix with 
```sh
npm run format
```

## Deployment

This project is currently deployed on [508.dev's](https://508.dev) [ Coolify ](https://coolify.io/) instance. It's a static deploy using nixpacks. A static dist folder is transpiled using vite, which is then served by traefik (handled automatically by Coolify).

