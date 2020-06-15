var https = require('https');
const fs = require("fs");
const util = require('util');
const prompt = require('prompt-sync')();
const exec = util.promisify(require('child_process').exec);

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
  /* Checking internet status */
  url='https://www.google.fr';
  var statusCodeTest = await connectionCode(url);
  console.log(statusCodeTest);
  if(statusCodeTest == 200){
    nbCommits = askCommitNumber(); //getting number of commits
    var repo = prompt('Enter the git you want to add commits to : '); //getting the repository
    // var mail = prompt('Enter your github mail : ');
    // var name = prompt('Enter your github username : ');

    //Checking validity of repo
    var codeRepo = await connectionCode(repo);
    if(codeRepo == 200){
      console.log("le repo est bon");
      //Creating folder for the local repository clone
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

      //Cloning the remote repository
      var { stdout, stderr } = await exec("cd gitfolder && git clone "+repo);
      console.log("Repo Téléchargé");

      //Getting the name of reposiory
      var parts = repo.split('/');
      var repoName = parts[parts.length - 1];
      console.log(repoName);

      //var { stdout, stderr } = await exec('mv -f gitfolder/'+repoName+'/*   gitfolder >>temp.speedx.xxxxx');
		  //var { stdout, stderr } = await exec('mv -f gitfolder/'+repoName+'/.??* gitfolder>>temp.speedx.xxxxx');
      //var { stdout, stderr } = await exec("cd gitfolder && git remote add origin "+repo);
      // var { stdout, stderr } = await exec('cd gitfolder/'+repoName+' git config user.name \"'+name+'\"');
      // var { stdout, stderr } = await exec('cd gitfolder/'+repoName+' git config user.email \"'+mail+'\"');

      //Beginning of commit loop
      for (var i = 0; i < Number(nbCommits); i++) {

        //Content of commit
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var ms = today.getMilliseconds();
        today = mm + '/' + dd + '/' + yyyy + ' ' + h + ' h ' + m + ' ' + s + ':' + ms;

        var commit="Commit: Update commits @ "+ today;

        //Commit
        var { stdout, stderr } = await exec("echo " + commit + " > gitfolder/"+repoName+"/commit.md");
        var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git add commit.md");
        var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git commit -m 'Commit msg "+ i+ "'");
        console.log("Commit " + i);
      }
      //Final push
      var { stdout, stderr } = await exec("cd gitfolder/"+repoName+" && git push origin master");
    }
  }
}
responseCode();
