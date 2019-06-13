// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3004',
    imageUrl: 'https://picsum.photos/1200/400?random',
    postBodyLength: 34,
    userInfo: 'userInfo',
    hoursFormat: 'hh:mm a',
    joinedEvents: 'joinedEvents',
    firebase: {
        apiKey: 'AIzaSyCcuU-qChdIWOsSA9GR9fT-ZyYFFJsJwtc',
        authDomain: 'app-events-8982d.firebaseapp.com',
        databaseURL: 'https://app-events-8982d.firebaseio.com',
        projectId: 'app-events-8982d',
        storageBucket: 'app-events-8982d.appspot.com',
        messagingSenderId: '75205536329',
        appId: '1:75205536329:web:01c004013832ac1e'
    }
};
