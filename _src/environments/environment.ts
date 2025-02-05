// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBgVuEsl_vdzod21hTQV6-DK0QDYCZiZSQ",
    authDomain: "cycle-app-518ef.firebaseapp.com",
    projectId: "cycle-app-518ef",
    storageBucket: "cycle-app-518ef.firebasestorage.app",
    messagingSenderId: "104820746369",
    appId: "1:104820746369:web:c57c75009c3575291c4580"
  },
  UUID: null
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
