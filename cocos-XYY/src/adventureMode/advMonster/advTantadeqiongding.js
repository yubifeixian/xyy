var AdvTantadeqiongding=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameTantadeqiongding;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.tantadeqiongdingEffectText;//翻出效果
		this.winEffectText = Text.tantadeqiongdingEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.tantadeqiongding_png;
		this.level = Text.crisis;
	},
	openEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			textAreaAddMessage(Text.tantadeqiongdingEffectText, myText, listView);
			tantadeqiongdingMark=1;
			if(callBack!=null){
				callBack();
			}
		},callBack);
	},
	winEffect:function(callBack){
		textAreaAddMessage(Text.tantadeqiongdingEffect2Text, myText, listView,callBack);
	}
})