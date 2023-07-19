const fs = require ('fs'); 


function mdlinks ( directory) {

 fs.readFile('./README.md', 'utf-8', (err, data) => {
  if(err) {
      console.error(err);
      return
  } 

  //imprime os links com caracteres
  const regex = /\[([^[\]]?)\]\((https?:\/\/[^\s?#.].[^\s])\)/gm
  const links = data.match(regex);
  console.log(links);  

});
}