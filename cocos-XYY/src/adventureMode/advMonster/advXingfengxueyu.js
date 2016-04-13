var AdvXingfengxueyu=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameXingfengxueyu;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.xingfengxueyuEffectText;//翻出效果
		this.winEffectText = Text.xingfengxueyuEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.xingfengxueyu_png;
		this.level = Text.crisis;
	},
	openEffect:function(callBack){
		textAreaAddMessage(this.openEffectText, myText, listView);
		askHuanmeihuazhou(player1,function(){
			advUseYingu([player1,player2,player3],player1,player1,[2,2,2],true,advBaseEffectReduceHPEffect,function(){
				advSkillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if(callBack!=null){
						callBack();
					}
				});
			});
		},callBack);
	},
	winEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			var tempHeartPlayerList=[];
			var tempHeartNumberList=[];
			for(var i=0;i<fight_Trigger.length;i++){
				tempHeartPlayerList.push(fight_Trigger[i]);
				tempHeartNumberList.push(4);
			}
			advUseYingu(tempHeartPlayerList,tempHeartPlayerList[0],tempHeartPlayerList[0],tempHeartNumberList,true,advBaseEffectReduceHPEffect,function(){
				advSkillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if(callBack!=null){
						callBack();
					}
				});
			});
		},callBack);
	}
})