const handleWindowArrows = (e) =>{
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}

export default handleWindowArrows;