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
          const { stdout, stderr } = await exec("cd gitfolder && rm -rf *");
      }
      else{
          console.log("Folder not found");
          console.log("Creating folder");
          var { stdout, stderr } = await exec("mkdir gitfolder");

          var { stdout, stderr }  = await exec("cd gitfolder && rm -rf *");
      }

      //var { stdout, stderr } = await exec("rm -rf .git>temp.speedx.xxxxx");
      var { stdout, stderr } = await exec("cd gitfolder && git clone "+repo);
      console.log("Repo Téléchargé");
      var parts = repo.split('/');
      var repoName = parts[parts.length - 1];
      console.log(repoName);

      //var { stdout, stderr } = await exec('mv -f gitfolder/'+repoName+'/*   gitfolder >>temp.speedx.xxxxx');
		  //var { stdout, stderr } = await exec('mv -f gitfolder/'+repoName+'/.??* gitfolder>>temp.speedx.xxxxx');
      //var { stdout, stderr } = await exec("cd gitfolder && git remote add origin "+repo);
      // var { stdout, stderr } = await exec('cd gitfolder/'+repoName+' git config user.name \"'+name+'\"');
      // var { stdout, stderr } = await exec('cd gitfolder/'+repoName+' git config user.email \"'+mail+'\"');

      for (var i = 0; i < Number(nbCommits); i++) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var ms = today.getMilliseconds();
        today = mm + '/' + dd + '/' + yyyy + ' ' + h + ' h ' + m + ' ' + ms;

        var commit="Commit: Update commits @ "+ today;

        var { stdout, stderr } = await exec("echo " + commit + " > gitfolder/"+repoName+"/commit.md");

        var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git add commit.md");
        var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git commit -m 'Commit msg "+ i+ "'");
        console.log(stderr);
        console.log("Commit " + i);
      }
      var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git push origin master");
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
