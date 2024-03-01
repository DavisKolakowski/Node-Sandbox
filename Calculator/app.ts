import * as readline from 'readline';

enum Operation {
    Add = 0,
    Subtract = 1,
    Multiply = 2,
    Divide = 3,
    Clear = 4,
    Exit = 5
}

class Calculator {
    private currentValue: number | null = null;

    constructor() {
        this.greetUser();
        this.start();
    }

    private greetUser() {
        const hour = new Date().getHours();
        let greeting = 'Good morning';
        if (hour >= 12 && hour < 18) {
            greeting = 'Good afternoon';
        } else if (hour >= 18 || hour < 4) {
            greeting = 'Good evening';
        }
        console.log(`${greeting}! Welcome to the Calculator app.`);
    }

    private start() {
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
        } else {
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
                    } else {
                        rl.question('Enter a number: ', (numStr) => {
                            const num = this.parseNumber(numStr);
                            this.performOperation(operation, num);
                            console.log(`Current value: ${this.currentValue}`);
                            rl.close();
                            this.start();
                        });
                    }
                } else {
                    console.log('Invalid operation. Please try again.');
                    rl.close();
                    this.start();
                }
            });
        }
    }

    private parseOperation(input: string): Operation | null {
        const trimmedInput = input.trim().toLowerCase();
        if (!isNaN(parseInt(trimmedInput, 10))) {
            const num = parseInt(trimmedInput, 10);
            if (num in Operation) {
                return num;
            }
        } else {
            for (const key in Operation) {
                if (isNaN(Number(key)) && key.toLowerCase() === trimmedInput) {
                    return Operation[key as keyof typeof Operation];
                }
            }
        }
        return null;
    }

    private performOperation(operation: Operation, num: number) {
        switch (operation) {
            case Operation.Add:
                this.currentValue! += num;
                break;
            case Operation.Subtract:
                this.currentValue! -= num;
                break;
            case Operation.Multiply:
                this.currentValue! *= num;
                break;
            case Operation.Divide:
                if (num !== 0) {
                    this.currentValue! /= num;
                } else {
                    console.log('Cannot divide by zero.');
                }
                break;
        }
    }

    private parseNumber(input: string): number {
        const trimmedInput = input.trim();
        let asciiString = '';
        for (const char of trimmedInput) {
            if (isNaN(parseInt(char, 10))) {
                asciiString += char.charCodeAt(0);
            } else {
                asciiString += char;
            }
        }
        const parsedNumber = parseFloat(asciiString);
        if (isNaN(parsedNumber)) {
            console.log('Invalid number. Please try again.');
            return this.currentValue;
        } else {
            return parsedNumber;
        }
    }

    private sayGoodbye() {
        const hour = new Date().getHours();
        let farewell = 'Have a nice morning';
        if (hour >= 12 && hour < 18) {
            farewell = 'Have a nice afternoon';
        } else if (hour >= 18 || hour < 4) {
            farewell = 'Have a nice evening';
        }
        console.log(`${farewell}! Thank you for using the Calculator app.`);
    }
}

new Calculator();