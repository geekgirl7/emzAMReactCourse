import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase w/const from above
firebase.initializeApp(firebaseConfig);

// // Make code easier to read:
const database = firebase.database();
// // originally: firebase.database().ref().set();
// // now: database.ref().set();

export { firebase, database as default };


// // Keep the following for (programming firebase) reference:
// database.ref('expenses').push({
//   description: 'Potting Soil',
//   note: 'Time to plant!',
//   amount: 1700,
//   createdAt: 125
// });

// database.ref('expenses').push({
//   description: 'Vinegar',
//   note: 'Time to plant!',
//   amount: 198,
//   createdAt: 126
// });

// database.ref('expenses').push({
//   description: 'Tortillas',
//   note: 'yum!',
//   amount: 127,
//   createdAt: 130
// });

// // CHALLENGE:
// // result: should see array printing once.
// // will reprint w/any changes to any item
// // *** NOTE: this solution is WRONG!!! ***
// //   .on() DOESN'T return a Promise!!
// // Correction shown below this commented snippet
// // database.ref('expenses')
// // NO:  .once('value')
// // NO:  .then((snapshot) => {
// //     const expenses = [];

// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });

// database.ref('expenses').on('value', (snapshot)=> {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   });

// // DON'T NEED THIS NEXT SNIPPET AFTER THE ABOVE IS CORRECTED!
// // However, it's NOT INCORRECT!!!  (It's a *different* solution)
// //   It's just not needed/(part of) the above solution
// //   c/get more information about *what* changed, instead of getting
// //     *one big change* getting triggered (as in the above snippet)
// //     
// //   This snippet is a "subscriber" and listens for changes to the data-event in fbs
// //     and returns the object that was added/updated/deleted:
// //
// // NOTE: not only is this a valid solution, it's the solution to Challenge #2!
// //
// // database.ref('expenses').on('child_changed', (childSnapshot) => {
// //   console.log('updated child: ', childSnapshot.val());
// // });

// // database.ref('notes').push({
// //   title: 'ToDo',
// //   body: 'Go for a run!'
// // });

// // database.ref('notes').push({
// //   title: 'Course Topics',
// //   body: 'React Native, Angular, Python'
// // });

// // To access the data:
// // Don't forget the dash ( - ) in the id!
// // database.ref('notes/-M3SdwuoSQiPCn_xgmWy').update({
// //   body: 'Buy food'
// // });

// // NOTE: neither of these examples will work the way we want!
// // firebase arrays, example 2:
// // const firebaseNotes = {
// //   notes: {
// //     apoijasdf: {
// //       title: 'First note!',
// //       body: 'This is my note'
// //     },
// //     apoijasdfpoijwe: {
// //       title: 'Another note',
// //       body: 'This is my note'
// //     }
// //   }
// // };

// // // firebase arrays, example 1:
// // const notes = [{
// //   id: '12',
// //   title: 'First note!',
// //   body: 'This is my note'
// // }, {
// //   id: '761ase',
// //   title: 'Another note',
// //   body: 'This is my note'  
// // }];

// console.log('I made a request to change the data.');