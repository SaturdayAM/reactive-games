const loadMobileTouchControls = (playState) =>{
	let self = playState;
	console.log("loadMobileTouchControls.js -> self", self);

	let bmdSize = 80;
	self.arrowBmd = self.game.add.bitmapData(bmdSize, bmdSize);
	self.arrowBmd.ctx.clearRect(0, 0, bmdSize, bmdSize);


}

export default loadMobileTouchControls;