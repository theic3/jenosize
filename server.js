const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
// const admin = require('firebase-admin');
// const firebase = require('firebase');
// const { initializeApp } = require("firebase-admin/app");

const serviceAccount = require('./path/to/serviceAccountKey.json');

const jenosizeController = require('./controller/jenosize');


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://jenosize-386405-default-rtdb.asia-southeast1.firebasedatabase.app'
// });
//
// const firebaseConfig = {
//     apiKey: 'your-api-key',
//     authDomain: 'https://jenosize-386405-default-rtdb.asia-southeast1.firebasedatabase.app',
//     projectId: 'https://jenosize-386405-default-rtdb.asia-southeast1.firebasedatabase.app',
//     storageBucket: 'your-project-name.appspot.com',
//     messagingSenderId: 'your-messaging-sender-id',
//     appId: 'your-app-id'
// };
//
// admin.initializeApp(firebaseConfig);



app.use(express.json());
app.use('/jenosize', jenosizeController);


app.listen(port, () => {
    console.log("Starting node.js at port " + port);
});