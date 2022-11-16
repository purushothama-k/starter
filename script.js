'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__value">${Math.abs(mov)}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);

const updateUI = function (acc) {
  //calling functions
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

// Event Handlers

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevents from submitting this form
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Welcome msg and displaying UI

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input field

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //update UI
    updateUI(currentAccount);
  }
});

//transfer

btnTransfer.addEventListener('click', function (e) {
  //prevents from submitting this form
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function () {});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// //It will not mutate original array (slice)
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -1));

// // splice method will mutate original array
// console.log(arr.splice(2));
// console.log(arr);
// console.log(arr.splice(-1));
// console.log(arr);

// //reverse will also mutate the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// //concat array (it will not mutate original array)

// const letters = arr.concat(arr2);
// console.log(letters);

// //join method

// console.log(letters.join(' - '));

// const movements = [200, 450, -400, 3000, -653, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You have withdrawn ${Math.abs(movement)}`);
//   }
// }

// console.log('-------------------------');

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Transaction ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(
//       `Transaction ${i + 1}: You have withdrawn ${Math.abs(movement)}`
//     );
//   }
// }

// console.log('-----------For Each---------------');

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You have withdrawn ${Math.abs(movement)}`);
//   }
// });

// console.log('--------------------------');

// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Transaction ${index + 1}: You deposited ${movement}`);
//     console.log(array);
//   } else {
//     console.log(
//       `Transaction ${index + 1}: You have withdrawn ${Math.abs(movement)}`
//     );
//     console.log(array);
//   }
// });

// console.log('-------------------------');

// const rank = [200, 450, 400, 300, 650, 130, 1256];

// const names = ['purushothama', 'raj', 'nm', 'lio', 'sdk', 'sdlk', 'dsfdsf'];

// rank.forEach(function (score, i) {
//   console.log(
//     `${names[i]} you scored ${score} marks in your ${
//       i + 1
//     } semester of Dummy Engineering`
//   );
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (currency, i, map) {
//   console.log(`${i} stands for ${currency} `);
//   console.log(map);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'GBP', 'USD']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

//challenge

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const dogsJulia = [];
// const dogsKate = [];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctedJulia = dogsJulia.slice(1, -2);
//   console.log(correctedJulia);
//   const listOfDogs = correctedJulia.concat(dogsKate);
//   console.log(listOfDogs);
//   listOfDogs.forEach(function (age, i) {
//     if (age > 3) {
//       console.log(`Dog number ${i + 1} is an adult and is ${age} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is till a puppy`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//challenge-2

// const testData1 = [5, 2, 4, 1, 15, 8, 3];
// const testData2 = [16, 6, 10, 5, 6, 1, 4];

// const humanAge = function (data) {
//   const ages = data
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(ages);
// };

// humanAge(testData1);
// humanAge(testData2);

// const checkHumanAge = function (data1, data2) {
//   const combinedData = data1.concat(data2);

//   // console.log(combinedData);

//   const ages = combinedData.map(function (age) {
//     if (age <= 2) {
//       const humanAge = 2 * age;
//       return humanAge;
//     } else if (age > 2) {
//       const humanAge = 16 + age * 4;
//       return humanAge;
//     }
//   });
//   console.log(ages);

//   const correctedAges = ages.filter(function (age) {
//     return age >= 18;
//   });
//   console.log(correctedAges);
//   const average = correctedAges.reduce(function (acc, age, i, arr) {
//     return acc + age / arr.length;
//   }, 0);
//   console.log(average);
// };
// checkHumanAge(testData1, testData2);

// const movements = [200, 450, -400, 3000, -653, -130, 70, 1300];

//filter method

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const withdraws = movements.filter(mov => mov < 0);
// console.log(movements);
// console.log(withdraws);

// //reduce method
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`accumulator ${i}: ${acc}`);
// //   return acc + cur;
// // }, 0);

// const balance = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(balance);

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(max);

// const min = movements.reduce((acc, mov) => {
//   if (acc < mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(min);

// const euroToUSD = 1.1;

// const movementUSD = movements.map(function (mov) {
//   return mov * euroToUSD;
// });

// const movementUSD1 = movements.map(mov => mov * euroToUSD);

// console.log(movementUSD);
// console.log(movements);
// console.log(movementUSD1);

// const movementDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementDescription);

// const movements = [200, 450, -400, 3000, -653, -130, 70, 1300];

// const euroToUsd = 1.1;

// const totalDeposits = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposits);

// const find = movements.find(mov => mov < 0);
// console.log(find);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }
