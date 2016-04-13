var BaseMonster=cc.Class.extend({
	name:null,
	ID:null,
	combat : null,
	dodge : null,
	finalMark : null,
	openEffectText : null,
	winEffectText: null,
	loseEffectText : null,
	petEffectText : null,
	nature :null,
	lover1 : null,
	lover2 : null,
	lover3 :null,
	lover4 : null,
	monsterPicSrc :null,
	level :null,
	ctor:function(){
		
	},
	openEffect:function(callBack){
		textAreaAddMessage("无出场效果", myText, listView,callBack);
	},
	winEffect:function(callBack){
		monsterEffect = true;
		textAreaAddMessage("打怪胜利，触发"+this.name+"胜利结算", myText, listView);
		textAreaAddMessage(this.winEffectText, myText, listView);
	},
	loseEffect:function(callBack){
		textAreaAddMessage("打怪失败，触发"+this.name+"的失败结算:", myText, listView);
		textAreaAddMessage(this.loseEffectText, myText, listView);
	},
	petEffect:function(player){
		
	},
	updatePetEffect:function(player){
		
	},
	getInstance:function(){
		
	}
})