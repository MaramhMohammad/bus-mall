'use stricts';

const productName = ['chair', 'scissors', 'tauntaun', 'cthulhu', 'shark', 'unicorn', 'dog-duck', 'bathroom', 'usb', 'dragon', 'sweep', 'bag', 'pen', 'boots', 'bubblegum', 'water-can', 'wine-glass', 'pet-sweep', 'banana', 'breakfast'];


const imgs=document.getElementById('imgs');
const leftSide=document.getElementById('leftSide');
const middleSide=document.getElementById('middleSide');
const rightSide=document.getElementById('rightSide');
// let myList = document.getElementById('list');
let button = document.createElement('button');

// let clicked=0;
let rounds = 25;

BusMallProducts.all=[];

//


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
for(let i=0;i<productName.length;i++){

  new BusMallProducts(productName[i]);

}

//render images
function renderImg() {

  const leftIndex=randomNumber(0,BusMallProducts.all.length-1);
  const leftRandomImg=BusMallProducts.all[leftIndex];

  const rightIndex=randomNumber(0,BusMallProducts.all.length-1);
  const rightRandomImg=BusMallProducts.all[rightIndex];

  const middleIndex=randomNumber(0,BusMallProducts.all.length-1);
  const middleRandomImg=BusMallProducts.all[middleIndex];

  if (rightRandomImg!== leftRandomImg && middleRandomImg !==rightRandomImg&&leftRandomImg!==middleRandomImg){

    leftSide.src=leftRandomImg.path;
    leftSide.title=leftRandomImg.name;
    leftSide.alt=leftRandomImg.name;


    rightSide.src=rightRandomImg.path;
    rightSide.title=rightRandomImg.name;
    rightSide.alt=rightRandomImg.name;


    middleSide.src=middleRandomImg.path;
    middleSide.title=middleRandomImg.name;
    middleSide.alt=middleRandomImg.name;



    BusMallProducts.all[leftIndex].viewed++;
    BusMallProducts.all[middleIndex].viewed++;
    BusMallProducts.all[rightIndex].viewed++;

  }

}

renderImg();



//click event
imgs.addEventListener('click',clickHandler);

function clickHandler(event){

  if (event.target.id === 'leftSide' || event.target.id === 'rightSide'|| event.target.id === 'middleSide'){

    for(let i=0;i<BusMallProducts.all.length;i++){
      if (BusMallProducts.all[i].name === event.target.title){ BusMallProducts.all[i].votes++;
        localStorage.setItem('prodcts', JSON.stringify(BusMallProducts.all));
        // BusMallProducts.all[i].viewed++;

        // console.table(BusMallProducts.all[i]);
      }
    }
    // console.log(event);
    rounds-=1;
    // checkDuplicate();
    checkClicks();

  }
  // let checkD = [...new Set(productName)];
  // checkD.forEach(data=>console.log(data));
}


function checkClicks (){

  if (rounds === 0) {
    imgs.removeEventListener('click', clickHandler);
    alert('Thank you for voting, Scroll down to see the result ');
    renderButton();
  }
  else {
    renderImg();

  }
}


function getprodcts(){
  // retrieve data from local storage
  const data = localStorage.getItem('prodcts');
  if (data){
    const gitData=JSON.parse(data);
    BusMallProducts.all=gitData;
  }
  return JSON.parse(data);
}
getprodcts();




function renderButton(){
  button.innerHTML = 'View result';
  // Append in main
  let main = document.getElementsByTagName('main')[0];
  main.appendChild(button);
  // Add event handler
  button.addEventListener ('click', function() {
    // renderList();
    createChart();
  });
}
imgs.removeEventListener('click', renderButton);



function createChart(){

  let context = document.getElementById('myChart').getContext('2d');
  let namesArr=[];
  let votesArr=[];
  let viewedArr=[];


  for(let i=0;i<BusMallProducts.all.length;i++){
    namesArr.push(BusMallProducts.all[i].name);

  }
  for(let i=0;i<BusMallProducts.all.length;i++){
    viewedArr.push(BusMallProducts.all[i].viewed);
  }

  for(let i=0;i<BusMallProducts.all.length;i++){
    votesArr.push(BusMallProducts.all[i].votes);
  }


  let chartObject={
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [{
        label: 'votes',
        data: votesArr,
        backgroundColor: ['rgb(100, 99, 132)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'],

        borderColor: [ 'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)','rgb(255, 99, 132)'],
        borderWidth: 1
      }, {
        label: 'views',
        data: viewedArr,
        backgroundColor: 'rgb(100, 40, 160)',
        borderColor: 'rgb(158, 50, 12)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          beginAtZero:true
        }]
      }
    }
  };
  // eslint-disable-next-line no-undef
  let myChart = new Chart (context,chartObject);
  console.log(myChart);
}
