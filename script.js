class GameMachine {
  constructor(bank) {
    this.bank = bank;
  }

  get money() {
    return this.bank;
  }

  takeMoney(money) {
    if (money <= this.bank) {
      this.bank -= money;
    }
  }

  addMoney(money) {
    this.bank += money;
  }

  _randomNumber() {
    const randNumber = [null, null, null];

    return randNumber.map(() => {
      return console.log(Math.floor(Math.random() * 10));
    });
  }

  _getRepeatCount(number) {
    return [...number.toString()].reduce((count, current, _, arr) => {
      let repeating = current === arr[0] ? 1 : 0;
      repeating += current === arr[1] ? 1 : 0;
      repeating += current === arr[2] ? 1 : 0;

      return repeating > count ? repeating : count;
    }, 0);
  }

  play(bet) {
    let firstNum = Math.floor(Math.random() * (10 - 0)) + 0;
    let secondNum = Math.floor(Math.random() * (10 - 0)) + 0;
    let thirdNum = Math.floor(Math.random() * (10 - 0)) + 0;
    this.bank += bet;

    console.log(firstNum, secondNum, thirdNum);

    if (
      firstNum == secondNum ||
      firstNum == thirdNum ||
      secondNum == thirdNum
    ) {
      console.log("You Win!");
      bet *= 2;
      this.bank -= bet;
      return bet;
    } else if (firstNum == secondNum && secondNum == thirdNum) {
      console.log("You super Win!");
      bet *= 3;
      this.bank -= bet;
      return bet;
    } else {
      console.log("You Lose!");
      this.bank += bet;
      return -bet;
    }
  }
}

class Casino {
  constructor(name) {
    this.name = name;
    this.machines = [];
  }

  get getMachineCount() {
    return this.machines.length;
  }

  get getMoney() {
    return this.machines.reduce((acc, machine) => {
      return acc + machine.bank;
    }, 0);
  }
}

class User {
  constructor(name, money) {
    this.name = name;
    this.money = money;
    this._selectMachine = null;
  }

  get selectMachine() {
    return this._selectMachine;
  }

  set selectMachine(machine) {
    this._selectMachine = machine;
  }

  play(bet) {
    if (bet > this.money) {
      console.error(`${this.name} not enough money`);

      return;
    }

    if (this._selectMachine === null) {
      console.error("Please, select some Machine for game");

      return;
    }

    this.money += this._selectMachine.play(bet);
  }
}

class SuperAdmin extends User {
  constructor(name, money) {
    super(name, money);
    this.casino = null;
  }

  createCasino(casinoName) {
    const newCasino = new Casino(casinoName);
    this.casino = newCasino;

    return newCasino;
  }

  createGameMachine(bank) {
    if (!this.casino) {
      console.error("Please, create some casino.");

      return;
    }

    if (bank >= this.money) {
      console.error("Not enough money for create game machine");

      return;
    }

    const newMachine = new GameMachine(bank);
    this.casino.machines.push(newMachine);
    this.money -= bank;

    return newMachine;
  }

  removeGameMachine(id) {
    if (!this.casino) {
      console.error("Please, create some casino.");

      return;
    }

    const machines = [...this.casino.machines];
    if (!machines.length) {
      console.error("Please, create some machine.");

      return;
    }

    if (machines[id] === undefined) {
      console.error("Game machine ID is wrong.");

      return;
    }

    const cash = machines[id].bank;
    machines.splice(id, 1);
    const machineCount = machines.length;

    machines.forEach(machine => {
      const profit = (cash / machineCount).toFixed(2);
      machine.bank += +profit;
    });

    this.casino.machines = [...machines];
  }

  takeMoneyFromCasino(sum) {
    const machines = [...this.casino.machines];
    const allBank = machines.reduce((acc, machine) => acc + machine.bank, 0);

    if (sum > allBank) {
      console.error("Sorry, but sum is larget that casino bank");

      return;
    }

    const percentageFromBank = sum / allBank;

    machines.forEach(machine => {
      machine.bank = +(machine.bank * (1 - percentageFromBank)).toFixed(2);
    });

    this.casino.machines = [...machines];
    this.money += sum;
  }

  addMoneyToCasino(money) {
    if (money <= 0) {
      console.error("Please, enter sum > 0");

      return;
    }

    if (!this.casino) {
      console.error("Please, create some casino.");

      return;
    }

    const length = this.casino.machines.length;
    if (!length) {
      console.error("Please, create some machine.");

      return;
    }

    if (money >= this.money) {
      console.error("Not enough money for add money to game machine");

      return;
    }

    this.casino.machines.forEach(machine => {
      machine.bank += money / length;
    });

    this.money -= money;
  }

  addMoneyToGameMachine(id, money) {
    if (money <= 0) {
      console.error("Please, enter sum > 0");

      return;
    }

    if (!this.casino) {
      console.error("Please, create some casino.");

      return;
    }

    if (money >= this.money) {
      console.error("Not enough money for add money to game machine");

      return;
    }

    if (this.casino.machines[id] === undefined) {
      console.error("Game machine ID is wrong.");

      return;
    }

    this.money -= money;
    this.casino.machines[id].bank += money;
  }
}

/* const admin = new SuperAdmin("admin", 10000);

const casino = admin.createCasino("Las Vegas");
const machine = admin.createGameMachine(1000);
admin.createGameMachine(500);
admin.createGameMachine(500);
admin.takeMoneyFromCasino(1000);

admin.selectMachine = machine;
admin.play(40);

console.log(admin);

const machine1 = new GameMachine(1000);
console.log(machine1.money);
machine1.takeMoney(100);
console.log(machine1.money);
machine1.addMoney(100);
console.log(machine1.money);
machine1.play(100);
console.log(machine1.money);
console.log(casino.getMachineCount);
console.log(casino.getMoney);

const user = new User("Vasya Pupkin", 500);
user.selectMachine = machine1;
console.log(user);
user.play(10);
user.play(10);
user.play(10);
user.play(10);
console.log(user);
admin.removeGameMachine(1);
console.log(casino);
admin.takeMoneyFromCasino(100);
console.log(casino);
admin.addMoneyToCasino(100);
console.log(casino);
admin.addMoneyToGameMachine(0, 100); */
