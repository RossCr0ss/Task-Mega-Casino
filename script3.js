
class SuperAdmin   {
  constructor(nameCasino, money)   {
    this.nameCasino = nameCasino;
    this.money = money;
    this.casinos = [];
    
    }
  
    createCasino(nameCasino)    {
        this.casinos.push(new Casino(nameCasino));
        this.gamemachines = []
        
    }

    createGameMachine()    {
        this.gamemachines.push(new GameMachine(100));
        this.money -= 100;
    }
    
    withdrawMoney(number)    {
        this.number = number;
        console.log(`Casino money: ${this.money}`);

        


        console.log(this.gamemachines[0]);


        
        
        
    
        /* this.gamemachines.forEach(element => {
            console.log(element.value);
            
            if (number >= element.value) {
                this.number -= element.value;
                this.money += element.value;
                
                element.value = 0;  
                console.log(`Number: ${number}`); 
            }

            
            console.log(`GameMachine money: ${element.value}`);
            console.log(`Casino money: ${this.money}`);
        } ); */
        
        console.log('Money from casino is withdraw');
    }

    addMoneyCasino(value) {
        this.money += value;
        console.log(`Casino money: ${this.money}`);
        console.log('Money success add');
    }

    addMoneyGameMachine(number, value)   {
        this.gamemachines[number].value += value;
        console.log(this.gamemachines);
        console.log(this.gamemachines[number]);
        console.log('money success add to GameMachine');
    }

    deleteGameMachine(number)   {
        this.number = number;
        let cash = 0;
        cash = this.gamemachines[number].value;
        this.gamemachines[number].value = 0;
        this.gamemachines.splice(number, 1);
        for (let i = 0; i < this.gamemachines.length; i++) {
            this.gamemachines[i].value += cash / this.gamemachines.length;
        }
        
        console.log('GameMachine delete success');
        console.log(this.gamemachines);
        
    }
    
}
class GameMachine extends SuperAdmin{
    constructor(value) {
        super();
        this.value = value;
    }
    get money()  {
        return this.value;  
    }
    withDrawMoney(number) {
        this.value -= number;
        console.log('Money withdraw success')
    }
    set money(number)   {
        this.value += number;
        console.log('Money add success')
    }
    
    play(price)  {
        let firstNum = Math.floor(Math.random() * (10 - 0)) + 0;
        let secondNum = Math.floor(Math.random() * (10 - 0)) + 0;
        let thirdNum = Math.floor(Math.random() * (10 - 0)) + 0;
        this.value += price;
        
        console.log(firstNum, secondNum, thirdNum);

        if (firstNum == secondNum || firstNum == thirdNum || secondNum == thirdNum) {
            console.log('You Win!');
            price *=2;
            this.value -= price;
            return price
        }
        else if (firstNum == secondNum && secondNum == thirdNum)  {
            console.log('You super Win!');
            price *=3;
            this.value -= price;
            return price;
        }
        else {
            console.log('You Lose!');
            this.value
        }
            
    }   
} 

class User extends GameMachine{
    constructor(name, money)   {
        super();
        this.name = name;
        this.money = money;
    }
    play() {
        console.log(this.name + ' - in the game');
        super.play();   
    }
}

class Casino extends SuperAdmin{
    constructor(nameCasino)   {
        super(nameCasino);
    }
    get getMoney()  {
        
        return console.log(this.casinos);
    }
    get getMachineCount()   {
        return this.MachineCount;
    }
}



const vasya = new SuperAdmin('Vasya', 1000);

vasya.createCasino('Casino Royal');
vasya.createCasino('Santa Barbara');
vasya.createGameMachine();
vasya.createGameMachine();
vasya.createGameMachine();
vasya.withdrawMoney(150);
vasya.addMoneyCasino(400);
vasya.addMoneyCasino(800);
vasya.addMoneyGameMachine(0, 400);
vasya.addMoneyGameMachine(1, 1000);
/* vasya.deleteGameMachine(0); */
console.log(vasya);

const gamemachine1 = new GameMachine(200);
console.log(gamemachine1.money);
gamemachine1.withDrawMoney(100);
console.log(gamemachine1.money);
gamemachine1.money = 200;
console.log(gamemachine1.money);
gamemachine1.play(10);
console.log(gamemachine1.money);

const petya = new User('Petro', 100);
petya.play(100);

const las_vegas = new Casino('Orion');
console.log(las_vegas);
console.log(las_vegas.getMoney)
