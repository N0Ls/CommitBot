const { exec } = require("child_process");
const prompt = require('prompt-sync')();

var https = require('https');

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

async function responseCode() {
  url='https://www.google.fr';
  var x = await connectionCode(url);
  console.log(x);
  if(x == 200){
    askCommitNumber();
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
