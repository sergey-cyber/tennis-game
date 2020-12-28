//Обработчики событий

const levelSelect = document.querySelector('#levelSelect');
const startBtn = document.querySelector('.startBtn');
const menu = document.querySelector('.menu');

startBtn.onclick = function() {
	levelSelect.value == 'Easy' ? ball.ySpeed = 1 :
	levelSelect.value == 'Normal' ? ball.ySpeed = 1.3 : ball.ySpeed = 1.66;
	menu.style.display = 'none';
	getItems(levelOne);
	start();
}

document.querySelector("body").addEventListener('keydown', function(e) {
	if(e.keyCode == 39) {
		board.xSpeed = 2.6;
	} if(e.keyCode == 37) {
		board.xSpeed = -2.6;
	} 
});

document.querySelector("body").addEventListener('keyup', function(e) {
	if(e.keyCode == 39) {
		board.xSpeed = 0;
	} if(e.keyCode == 37) {
		board.xSpeed = 0;
	} 
});

document.querySelector("body").addEventListener('mousedown', function(e) {
	if(e.target.getAttribute('id') == 'boardRight') {
		board.xSpeed = 2.6;
	} if(e.target.getAttribute('id') == 'boardLeft') {
		board.xSpeed = -2.6;
	} 
});

document.querySelector("body").addEventListener('mouseup', function(e) {
	if(e.target.getAttribute('id') == 'boardRight') {
		board.xSpeed = 0;
	} if(e.target.getAttribute('id') == 'boardLeft') {
		board.xSpeed = -0;
	} 
});

document.querySelector(".restart").addEventListener('click', function(e) {
	if(e.target.className == 'restartBtn') {
		this.style.display = 'none';
		ball.x = width/2,
		ball.y = width-15;
		board.x = (width/2) - 20;
		start();
	} if(e.target.className == 'complete') {
		this.style.display = 'none';
		ball.x = width/2,
		ball.y = width-15;
		board.x = (width/2) - 20;
		menu.style.display = 'block';
		heartScore = 5; 
		scoreСomputation(heartScore, hearts);
		levelScore = 1 ;
		scoreСomputation(levelScore, level);
	}
});

nextLevel.addEventListener('click', function(e) {
	switch (e.target.getAttribute('id')) {
		case 'nextLevelBtn':
			ball.x = width/2,
			ball.y = width-15;
			board.x = (width/2) - 20;
			levelScore++;
			generateLevel();
			this.style.display = 'none';
			scoreСomputation(levelScore, level);
			start();
			break;
		case 'completeBtn':
			this.style.display = 'none';
			ball.x = width/2,
			ball.y = width-15;
			board.x = (width/2) - 20;
			menu.style.display = 'block';
			heartScore = 5; 
			scoreСomputation(heartScore, hearts);
			levelScore = 1 ;
			scoreСomputation(levelScore, level);
			break;
	}
});

////////////////////// for mobile

document.querySelector("body").addEventListener('pointerdown', function(e) {
	if(e.target.getAttribute('id') == 'boardRight') {
		board.xSpeed = 2.6;
	} if(e.target.getAttribute('id') == 'boardLeft') {
		board.xSpeed = -2.6;
	} 
});

document.querySelector("body").addEventListener('pointerup', function(e) {
	if(e.target.getAttribute('id') == 'boardRight') {
		board.xSpeed = 0;
	} if(e.target.getAttribute('id') == 'boardLeft') {
		board.xSpeed = -0;
	} 
});



