const args = process.argv;
const message = args[2];
const version = args[3];

console.log(message.replace(/%tag%/, version));
