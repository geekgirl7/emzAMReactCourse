const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Andrew',
      age: 26
    });
    // reject('Something went wrong!');
  }, 5000);
});

console.log('before');

promise.then((data) => {
  console.log('1', data);
  // 'some data' will be passed to #2 .then():
  return 'some data';
}).then((str) => { // str = 'some data' from #1 .then()
  // this #2 .then() doesn't get any data unless 
  //  #1 .then() RETURNS data ('some data')

  // output for console.log():
  // 'does this run? some data'
  console.log('does this run?', str);
}).catch((error) => {
  console.log('error: ', error);
});

console.log('after');