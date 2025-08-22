let health = 150;
let healthMonster = 100;
const arrayConst = ['head', 'neck', 'body','belly', 'legs']
//const arrayUser = ['neck', 'head', 'body', 'belly', 'legs'];
let arrayMonsterAttack = [''];
let arrayMonsterBlock = ['','']
let random = Math.ceil(Math.random() * 5);
let attackMultiply = 0;
let critMultiply;

function monsterPickBlock() {
  for (let j = 0; j < 2; j += 1) {
    arrayMonsterBlock[j] = arrayConst[Math.round(Math.random() * 4)]
    if (arrayMonsterBlock[0] === arrayMonsterBlock [1]) {
      arrayMonsterBlock[1] = arrayConst[Math.ceil(Math.random() * 4)];
    }
  }
}

function monsterAttack(arrayUserBlock) {
  for (let i = 0; i < arrayUserBlock.length; i += 1) {
    for (let j = 0; j < arrayMonsterAttack.length; j += 1) {
      if (arrayUserBlock[i] === arrayMonsterAttack[j]) {
        attackMultiply += 1;
      }
    }
  }
}

function monsterBlock(userAttack) {
    for (let i = 0; i < arrayMonsterBlock.length; i += 1) {
      if (userAttack !== arrayMonsterBlock[i]) {
        attackMultiply += 1;
      }
    }
  }

function monsterPickAttack() {
   arrayMonsterAttack[0] = arrayConst[Math.round(Math.random() * 4)];
}

function testFight1(pickUser1, pickUser2) {
  const arrayUserBlock = arrayConst.with(pickUser1, '').with(pickUser2,'');
  critMultiply = Math.round(Math.random() * 10)
  console.log(arrayUserBlock);
  console.log(critMultiply);
  monsterPickAttack();
  monsterAttack(arrayUserBlock);
  console.log(arrayMonsterAttack)
  if (critMultiply === 10) {
  health = health - 10 * attackMultiply - 10 * 0.15 * critMultiply;
  } else health = health - 10 * attackMultiply;
}

function testFight2(pickUserAttack) {
  const userAttack = arrayConst[pickUserAttack];
  critMultiply = Math.round(Math.random() * 10);
  console.log(userAttack);
  monsterPickBlock();
  console.log(arrayMonsterBlock)
  monsterBlock(userAttack);
  if (critMultiply === 10) {
  healthMonster = healthMonster - 10 * attackMultiply - 10 * 0.15 * critMultiply;
  } else healthMonster = healthMonster - 10 * attackMultiply;
}


/*testFight1(4, 1);
console.log(`current health ${health}`)
testFight1(3, 2);
console.log(`current health ${health}`)*/
testFight2(4);
console.log(`current health monster ${healthMonster}`)
testFight2(3);
console.log(`current health monster ${healthMonster}`)