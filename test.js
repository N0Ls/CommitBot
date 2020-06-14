//const { exec } = require("child_process");
const prompt = require('prompt-sync')();

var https = require('https');
const fs = require("fs"); // Or `import fs from "fs";` with ESM
const util = require('util');
const exec = util.promisify(require('child_process').exec);


// exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });



function connectionCode(url) {
  return new Promise(function(resolve, reject) {
    https.get(url,  function(res){
      //console.log("StatusCode: ",  res.statusCode);
      if (res.statusCode == 200 ) {
        resolve(res.statusCode)
      } else {
        reject(res.statusCode)
      }
    });
  });
}
function askCommitNumber(){
  var nbCommits;
  nbCommits = prompt('Enter the number of commits you want : ');
  console.log(Number(nbCommits));
  return nbCommits;
}

function askRepo(){
  var repo = prompt('Enter the git you want to add commits to : ');
  return repo;
}

async function responseCode() {
  url='https://www.google.fr';
  var x = await connectionCode(url);
  console.log(x);
  if(x == 200){
    nbCommits = askCommitNumber();
    var repo = prompt('Enter the git you want to add commits to : ');
    // var mail = prompt('Enter your github mail : ');
    // var name = prompt('Enter your github username : ');
    var codeRepo = await connectionCode(repo);
    if(codeRepo == 200){
      console.log("le repo est bon");
      if (fs.existsSync("gitfolder")) {
          console.log("folder found");
          const { stdout, stderr } = await exec("cd gitfolder");
          console.log('stdout:', stdout);
          console.error('stderr:', stderr);
      }
      else{
          console.log("Folder not found");
          console.log("Creating folder");
          const { stdout, stderr } = await exec("mkdir gitfolder");
          console.log('stdout:', stdout);
          console.error('stderr:', stderr);

          [ stdout, stderr ] = await exec("cd gitfolder");
          console.log('stdout:', stdout);
          console.error('stderr:', stderr);
      }
    }
  }
}
responseCode();

// const connection = new Promise(function(resolve, reject) {
//   https.get(url,  function(res){
//     //console.log("StatusCode: ",  res.statusCode);
//     if (res.statusCode == 200 ) {
//       resolve(res.statusCode)
//     } else {
//       reject(res.statusCode)
//     }
//   });
// })
//
// connection
//   .then(function connectionGranted(response) {
//     console.log(response)
//     var nbCommits;
//     nbCommits = prompt('Enter the number of commits you want : ');
//     console.log(Number(nbCommits));
//     return response
//   })
//   .catch(function connectionError(err) {
//     console.error(err)
//   })
