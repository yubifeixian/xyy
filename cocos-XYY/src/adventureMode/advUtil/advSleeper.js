function sleep(callBack,time){
	if(time==null){
		time=0.5
	}
	mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(time), cc.CallFunc.create(function () {
		callBack();
	}))); 
}