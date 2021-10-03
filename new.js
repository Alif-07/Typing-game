const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('setting');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving',
];
//Init word
let randomWord;
//Init score
let score = 0;
//init time
let time = 10;
//Difficulty level
let difficulty =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';
//Set difficulty select value
difficultySelect.value =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';
//Start counting down
const timeInterval = setInterval(updateTime, 1000);
//Focus on text on start
text.focus();

//Generate random word from array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

//Add word to dom
function addWordToDom() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}
addWordToDom();
//Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}
//update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';

	if (time === 0) {
		clearInterval(timeInterval);
		//End game
		gameOver();
	}
}
//Game over show end screen
function gameOver() {
	endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your Final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
    `;
	endgameEl.style.display = 'flex';
}
//Event listeners
//Typing
text.addEventListener('input', (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDom();
		updateScore();
		if (difficulty == 'hard') {
			time += 2;
		} else if (difficulty == 'medium') {
			time += 3;
		} else {
			time += 5;
		}
		updateTime();
		e.target.value = '';
	}
});
//Settings btn clicked
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
//Setting select
settingsForm.addEventListener('change', (e) => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty);
});
