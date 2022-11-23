const fs = require('fs');
const request = require('request');
let args  = process.argv.slice(2);

request(args[0], (error, response, body) => {

  let bytes = body.length;

  fs.writeFile(args[1], body, error =>{

    if(error){
      console.error(error);
    }
    console.log(`Downloaded and saved ${bytes} bytes to ${args[1]}`)
  })
})

//args[0] is address to pull from.
//args[1] is path where files will be stored.

