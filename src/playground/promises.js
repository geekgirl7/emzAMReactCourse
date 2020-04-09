// add to app.js if you need to use this file again: import './playground/promises';

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('This is my resolved data');
    resolve({
      name: 'Andrew',
      age: 26
    });

    //will never see this:
    resolve('This is my other resolved data');

    reject('Something went wrong!');
  }, 5000);
});

console.log('before');

promise.then((data) => {
  console.log('1 ', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
      // reject('Something went wrong!');
    }, 5000);
  });
}).then((str) => { // this is NOW the success case for the returned Promise
  console.log('does this run?', str)
}).catch((error) => {
  console.log("error: ", error);
});

// for reference ONLY:
// c/pass the reject func directly to then() as a second arg
//   (andrew doesn't prefer this method) bc it's a little harder to read
//   using .catch() is more explicit w/
//
// promise.then((data) => {
//   console.log('1 ', data);
// }, (error) => {
//   console.log("error: ", error);
// };

// promise.then((data) => {
//   console.log('2 ',data);
// });

console.log('after');

