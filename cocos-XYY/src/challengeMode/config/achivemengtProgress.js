var AchivementProgress={
	getCurrentAchivemengtProgress:function(achivement){
		var progress=cc.sys.localStorage.getItem(achivement.name)||0;
		return progress;
	},
	setCurrentAchivemengtProgress:function(achivement,progress){
		cc.sys.localStorage.setItem(achivement.name,progress);
		achivement.progress=progress;
		return true;
	},
	addAchivementProgress:function(obj){
		if(obj instanceof Player){
			if(obj.playerAchievement.progress<obj.playerAchievement.maxProgress){
				this.setCurrentAchivemengtProgress(obj.playerAchievement, Number(obj.playerAchievement.progress)+1);
			}
		}else if(obj instanceof Achivement){
			if(obj.progress<obj.maxProgress){
				this.setCurrentAchivemengtProgress(obj, Number(obj.progress)+1);
			}
		}
	}
		
}