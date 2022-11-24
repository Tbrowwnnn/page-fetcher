const fs = require('fs');
const request = require('request');
let args = process.argv.slice(2);
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {

  const fileWriter = function() {
    fs.writeFile(args[1], body, error => {
      let bytes = body.length;

      if (error) {
        console.error(error);
      }
      console.log(`Downloaded and saved ${bytes} bytes to ${args[1]}`);
      process.exit();
    });
  };

  if (error) {
    return console.error(error, response);
  }
  if (fs.existsSync(args[1])) {

    rl.question('File Already exists, Press "y" then "enter" to overwrite file. Press "enter" to cancel ', (answer) => {
      if (answer === "y") {
        fileWriter();

      } else process.exit();
    });
  } else {
    fileWriter();
  }
});



//args[0] is address to pull from.
//args[1] is path where files will be stored.

