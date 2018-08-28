import Cell from './cell'
import GAME from '../gameVariables'
class Automata{
	constructor(width, height){
		this.width = Math.floor(width); //Width of grid
		this.height = Math.floor(height); //Height of grid
		this.lifeCycles = 0;
		this.cells = [];
		this.minimumLifeCycles = 40;
		this.resetMap();
	}
	/*
		Automata.map = 12*20 matrix of strnums for tiles
			0  		   ...        19

		0	['5', '5', '5', ... '5']
		.	['5', '5', '5', ... '5']
		.	['5', '5', '5', ... '5']
		.	['5', '5', '5', ... '5']
		12	['5', '5', '5', ... '5']
	*/
	resetMap = () =>{
		// console.log("Automota::resetMap()")
		this.map = [];
		for(let row = 0; row < this.height; row++){
			let tempRow = [];
			for(let col = 0; col < this.width; col ++){
				tempRow.push(GAME.WALL);
			}
			this.map.push(tempRow);
		}
	}

	generate = () =>{
		// console.log("Automata.generate", this);
		if(this.cells.length === 0) this.addCell();

		while(this.cells.length > 0){
			for(let i = 0; i < this.cells.length; i++){
				let currentCell = this.cells[i];
				if(currentCell.alive){
					this.lifeCycles +=1; 
					this.map = currentCell.cycle(this.map);

				} else{
					//Remove current cell from this.cells
					let index = this.cells.indexOf(currentCell);
					if(index > -1){
						this.cells.splice(index, 1);
					}
				}
			} //endfor
		}//endwhile

		if(this.lifeCycles < this.minimumLifeCycles){
			this.lifeCycles = 0;
			this.resetMap();
			this.generate();
		}
	}

	cleanup = () =>{
		// console.log("Automata::cleanup()");
		//col=xPos, row = yPos 
		for(let row = 0; row < this.height; row++){
			for(let col = 0; col < this.width; col++){
				let cell = new Cell(col, row);
				cell.allowDiagonals = true;
				if(cell.neighbors(this.map).length < 1){
					this.map[row][col] = GAME.FLOOR;
				}
			}
		}
	}

	//add cell to Automata
	addCell = (xPos, yPos) =>{
		let x = xPos || Math.floor(this.width/2);
		let y = yPos || Math.floor(this.height/2);
		let cell = new Cell(x, y);
		this.cells.push(cell);
	}

	//get Automata.map as csv string
	csvMap = () =>{
		let mapStr = '';
		//Row = y coordinate
		for(let row = 0; row < this.height; row++){
			//Col = x coordinate
			for(let col = 0; col < this.width; col++){
				mapStr += this.map[row][col];
				if(col < this.width - 1){
					mapStr += ',';
				}
			}
			mapStr += "\n"
		}
		return mapStr;
	}

}

export default Automata;