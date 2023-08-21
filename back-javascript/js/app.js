
let login_label = document.querySelector('.login_label');
let popup = document.querySelector('.popup');
let left = document.querySelector('.left');

let username = document.querySelector('.username');
let pin = document.querySelector('.pin');
let login_form = document.querySelector('.login_form');

let content = document.querySelector('.content');
let total_mov = document.querySelector('.total_mov');
let total_deposit = document.querySelector('.total_deposit');
let total_withdraw = document.querySelector('.total_withdraw');

let trans_money_btn = document.querySelector('.trans_money_btn');
let amount = document.querySelector('.amount');
let transfare_to = document.querySelector('.transfare_to');

let h2 = document.querySelector('.h2');
let h3 = document.querySelector('.h3')

// Data
class Accounts {
  constructor(owner, movements, pin) {
    this.owner = owner,
    this.movements = movements,
    this.pin = pin
  }
}

let account1 = new Accounts('Ahmed', [200, 450, -400, 3000, -650, -130, 70, 1300], 1111)
let account2 = new Accounts('Mohammed', [5000, 3400, -150, -790, -3210, -1000, 8500, -30], 2222)
let account3 = new Accounts('Steven Jobs', [200, -200, 340, -300, -20, 50, 400, -460], 3333)
let account4 = new Accounts('Sarah Mh', [430, 1000, 700, 50, 90,-200,500], 4444)

const accounts = [account1, account2, account3, account4];

login_label.addEventListener('click', () => {
  popup.classList.remove('hidden')
})

login_form.addEventListener('click', () => {
  let getPin = Number(pin.value)
  let correctUser = accounts.find((item) => {
    return item.owner === correctUserName() && item.pin === getPin
  })
  if(correctUser) {
    popup.classList.add('hidden');
    content.classList.remove('hidden');  
  }
  showData(correctUser)
  displayInfo(correctUser)
})

function showData(slecter) {
  slecter.movements.forEach((ele) => {
    let type = ele > 0 ? "deposit" : 'withdraw';
    let html = `
    <div class="card type-${type}">
      <div class="deposit">${type}</div>
      <p class="mov">${ele}</p>
    </div>
    `;
    left.insertAdjacentHTML('afterbegin', html)
  })
}

function displayInfo(selecter) {
let total = selecter.movements.map((item) => {
  return item
}).reduce((num1, num2) => {
  return num1 + num2
});
// totalLoginUser === total
let deposit = selecter.movements.map((item) => {
  return item;
}).filter((item) => {
  return item > 0
}).reduce((num1, num2) => {
  return num1 + num2
})
let withdraw = selecter.movements.map((item) => {
  return item;
}).filter((item) => {
  return item < 0
}).reduce((num1, num2) => {
  return num1 + num2
})
total_mov.innerHTML = total
total_deposit.innerHTML = deposit
total_withdraw.innerHTML = Math.abs(withdraw)
}

// Make the first letter capital
function correctUserName() {
  let userName = username.value
  let newUserName = userName.toLowerCase().split(' ')
  newUserName.forEach((ele, ind, arr) => {
    arr[ind] = ele[0].toUpperCase() + ele.slice(1);
  })
  let captilize = newUserName.join(' ');
  return captilize;
}

function correctUserNameTrans() {
  let getUser = transfare_to.value
  let newUserName = getUser.toLowerCase().split(' ')
  newUserName.forEach((ele, ind, arr) => {
    arr[ind] = ele[0].toUpperCase() + ele.slice(1);
  })
  let captilize = newUserName.join(' ');
  return captilize;
}

// Transfare Money
trans_money_btn.addEventListener('click', transfare)

function transfare() {
  let user = correctUserNameTrans()
  let getTran = Number(amount.value)
  // Find The Login User
  let findUser = accounts.find(function(item) {
    return item.owner === correctUserName();
  })
  let total = findUser.movements.map((item) => {
    return item;
  }).reduce((num1, num2) => {
    return num1 + num2;
  });
  // Find The User That We Want To Transfer To
  let findTransfareToUser = accounts.find((item) => {
    return item.owner === correctUserNameTrans()
  })
  if (total >= getTran) {
    findTransfareToUser.movements.push(getTran)
    findUser.movements.push(-getTran)
    amount.value = '';
    transfare_to.value = '';
    displayInfo(findUser)
  } else {
    h2.innerHTML = `Sorry You Do Not Have Enoght Money!`;
    h2.style.color = 'red'
  };
  let totalTransfareTo = findTransfareToUser.movements.map((item) => {
    return item;
  }).reduce((num1, num2) => {
    return num1 + num2;
  });
  if(total >= getTran) {
    h2.innerHTML = `Your Transfer Has Been Completed Successfuly`;
    h2.style.color = 'rgb(0, 255, 13)'
    h3.textContent = `${user} Now Has ${totalTransfareTo}`
  } else {
    h2.innerHTML = `Sorry You Do Not Have Enoght Money!`;
    h2.style.color = 'red'
    h3.textContent = 'You Must Deposit More Money';
  }
}
