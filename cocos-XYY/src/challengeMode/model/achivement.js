var Achivement=cc.Class.extend({
	name:null,
	pic:null,
	message:null,
	progress:null,
	maxProgress:null,
	ctor:function(name,pic,message,maxProgress){
		this.name=name;
		this.pic=pic;
		this.maxProgress=maxProgress;
		this.message=message;
		this.progress=AchivementProgress.getCurrentAchivemengtProgress(this);
	}
})