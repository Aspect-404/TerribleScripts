const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !@#$%^&*()-_+=[]{}|\\;:'\",<>.?/~`";
const characterArray = [...characters.split("")];
let input = ""; let index = 0;
let calculated = "";
let startTimestamp = 0;
async function print() {
    console.clear();
    if (calculated === input) {
        console.log(`\x1b[32mI have successfully printed:\x1b[0m ${calculated} \x1b[90m[Took ${Number(Date.now() - startTimestamp).toLocaleString()}ms]\x1b[0m`);
        return process.exit(0);
    }
    const character = characterArray[Math.floor(Math.random() * characterArray.length)];
    switch (true) {
        case character === input.split("").at(index): {
            calculated = calculated + character; index++;
            console.log(`${calculated} \x1b[32mCorrect Character!\x1b[0m \x1b[90m[${Number(Date.now() - startTimestamp).toLocaleString()}ms Elapsed]\x1b[0m`);
            break;
        }
        case character.toLowerCase() === input.split("").at(index).toLowerCase() && character !== input.split("").at(index): {
            console.log(`${calculated}${character} \x1b[33mIncorrect Capitialization!\x1b[0m \x1b[90m[${Number(Date.now() - startTimestamp).toLocaleString()}ms Elapsed]\x1b[0m`);
            break;
        }
        default: {
            console.log(`${calculated}${character} \x1b[31mIncorrect Character!\x1b[0m \x1b[90m[${Number(Date.now() - startTimestamp).toLocaleString()}ms Elapsed]\x1b[0m`);
            break;
        }
    }
    setTimeout(print, 10);
}
process.stdin.setEncoding('utf8');
console.log('Please enter what you wish to print: ');
process.stdin.on('data', (data) => {
    input = data.toString().trim();
    input.split("").forEach((character) => {
        if (!characterArray.includes(character)) { characterArray.push(character); }
    });
    process.stdin.pause();
    startTimestamp = Date.now();
    print().then(() => {});
});
