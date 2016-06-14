Array.prototype.pushUnique=function(obj){
	if(this.containsObject(obj)){
		return;
	}
	this.push(obj);
}

Array.prototype.remove=function(index){
	for(var i=0;i<this.length;i++){
		if(i==index){
			this.splice(i, 1);
			break;
		}
	}
}
Array.prototype.removeObject=function(obj){
	for(var i=0;i<this.length;i++){
		if(this[i]==obj){
			this.splice(i, 1);
			break;
		}
	}
}

Array.prototype.containsObject=function(obj){
	var haveObj=false;
	for(var i=0;i<this.length;i++){
		if(this[i]==obj){
			haveObj=true;
			break;
		}
	}
	return haveObj;
}


