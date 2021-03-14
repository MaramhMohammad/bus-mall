'use stricts';

//Create a constructor function that creates an object associated with each product, and has the following properties: 1- Name of the product 2- File path of image 3- Times the image has been shown
//........................................................
//random  generate three unique product images from the images directory and display them side-by-side-by-side


//For each of the three images, increment its property of times it has been shown by one
//................................
//Attach an event listener to the section of the HTML page where the images are going to be displayed.

//Once the users ‘clicks’ a product, generate three new products for the user to pick from.

//In the constructor function define a property to hold the number of times a product has been clicked.
//........................
//After every selection by the viewer, update the newly added property to reflect if it was clicked.

//By default, the user should be presented with 25 rounds of voting before ending the session.

//Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

//report : Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered. 
//After voting rounds have been completed, remove the event listeners on the product.

const imgs=document.getElementById('imgs');
const leftSide=document.getElementById('leftSide');
const middleSide=document.getElementById('middleSide');
const rightSide=document.getElementById('rightSide');

const productName = ['chair', 'scissors', 'tauntaun', 'cthulhu', 'shark', 'unicorn', 'dog-duck', 'bathroom', 'usb', 'dragon', 'sweep', 'bag', 'pen', 'boots', 'bubblegum', 'water-can', 'wine-glass', 'pet-sweep', 'banana', 'breakfast'];

//constructor function
function BusMallProducts (name){
  this.name=name,
  this.clicks = 0;
  this.viewed = 0;
  this.votes=0;
  BusMallProducts.all.push(this);

  if (name === 'usb'){
    this.path = `img/${name}.gif`; 
  }else if (name === 'sweep'){
    this.path = `img/${name}.png`; 
  }else{
    this.path = `img/${name}.jpg`;
  }
}

//random
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//event
BusMallProducts.all=[];

for(let i=0;i<productName.length;i++){
  new BusMallProducts(productName[i]);
}
//render images
function renderImg() {
  const leftIndex=randomNumber(0,BusMallProducts.all.length-1);
  const leftRandomImg=BusMallProducts.all[leftIndex];
  leftSide.src=leftRandomImg.path;
  leftSide.title=leftRandomImg.name;
  leftSide.alt=leftRandomImg.name;

  const rightIndex=randomNumber(0,BusMallProducts.all.length-1);
  const rightRandomImg=BusMallProducts.all[rightIndex];
  rightSide.src=rightRandomImg.path;
  rightSide.title=rightRandomImg.name;
  rightSide.alt=rightRandomImg.name;

  const middleIndex=randomNumber(0,BusMallProducts.all.length-1);
  const middleRandomImg=BusMallProducts.all[middleIndex];
  middleSide.src=middleRandomImg.path;
  middleSide.title=middleRandomImg.name;
  middleSide.alt=middleRandomImg.name;
}
renderImg();
//click
imgs.addEventListener('click',clickHandler);

function clickHandler(event){
  if (event.target.id === 'leftSide' || event.target.id === 'rightSide'|| event.target.id === 'middleSide'){
    for(let i=0;i<BusMallProducts.all.length;i++){
      if (BusMallProducts.all[i].name === event.target.title){
        BusMallProducts.all[i].votes++;
        console.table(BusMallProducts.all[i]);
      }
    }
    renderImg();
  }
}
