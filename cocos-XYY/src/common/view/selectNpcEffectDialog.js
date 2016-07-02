/**
 * 对话框返回值为NULL时则视为选择“翻取下一张”
 */
var NPCEFFECTMESSAGE={
		JIARU:0,
		ZHILIAO:1,
		XIULIAN:2,
		CHUANGONG:3,
		XIJI:4,
		ZHUZHAN:5,
		JIAOYI:6,
		XUNHUA:7,
		DAOQIE:8
}

var npcEffectMapping=function(effectName){
	var result=null;
	switch (effectName) {
	case "加入":
		result=NPCEFFECTMESSAGE.JIARU;
		break;
	case "交易":
		result=NPCEFFECTMESSAGE.JIAOYI;
		break;
	case "治疗":
		result=NPCEFFECTMESSAGE.ZHILIAO;
		break;
	case "修炼":
		result=NPCEFFECTMESSAGE.XIULIAN;
		break;
	case "传功":
		result=NPCEFFECTMESSAGE.CHUANGONG;
		break;
	case "袭击":
		result=NPCEFFECTMESSAGE.XIJI;
		break;
	case "助战":
		result=NPCEFFECTMESSAGE.ZHUZHAN;
		break;
	case "盗窃":
		result=NPCEFFECTMESSAGE.DAOQIE;
		break;
	case "驯化":
		result=NPCEFFECTMESSAGE.XUNHUA;
		break;
	}
	return result;
}

var selectNpcEffectDialogLayer=BaseDialogLayer.extend({
	message:null,
	npcMonster:null,
	npcEffect1:null,
	npcEffect2:null,
	effectButton1:null,
	effectButton2:null,
	effectButton3:null,
	callBack:null,
	result:null,
	ctor:function(message,npcMonster,callBack){
		this._super();
		this.message=message;
		this.npcMonster=npcMonster;
		this.callBack=callBack;
		this.npcEffect1=npcEffectMapping(npcMonster.winEffectText);
		this.npcEffect2=npcEffectMapping(npcMonster.loseEffectText);
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectNpcEffectDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		var npcImageView=ccui.helper.seekWidgetByName(dialog.node, "npcImageView");
		npcImageView.loadTexture(this.npcMonster.monsterPicSrc);
		this.effectButton1=ccui.helper.seekWidgetByName(dialog.node, "effectButton1");
		this.effectButton1.setTitleText(this.npcMonster.winEffectText);
		this.effectButton1.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=npcEffectMapping(temp.npcMonster.winEffectText);
				temp.sendResult();
			}
		}, this.effectButton1);
		
		this.effectButton2=ccui.helper.seekWidgetByName(dialog.node, "effectButton2");
		this.effectButton2.setTitleText(this.npcMonster.loseEffectText);
		if (this.npcMonster.loseEffectText=="加入") {
			var hasHandCardNumber = 0;
			for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
				if(nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length>0){
					hasHandCardNumber++;
				}
			}
			if (hasHandCardNumber == 0) {
				buttonManager(this.effectButton2, false, false);
			} else {
				for(var i=0;i<nowPlayerTerm.length;i++){
					if(nowPlayerTerm[i]._name==nameMoyi&&nowPlayerTerm[i].hp>0){
						for(var t=0;t<nowPlayerTerm[i].skillTempList.length;t++){
							if(nowPlayerTerm[i].skillTempList[t]._name==this.npcMonster.name){
								textAreaAddMessage("因魔翳“锁魂”效果，该NPC无法加入", myText, listView);
								buttonManager(this.effectButton2, false, false);
								break;
							}
						}
					}
					if((nowPlayerTerm[i]._name==nameMozun&&this.npcMonster.name==nameKonglin)
							||(nowPlayerTerm[i]._name==nameZhaolingerMengshe&&this.npcMonster.name==nameZhaolinger)){
						buttonManager(this.effectButton2, false, false);
						break;
					}
					cc.log("monsterName="+this.npcMonster.name);
					if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name==this.npcMonster.name){
						buttonManager(this.effectButton2, false, false);
						break;
					}
				}
			}
		}
		this.effectButton2.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=npcEffectMapping(temp.npcMonster.loseEffectText);
				//temp.result=2;
				temp.sendResult();
			}
		}, this.effectButton2);
		
		this.effectButton3=ccui.helper.seekWidgetByName(dialog.node, "effectButton3");
		this.effectButton3.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=null;
				temp.sendResult();
			}
		}, this.effectButton3);
		
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});