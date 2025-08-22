const userName = document.getElementById('user-name');
const nameWarrior = localStorage.getItem("username");
const btnGo = document.getElementById('btn-go');
const btnFight = document.querySelector('.btn-fight');
const pageReg = document.querySelector('.registration-page');
const pageHome = document.querySelector('.home-page');
const pageBattle = document.querySelector('.battle-page')
const btnBattle = document.querySelector('.battle');
const checkboxBlockZone = document.querySelector('.block-zone');
const logArea = document.querySelector('.window-log');
let currentTime;


function getUserName() {
    const value = userName.value;
    if (value === '') {
        return;
    } else {
        pageHome.style.display = 'flex';
        pageReg.style.display = 'none';
        if (localStorage.getItem("username") === value) {
            return value;
        } else localStorage.setItem('username', value);
        console.log(value);
    }
};

function pageFight() {
    pageHome.style.display = 'none';
    pageBattle.style.display = 'flex';
}

function activeBtnBattle() {
    const userBlock = document.querySelectorAll('.block-zone:checked');
    if (userBlock.length === 2) {
        btnBattle.disabled = false;
    } else btnBattle.disabled = true;
}

function setTime () {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
}

btnFight.addEventListener('click',pageFight());

//section logic battle --------------------------------------------------

let health = 150;
let healthMonster = 110;
const arrayConst = ['head', 'neck', 'body', 'belly', 'legs'];
let arrayMonsterAttack = [];
let arrayMonsterBlock = ['','']
let random = Math.ceil(Math.random() * 5);
let attackMultiply;
let critMultiply;

function monsterPickBlock() {
  for (let j = 0; j < 2; j += 1) {
    arrayMonsterBlock[j] = arrayConst[Math.round(Math.random() * 4)]
    if (arrayMonsterBlock[0] === arrayMonsterBlock[1]) {
      arrayMonsterBlock[1] = arrayConst[Math.round(Math.random() * 4)];
    }
  }
  console.log(arrayMonsterBlock);
}

function monsterAttack(arrayUserBlock) {
  arrayMonsterAttack[0] = arrayConst[+Math.round(Math.random() * 4)];
  attackMultiply = 0;
  for (let i = 0; i < arrayUserBlock.length; i += 1) {
    if (arrayUserBlock[i] === arrayMonsterAttack[0]) {
    attackMultiply += 1;
    }
  }
}

function monsterBlock(userAttack) {
    attackMultiply = 0;
    for (let i = 0; i < arrayMonsterBlock.length; i += 1) {
      if (userAttack === arrayMonsterBlock[i]) {
        attackMultiply += 0;
      } else attackMultiply += 0.5;
    }
  }

function monsterPickAttack() {
   arrayMonsterAttack[0] = arrayConst[Math.round(Math.random() * 4)];
}

function testFight1() {
    setTime(); 
    const userBlock = document.querySelectorAll('.block-zone:checked');
    const arrayUserBlock = ['head', 'neck', 'body', 'belly', 'legs'];
    arrayUserBlock[+userBlock[0].value] = '';
    arrayUserBlock[+userBlock[1].value] = '';
    critMultiply = Math.round(Math.random() * 10)
    monsterAttack(arrayUserBlock);
    const critAttack = 10 * attackMultiply + 10 * 0.15 * critMultiply;
    const baseAttack = 10 * attackMultiply;
    if (critMultiply === 10) {
        health -= critAttack;
        if (attackMultiply === 0) {
            logArea.innerHTML = `${currentTime} - Monster attacked the ${nameWarrior} in the ${arrayMonsterAttack[0]}. ${nameWarrior} blocked ${arrayMonsterAttack}, but Monster deals critical damage. ${nameWarrior} received damage ${critAttack}  <br>` + logArea.innerHTML;
        } else {
            logArea.innerHTML = `${currentTime} - Monster attacked the ${nameWarrior} in the ${arrayMonsterAttack[0]} and deals critical damage. ${nameWarrior} received damage ${critAttack}<br>` + logArea.innerHTML;
        }
    } else {
        health -= baseAttack;
        if (attackMultiply === 0) {
            logArea.innerHTML = `${currentTime} - Monster attacked the ${nameWarrior} in the ${arrayMonsterAttack[0]}. ${nameWarrior} blocked ${arrayMonsterAttack}<br>` + logArea.innerHTML;
        } else {
            logArea.innerHTML = `${currentTime} - Monster attacked the ${nameWarrior} in the ${arrayMonsterAttack[0]}. ${nameWarrior} received damage ${baseAttack}<br>` + logArea.innerHTML;
        }
    }
}

function testFight2() {
    setTime();
    const userAttack = document.querySelector('input[name="attack-user"]:checked').value;
    critMultiply = Math.round(Math.random() * 10);
    monsterPickBlock();
    monsterBlock(userAttack);
    const multiplyRound = Math.floor(attackMultiply);
    const baseAttack = 10 * Math.floor(attackMultiply);
    const critAttack = 10 * Math.floor(attackMultiply) + 10 * 0.15 * critMultiply;
    if (critMultiply === 10) {
    healthMonster -= critAttack;
    if (attackMultiply === 0) {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack}. Monster blocked ${userAttack}, but Monster deals critical damage. Monster received damage ${critAttack}<br>` + logArea.innerHTML;
        } else {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack} and deals critical damage. Monster received damage ${critAttack}<br>` + logArea.innerHTML;
        }
    } else {
        healthMonster -= baseAttack;
        console.log(`test attack multiply ${multiplyRound}`)
        if (multiplyRound === 0) {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack}. Monster blocked ${userAttack}<br>` + logArea.innerHTML;
        } else {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack}. Monster received damage ${baseAttack}<br>` + logArea.innerHTML;
        }
    }
}

function testFight12() {
    testFight1();
    testFight2();
}
btnBattle.addEventListener('click',testFight12);

