
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;	//Ширина канваса
let height = canvas.height; //Высота канваса
const level = document.querySelector('#level');
const hearts = document.querySelector('#heart');
const restart = document.querySelector('.restart');
const nextLevel = document.querySelector('.nextLevel');
let heartScore = 5; 
let levelScore = 1;
let intervalId;

let scoreСomputation = (score, el) => {
	el.innerHTML = score;
}

scoreСomputation(heartScore, hearts);
scoreСomputation(levelScore, level);

const gameOver = function(){
	clearInterval(intervalId);
	ctx.font = "55px Comic Sans MS";
	ctx.fillStyle = "tomato";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", width/2,height/2);
};

//Ball ball.ySpeed

let ball = {
	x: width/2,
	y: width-15,
	xSpeed: 0.6,
	ySpeed: 1,
	moveDirectionY: 'down',
	moveDirectionX: 'right',
	
	render() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		ctx.fill();
	},
	move() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if ( (this.x>width-5) || (this.x<5)  //Проверка столкновения мяча со стенами и с доской 
			|| (this.x > board.x && this.x < board.x+board.width 
					&& this.y > board.y && this.y < board.y-board.height) ) {
			this.xSpeed = -this.xSpeed;
		} else if ( (this.y<5) 
					|| (this.x > board.x && this.x < board.x+board.width && this.y > board.y-board.height) ) {
			this.ySpeed = -this.ySpeed;		
		} else if (this.y>height-5) {
			if(heartScore < 1) {
				gameOver();
			} else {
				clearInterval(intervalId);
				heartScore--;
				scoreСomputation(heartScore, hearts);
				restart.style.display = 'flex';
			}
		}
		this.ySpeed < 0 ? this.moveDirectionY = 'top' : this.moveDirectionY = 'down';
		this.xSpeed < 0 ? this.moveDirectionX = 'left' : this.moveDirectionX = 'right';
	}
};

//Board

let board = {
	x: (width/2) - 20,
	y: width-10,
	xSpeed: 0,
	ySpeed: 2,
	width: 50,
	height: 5,
	render() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},	
	move() { 
		this.x += this.xSpeed;
		if(this.x + this.width > width) {	//Проверка - доска не ухадит за пределы
			this.x = width - this.width;
		} else if(this.x < 0) {
			this.x = 0;
		}
	} 
}

//Enemys

class Enemy {
	constructor(x, y, isRender, surprise) {
		this.isRender = isRender;
		this.x = x;
		this.y = y;
		this.w = 20;
		this.h = 10;
		this.surprise = false;
	};
	render() {
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
};

let checkCollision = (array) => {	//Проверка на столкновения 
	for(i = 0; i < array.length; i++) { //Меняем направление при столкновении с Enemy в зависимости от направления движения и удаляем его			
		switch (ball.moveDirectionY+ ' and ' + ball.moveDirectionX) {
			case 'top and right': 
				if( ball.x > array[i].x && ball.x < array[i].x + array[i].w 
						&& ball.y-5 > array[i].y + array[i].h && ball.y-5 < array[i].y ) {
					array.splice(i, 1);
					ball.ySpeed = -ball.ySpeed;		
				} else if (ball.x+5 > array[i].x && ball.x+5 < array[i].x + array[i].w
							  && ball.y < array[i].y + array[i].h && ball.y > array[i].y) {
					array.splice(i, 1);
					ball.xSpeed = -ball.xSpeed;				
				}
			case 'top and left': 
				if(ball.x < array[i].x + array[i].w && ball.x > array[i].x 
						&& ball.y-5 < array[i].y + array[i].h && ball.y-5 > array[i].y) {
					array.splice(i, 1);
					ball.ySpeed = -ball.ySpeed;		
				} else if (ball.x-5 > array[i].x && ball.x-5 < array[i].x + array[i].w
							  && ball.y < array[i].y + array[i].h && ball.y > array[i].y) {
					array.splice(i, 1);
					ball.xSpeed = -ball.xSpeed;				
				}
			case 'down and right': 
				if(ball.x < array[i].x + array[i].w && ball.x > array[i].x 
						&& ball.y+5 < array[i].y + array[i].h && ball.y+5 > array[i].y) {
					array.splice(i, 1);
					ball.ySpeed = -ball.ySpeed;		
				} else if (ball.x+5 > array[i].x && ball.x+5 < array[i].x + array[i].w
							  && ball.y < array[i].y + array[i].h && ball.y > array[i].y) {
					array.splice(i, 1);
					ball.xSpeed = -ball.xSpeed;				
				}	
			case 'down and left': 
				if(ball.x < array[i].x + array[i].w && ball.x > array[i].x 
						&& ball.y+5 < array[i].y + array[i].h && ball.y+5 > array[i].y) {
					array.splice(i, 1);
					ball.ySpeed = -ball.ySpeed;		
				} else if (ball.x-5 > array[i].x && ball.x-5 < array[i].x + array[i].w
							  && ball.y < array[i].y + array[i].h && ball.y > array[i].y) {
					array.splice(i, 1);
					ball.xSpeed = -ball.xSpeed;				
				}	
		}
		
	};	
}

let start = () => {
	intervalId = setInterval(function(){
		
		ctx.clearRect(0, 0, width, height);		
		ball.render();
		ball.move();
		board.render();
		board.move();
		if(enemys.length > 0) {
			checkCollision(enemys);
			for(i = 0; i < enemys.length; i++) { //Отрисовываем каждый елемент Enemy
				enemys[i].render();	
			}
			console.log(ball.moveDirectionY+ ' and ' + ball.moveDirectionX);
		} else {
			clearInterval(intervalId);
			nextLevel.style.display = 'flex';
		}
	},5);
}
//В коментарии вставить switch ball.moveDirectionY+ ' ' + ball.moveDirectionX 
//и сделать проверку четырех направлений




































