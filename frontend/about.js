const url = new URL('http://localhost:9000/pets/login-form');
fetching(url);
const container = document.querySelector('.container');
async function fetching(url){
  let datat =  await fetch(url);
    let realData = await datat.json();
    console.log(realData);
   let {data} = realData;
   console.log(data);
   console.log(data.realq[0]);
   display(data.realq[2]);
   data.realq.forEach(element => {
    display(element);
   });
}

function display(doc){
   console.log(doc);
    container.innerHTML += `<div class="main">Hii ${doc.PetName} this side!
    
     <p>pet info </p>
     <div id="info"> NAME: ${doc.PetName} 
     <br>
     Pet Bread: ${doc.Species}
     <br>
     <p>${doc.petDescription}</p>
     <button> click here for adoption!</button>
     <br>
     <br>
     </div>
    </div>
 `
//  const main = document.querySelector(".main");
//  main.setAttribute("style","font-size: 2rem")
    
}