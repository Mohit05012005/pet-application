const fs = require('fs');
 

function main(){
    const real = fs.readFileSync('./readFile.txt','utf8');
    console.log(real);
    console.log("after the reading ");
}

main().catch((err)=>{
    console.log(err);
})


