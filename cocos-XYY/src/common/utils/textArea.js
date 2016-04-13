function textAreaAddMessage(message,myText,listView,callBack){
	if(callBack!=null){
		cc.eventManager.pauseTarget(mainScene, true);
	}
	var i=0;
	var myTextClone=myText.clone();
	//myTextClone.setString(message.handle(message,14));
	myTextClone.setString(message);
	myTextClone.ignoreContentAdaptWithSize(false);
	myTextClone.retain();
	//cc.log(message);
	//cc.log(message.length);
	var height=parseInt(message.length%14)==0?parseInt(message.length/14):parseInt(message.length/14)+1;
	//cc.log("height"+height);
	myTextClone.setTextAreaSize(cc.size(295,height*25));
	cc.log("TEXT: "+message);
	listView.insertCustomItem(myTextClone,0);
	listView.jumpToTop();
	//listView.pushBackCustomItem(myTextClone);
	//listView.jumpToBottom();
	if(callBack!=null){
		listView.runAction(cc.Sequence.create( cc.DelayTime.create(0.8), cc.CallFunc.create(function () {
			//执行下一个代码
			cc.eventManager.resumeTarget(mainScene, true);
			callBack();
		}))); 
	}
}