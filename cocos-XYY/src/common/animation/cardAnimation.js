function playCardAnimation(cardPicSrc,callBack){
	cc.eventManager.pauseTarget(mainScene, true);
	cardAnimationLabel.loadTexture(cardPicSrc);
	var action=cc.fadeIn(0.5);
	var reverse=action.reverse();
	var sequence=cc.sequence(action,cc.DelayTime.create(1),reverse,cc.callFunc(function(){
		cc.eventManager.resumeTarget(mainScene, true);
		callBack();
	}, this));
	cardAnimationLabel.runAction(sequence);
}