const rgbColor = document.querySelector('.rgb-value');
const newColorBtn = document.querySelector('.newColor');
const easyButton = document.querySelector('.easy');
const hardButton = document.querySelector('.hard');
let modeNow = '';


class ColorGuessingGame {

	constructor(cardsNumber){
		this.colorArray = new Array();
		this.cardsNumber = cardsNumber;
		this.randomChoice;

		if(this.cardsNumber > 3){
			this.mode = 'hard';
		}else{
			this.mode = 'easy';
		}
		modeNow = this.mode;
	}
	clear(){
		document.querySelector('#main').innerHTML = '';
		this.colorArray = [];
		this.randomChoice = '';
	}

	modeButtonDisplay(){
		if(this.mode === 'hard'){
			hardButton.classList.add('selected');
			if(easyButton.classList.contains('selected')){
				easyButton.classList.remove('selected')
			}
		}else{
			if(hardButton.classList.contains('selected')){
				hardButton.classList.remove('selected')
			}
			easyButton.classList.add('selected');
		}
	}

	display(){
		// Clear any recent or temp value
		this.clear();

		// Add random colors 6 times to an array
		for(let i = 0; i < this.cardsNumber; i++){
			this.colorArray.push(this.randomColors());
		}

		for(let x = 0; x < this.colorArray.length; x++){
			this.showCards(this.colorArray[x]);
			this.randomChoice = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
		}

		const colorItems = document.querySelectorAll('.box');

		colorItems.forEach(e =>{
			e.addEventListener('click', (e)=> {
				const cardColor = e.target.getAttribute('color');
				this.checkCards(cardColor, this.randomChoice);
			});
		});

		// Refresh DOM color value
		rgbColor.innerText = this.randomChoice.replace("rgb", "RGB");
		this.modeButtonDisplay();
	}	

	// Check if your guess equal to a random color
	checkCards(element, randomColor){
		if(element === randomColor){
			this.clear();
			this.display();
		}else{
			return alert('You failed');
		}
	}


	// Add html elements to the page
	showCards(color){
		const div = document.createElement('div');
		div.classList.add('box');
		div.style.backgroundColor = `${color}`;
		div.setAttribute('color', color);
		return document.querySelector('#main').appendChild(div);
	}

	// Give a one random colors
	randomColors(){
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		return `rgb(${r}, ${g}, ${b})`;
	}	



}

// Rebuild the game & shuffle colors' cards
newColorBtn.addEventListener('click', ()=>{
	if(modeNow == 'hard'){
		const colorGuesssingGame = new ColorGuessingGame(6);
		colorGuesssingGame.display();
	}else{
		const colorGuesssingGame = new ColorGuessingGame(3);
		colorGuesssingGame.display();
	}
});


// Instatiate the game for first time.
const colorGuesssingGame = new ColorGuessingGame(3);
document.addEventListener('DOMContentLoaded', colorGuesssingGame.display());

// Easy Game Mode
easyButton.addEventListener('click', e =>{
	const colorGuesssingGame = new ColorGuessingGame(3);
	colorGuesssingGame.display();
});

// Hard Game Mode
hardButton.addEventListener('click', e =>{
	const colorGuesssingGame = new ColorGuessingGame(6);
	colorGuesssingGame.display();
});