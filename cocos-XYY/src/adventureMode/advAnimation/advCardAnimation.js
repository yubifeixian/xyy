function playCardAnimation(cardPicSrc,callBack){
	cardAnimationLabel.loadTexture(cardPicSrc);
	cc.eventManager.pauseTarget(mainScene, true);
	var action=cc.fadeIn(0.5);
	var reverse=action.reverse();
	var sequence=cc.sequence(action,cc.DelayTime.create(0.5),reverse,cc.callFunc(function(){
		cc.eventManager.resumeTarget(mainScene, true);
		callBack();
	}, this));
	cardAnimationLabel.runAction(sequence);
}