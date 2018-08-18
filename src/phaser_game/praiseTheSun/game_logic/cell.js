import GAME from '../gameVariables'

class Cell {
	constructor(xPos, yPos){
		this.alive = true;
		this.allowDiagonals = false;
		this.cycleLimit = 30;

		this.x = xPos;
		this.y = yPos;
	}

	//-------------------Directional-------------------------------
	north = () =>({
		x: this.x,
		y: this.y - 1,
		direction: 'north'
	});

	northEast = () =>({
		x: this.x + 1,
		y: this.y - 1,
		direction: 'north east'
	});

	east = () =>({
		x: this.x + 1,
		y: this.y,
		direction: 'east'
	});

	southEast = () =>({
		x: this.x + 1,
		y: this.y + 1,
		direction: 'south east'
	});

	south = () =>({
		x: this.x,
		y: this.y + 1,
		direction: 'south'
	});

	southWest = () =>({
		x: this.x - 1,
		y: this.y - 1,
		direction: 'south west'
	});

	west = () =>({
		x: this.x - 1,
		y: this.y,
		direction: 'west'
	});

	northWest = () =>({
		x: this.x - 1,
		y: this.y - 1,
		direction: 'north west'
	});

	moveTo = (pos) =>{
		this.x = pos.x;
		this.y = pos.y;
	}

	//map = Automata.map
	cycle = (map) =>{
		// console.log("cycle")
		let neighbors = this.neighbors(map); //Arr of neighboring cells
		let rand = Math.floor(Math.random()*neighbors.length); //Random index
		let toMove = neighbors[rand] //Neighbor
		if(this.alive){
			this.x = toMove.x;
			this.y = toMove.y;
			//Issue? row = y, col = x
			map[this.y][this.x] = GAME.FLOOR;
		}
		return map;
	}

	//returns neighbors of a cell
	neighbors = (map)=>{
		let neighbors = [this.north(), this.east(), this.south(), this.west()].filter(n=>this.checkNeighbor(n, map));
		let diagonals = [this.northEast(), this.southEast(), this.southWest(), this.northWest()].filter(n=>this.checkNeighbor(n, map));
		if(this.allowDiagonals) neighbors = [...neighbors, ...diagonals];
		if(neighbors.length === 0){
			this.alive = false;
		}
		return neighbors;
	}
	//Checks if there is a neighbor cell to move to on map
	//Given the position of cell, i.e. Cell.west()
	checkNeighbor = (pos, map) =>{
		// console.log("checkNeighbor", pos, map)
		let width = map[0].length; //20
		let height = map.length; //12

		if(pos.x < 0 || pos.y < 0) return false;
		if(pos.x > width || pos.y > height) return false;
		if(!map[pos.y] || !map[pos.y][pos.x] || map[pos.y][pos.x] === GAME.FLOOR){
			return false;
		} 
		return true;
	}
}
export default Cell;