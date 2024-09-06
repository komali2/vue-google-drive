<template>
  <div class="about">
    <h1>A Project by Caleb Rogers</h1>
    <h2><a href="https://calebjay.com">calebjay.com</a></h2>
    <p>
      This project was built as a take home test. Since buiding it would take longer than my usual
      take-home test limit of about 1-2 hours, it was built in Vue so I'd have a chance to brush up
      on my Vue skills again.
    </p>
    <p>
      Pinia is used as a state management solution. Tests are a combination of @pinia/testing,
      vue-test-utils, vitest, and cypress.
    </p>
    <p>
      There's heavy usage of the Google Javascript SDK where possible, or the API directly when
      necessary (such as for file upload). The Google Drive documentation is partially out of date,
      with many gotchas. See inline comments in code for details.
    </p>
    <p>
      This project is licensed under AGPL3. A copy of the license is available in the source code,
      linked below.
    </p>
    <ul>
      <a href="https://codeberg.org/calebrogers/vue-google-drive">Source Code</a>
    </ul>
    <h2>Known Issues</h2>
    <p>
      There's some known issues, tradeoffs that come with my personal hour-boundary I set for take
      home projects, which is normally 2 hours but in this case was about 4 so I could brush up on
      Vue.
    </p>
    <ul>
      <li>The app's kinda ugly</li>
      <li>No logout functionality</li>
      <li>App breaks on token expiry - requires clearing localstorage</li>
      <li>"Download" only works on Gdoc type files (since it's "export" under the hood)</li>
      <li>Delete and Upload operations don't auto-refresh the files list</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;
  }
}
h1,
h2 {
  display: block;
}
</style>
