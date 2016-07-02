function addDialog(containerLayer,dialogLayer){
	// cc.eventManager.pauseTarget(containerLayer, true);
	// dialogLayer.retain();
	/*
	 * containerLayer.runAction(cc.Sequence.create( cc.DelayTime.create(1),
	 * cc.CallFunc.create(function () { //执行下一个代码
	 * containerLayer.addChild(dialogLayer); })));
	 */ 
	// dialogLayer.retain();
	containerLayer.addChild(dialogLayer);
	/*
	 * containerLayer.scheduleOnce(function(){ },0.5);
	 */
}