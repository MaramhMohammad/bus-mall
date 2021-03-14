'use stricts';

const productName = ['chair', 'scissors', 'tauntaun', 'cthulhu', 'shark', 'unicorn', 'dog-duck', 'bathroom', 'usb', 'dragon', 'sweep', 'bag', 'pen', 'boots', 'bubblegum', 'water-can', 'wine-glass', 'pet-sweep', 'banana', 'breakfast'];


const imgs=document.getElementById('imgs');
const leftSide=document.getElementById('leftSide');
const middleSide=document.getElementById('middleSide');
const rightSide=document.getElementById('rightSide');
let myList = document.getElementById('list');

let allImages = [];
let clicked=0;
let rounds = 25;
BusMallProducts.all=[];


//constructor function
function BusMallProducts (name){
  this.name=name,
  this.clicks = 0;
  this.viewed = 0;
  this.votes=0;
  if (name === 'usb'){
    this.path = `img/${name}.gif`;

  }else if (name === 'sweep'){
    this.path = `img/${name}.png`;

  }else{
    this.path = `img/${name}.jpg`;
  }
  BusMallProducts.all.push(this);
}




//random
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//event
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
        // console.table(BusMallProducts.all[i]);
      }
    }
    renderImg();
  }
}


function renderList() {
  for (let i = 0; i < allImages.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = `${allImages[i].name} had ${allImages[i].clicks} votes and was shown ${allImages[i].viewed} times`;
    myList.appendChild(liEl);
  }
  renderList();
}


if (clicked === rounds) {
  imgs.removeEventListener('click', clickHandler);
  renderList(); }
