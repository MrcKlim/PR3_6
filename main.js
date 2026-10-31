import Pokemon from './pokemon.js';
import { pokemons } from './pokemons.js';
import { random, countClick } from './utils.js';

const $control = document.querySelector('.control');
const $logs = document.getElementById('logs');

const p1Data = pokemons.find(item => item.name === 'Pikachu');

const enemiesList = pokemons.filter(item => item.name !== 'Pikachu');
let randomEnemyData = enemiesList[random(0, enemiesList.length - 1)];

let player1 = new Pokemon({
  ...p1Data,
  selectors: 'player1'
});

let player2 = new Pokemon({
  ...randomEnemyData,
  selectors: 'player2'
});

function disableAllButtons() {
  const allButtons = document.querySelectorAll('.control .button');
  allButtons.forEach($btn => $btn.disabled = true);
}

function generateLog(firstPerson, secondPerson, count) {
  const { hp: { current, total } } = firstPerson;

  const logs = [
    `${firstPerson.name} згадав щось важливе, але раптово ${secondPerson.name}, не тямлячи себе від переляку, завдав удару в передпліччя ворога.`,
    `${firstPerson.name} поперхнувся, і за це ${secondPerson.name} з переляку приклав прямий удар коліном у лоб ворога.`,
    `${firstPerson.name} замислився, але в цей час нахабний ${secondPerson.name}, прийнявши вольове рішення, нечутно підійшовши ззаду, завдав удару.`,
    `${firstPerson.name} прийшов до тями, але раптово ${secondPerson.name} випадково завдав потужного удару.`,
    `${firstPerson.name} поперхнувся, але в цей час ${secondPerson.name} знехотя роздробив кулаком противника.`,
    `${firstPerson.name} здивувався, а ${secondPerson.name}, похитнувшись, вліпив підлий удар.`,
    `${firstPerson.name} висякався, але раптово ${secondPerson.name} провів нищівний удар.`,
    `${firstPerson.name} похитнувся, і раптово нахабний ${secondPerson.name} безпричинно вдарив у ногу противника.`,
    `${firstPerson.name} засмутився, як раптом ${secondPerson.name} випадково вліпив стопою в живіт суперника.`,
    `${firstPerson.name} намагався щось сказати, але раптом ${secondPerson.name} зі нудьги розбив брову супернику.`
  ];

  const text = logs[random(logs.length) - 1];
  const logString = `${text} -${count}, [${firstPerson.name}: ${current}/${total}]`;

  const $p = document.createElement('p');
  $p.innerText = logString;
  $logs.insertBefore($p, $logs.children[0]);
}

function checkWin() {
  if (player2.hp.current === 0) {
    alert(`Перемога! ${player2.name} повалений! З'являється новий супротивник!`);
    
    const nextEnemyData = enemiesList[random(0, enemiesList.length - 1)];
    player2 = new Pokemon({
      ...nextEnemyData,
      selectors: 'player2'
    });
  } else if (player1.hp.current === 0) {
    disableAllButtons();
    alert(`Бідний ${player1.name} програв бій!`);
  }
}

$control.innerHTML = '';

player1.attacks.forEach(attack => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = attack.name;

  const btnClickCounter = countClick(attack.maxCount, $btn);

  $btn.addEventListener('click', () => {
    btnClickCounter();

    const damage1 = random(attack.minDamage, attack.maxDamage);
    player2.changeHP(damage1, (count) => {
      generateLog(player2, player1, count);
    });

    if (player2.hp.current > 0) {
      const enemyAttack = player2.attacks[0];
      const damage2 = random(enemyAttack.minDamage, enemyAttack.maxDamage);
      player1.changeHP(damage2, (count) => {
        generateLog(player1, player2, count);
      });
    }

    checkWin();
  });

  $control.appendChild($btn);
});