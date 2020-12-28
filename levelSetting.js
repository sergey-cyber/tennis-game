
let levelOne = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
				3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
				4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

let levelTwo = [1,1,1,1,1,1,1,'*','*',1,1,1,1,1,1,
				2,2,2,2,2,2,2,'*','*',2,2,2,2,2,2,
				3,3,3,3,'*',3,3,'*','*',3,3,'*',3,3,3,
				4,4,4,4,'*',4,4,'*','*',4,4,'*',4,4,4,
				5,5,5,5,'*','*','*','*','*','*','*','*',5,5,5,
				6,6,6,6,'*','*','*','*','*','*','*','*',6,6,6,
				7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];				
				

offsetBetweenEnemys = 20;

let enemys = [];	//Массив с объектами Enemy

let getItems = (array) => {
	enemys = [];
	for(i = 0; i < array.length; i++) {
		if(i !==0) {
			array[i] > array[i-1] ? offsetBetweenEnemys = 20 : offsetBetweenEnemys += 25;
		}
		enemys.push(new Enemy(offsetBetweenEnemys, array[i]*15, array[i] !=0 ? true : false, false));
	};
}

let generateLevel = () => {
	switch (levelScore) {
		case 1:
			getItems(levelOne);
		case 2:
			getItems(levelTwo);	
	}
}




				
				