import * as firebase from 'firebase';
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "****",
        authDomain: "****",
        projectId: "****",
        storageBucket: "****",
        messagingSenderId: "****",
        appId: "****",
        measurementId: "****"
    });
}

export { firebase };