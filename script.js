const userName = document.getElementById('user-name');
const userNameSet = document.getElementById('user-name-set');
const root = document.documentElement;
const addUserNameValue = document.querySelectorAll('.user-name-value');
const nameWarrior = localStorage.getItem('username');
const scoreLoose = localStorage.getItem('score loose');
const btnGo = document.getElementById('btn-go');
const btnFight = document.querySelector('.btn-fight');
const btnHome = document.querySelector('.icon.home');
const header = document.querySelector('.header');
const pageReg = document.querySelector('.registration-page');
const pageHome = document.querySelector('.home-page');
const pageSettings = document.querySelector('.settings-page');
const pageBattle = document.querySelector('.battle-page');
const btnBattle = document.querySelector('.battle');
const checkboxBlockZone = document.querySelector('.block-zone');
const logArea = document.querySelector('.window-log');
const healthUser = document.querySelector('.health-user');
const healthMonsterToHtml = document.querySelector('.health-monster');
const pageWinLoose = document.querySelector('.screen-win-loose');
const popUp = document.querySelector('.pop-up');
const winsDisplay = document.querySelector('.wins');
const looseDisplay = document.querySelector('.loose');
const arrayPage = [pageReg, pageHome, pageBattle, pageSettings];
let currentTime;
console.log(userNameSet.value);

function pageDisplayNone() {
    for (i = 0; i < arrayPage.length; i += 1) {
        arrayPage[i].style.display = 'none';
    }
}

function getUser() {
    const userNameValue = localStorage.getItem('username');
    addUserNameValue.forEach(el => {
    el.innerHTML = userNameValue;
});
}

function setUserName() {
    const value = userNameSet.value;
    localStorage.setItem('username', value);
    getUser();
    userNameSet.value = '';
}

function displayPageHome() {
    pageDisplayNone();
    pageHome.style.display = 'flex';
}

function displayPageSettings() {
    pageDisplayNone();
    pageSettings.style.display = 'flex';
    winsDisplay.innerText = `Wins: ${localStorage.getItem('score wins')}`;
    looseDisplay.innerText = `Loose: ${localStorage.getItem('score loose')}`;
}

function getUserName() {
    const value = userName.value;
    const userNameValue = localStorage.getItem('username');
    if (value === '') {
        return;
    } else {
        pageHome.style.display = 'flex';
        pageReg.style.display = 'none';
        header.style.display = 'flex';
        userName.value = ''; 
        if (userNameValue === value) {
            return value;
        } else {
            localStorage.setItem('username', value);
            getUser();
            localStorage.setItem('score wins', 0);
            localStorage.setItem('score loose', 0);
        }
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

function battleRestart() {
    const element = event.target;
    if (element.className !== 'pop-up') {
        pageWinLoose.style.display = 'none';
        health = 150;
        healthMonster = 110;
        healthBarMonster();
        healthBarUser();
    }
}

btnFight.addEventListener('click', pageFight);
pageWinLoose.addEventListener('click', battleRestart);


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
        const newArrayConst = arrayConst.filter((item) => item !== arrayMonsterBlock[0]);
        arrayMonsterBlock[1] = newArrayConst[Math.ceil(Math.random() * 3)];
    }
  }
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

function healthBarUser() {
    const multiplyHealth = health / 150;
    healthUser.innerText = health;
    root.style.setProperty('--health-user-bar', `calc(100% * ${multiplyHealth}`);
}

function healthBarMonster() {
    const multiplyHealth = healthMonster / 110;
    healthMonsterToHtml.innerText = healthMonster;
    root.style.setProperty('--health-monster-bar', `calc(100% * ${multiplyHealth}`);
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
    healthBarUser();
     if (health <= 0) {
         pageWinLoose.style.display = 'flex';
         popUp.innerText = 'You Loose';
         popUp.style.color = 'red';
         const scoreLoose = localStorage.getItem('score loose');
         const scoreLooseTemp = +scoreLoose + 1;
         localStorage.setItem('score loose', scoreLooseTemp);
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
        if (multiplyRound === 0) {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack}. Monster blocked ${userAttack}<br>` + logArea.innerHTML;
        } else {
            logArea.innerHTML = `${currentTime} - ${nameWarrior} attacked the Monster in the ${userAttack}. Monster received damage ${baseAttack}<br>` + logArea.innerHTML;
        }
    }
    healthBarMonster();
    if (healthMonster <= 0) {
        pageWinLoose.style.display = 'flex';
        popUp.innerText = 'You Win';
        popUp.style.color = 'green';
        const scoreWins = localStorage.getItem('score wins');
        const scoreWinsTemp = +scoreWins + 1;
        localStorage.setItem('score wins', scoreWinsTemp);
    }
}

function testFight12() {
    testFight1();
    testFight2();
}
btnBattle.addEventListener('click',testFight12);

