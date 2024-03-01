"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
var Operation;
(function (Operation) {
    Operation[Operation["Add"] = 0] = "Add";
    Operation[Operation["Subtract"] = 1] = "Subtract";
    Operation[Operation["Multiply"] = 2] = "Multiply";
    Operation[Operation["Divide"] = 3] = "Divide";
    Operation[Operation["Clear"] = 4] = "Clear";
    Operation[Operation["Exit"] = 5] = "Exit";
})(Operation || (Operation = {}));
class Calculator {
    constructor() {
        this.currentValue = null;
        this.greetUser();
        this.start();
    }
    greetUser() {
        const hour = new Date().getHours();
        let greeting = 'Good morning';
        if (hour >= 12 && hour < 18) {
            greeting = 'Good afternoon';
        }
        else if (hour >= 18 || hour < 4) {
            greeting = 'Good evening';
        }
        console.log(`${greeting}! Welcome to the Calculator app.`);
    }
    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (this.currentValue === null) {
            rl.question('Enter a number: ', (numStr) => {
                this.currentValue = this.parseNumber(numStr);
                console.log(`Current value: ${this.currentValue}`);
                rl.close();
                this.start();
            });
        }
        else {
            rl.question('Enter an operation (0: Add, 1: Subtract, 2: Multiply, 3: Divide, 4: Clear, 5: Exit): ', (input) => {
                const operation = this.parseOperation(input);
                if (operation !== null) {
                    if (operation === Operation.Exit) {
                        this.sayGoodbye();
                        rl.close();
                        return;
                    }
                    if (operation === Operation.Clear) {
                        this.currentValue = null;
                        console.log('Cleared value.');
                        rl.close();
                        this.start();
                    }
                    else {
                        rl.question('Enter a number: ', (numStr) => {
                            const num = this.parseNumber(numStr);
                            this.performOperation(operation, num);
                            console.log(`Current value: ${this.currentValue}`);
                            rl.close();
                            this.start();
                        });
                    }
                }
                else {
                    console.log('Invalid operation. Please try again.');
                    rl.close();
                    this.start();
                }
            });
        }
    }
    parseOperation(input) {
        const trimmedInput = input.trim().toLowerCase();
        if (!isNaN(parseInt(trimmedInput, 10))) {
            const num = parseInt(trimmedInput, 10);
            if (num in Operation) {
                return num;
            }
        }
        else {
            for (const key in Operation) {
                if (isNaN(Number(key)) && key.toLowerCase() === trimmedInput) {
                    return Operation[key];
                }
            }
        }
        return null;
    }
    performOperation(operation, num) {
        switch (operation) {
            case Operation.Add:
                this.currentValue += num;
                break;
            case Operation.Subtract:
                this.currentValue -= num;
                break;
            case Operation.Multiply:
                this.currentValue *= num;
                break;
            case Operation.Divide:
                if (num !== 0) {
                    this.currentValue /= num;
                }
                else {
                    console.log('Cannot divide by zero.');
                }
                break;
        }
    }
    parseNumber(input) {
        const trimmedInput = input.trim();
        let asciiString = '';
        for (const char of trimmedInput) {
            asciiString += char.charCodeAt(0);
        }
        const parsedNumber = parseFloat(asciiString);
        if (isNaN(parsedNumber)) {
            console.log('Invalid number. Please try again.');
            return 0;
        }
        else {
            return parsedNumber;
        }
    }
    sayGoodbye() {
        const hour = new Date().getHours();
        let farewell = 'Have a nice morning';
        if (hour >= 12 && hour < 18) {
            farewell = 'Have a nice afternoon';
        }
        else if (hour >= 18 || hour < 4) {
            farewell = 'Have a nice evening';
        }
        console.log(`${farewell}! Thank you for using the Calculator app.`);
    }
}
new Calculator();
//# sourceMappingURL=app.js.map