var AdvMuhoudeyinmou=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameMuhoudeyinmou;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.muhoudeyinmouEffectText;//翻出效果
		this.winEffectText = Text.muhoudeyinmouEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.muhoudeyinmou_png;
		this.level = Text.crisis;
	},
	openEffect:function(callBack){
		var temp=this;
		askHuanmeihuazhou(player1,function(){
			textAreaAddMessage(temp.openEffectText, myText, listView, function(){
				advAddHandCard([boss],boss,boss,null,[3],true,true,callBack);
			});
		},callBack);
	},
	winEffect:function(callBack){
		var temp=this;
		askHuanmeihuazhou(player1,function(){
			textAreaAddMessage(temp.winEffectText, myText, listView, function(){
				muhoudeyinmouMark=true;
				if(callBack!=null){
					callBack();
				}
			});
		},callBack);
	}
})