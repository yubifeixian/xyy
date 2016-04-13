var AdvGoumangMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameGoumang;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 4;
		this.finalMark = 7;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.goumangWinEffectText;
		this.loseEffectText = Text.goumangLoseEffectText;
		this.petEffectText = Text.goumangPetEffectText;
		this.nature = Text.natureFeng;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_jumang_png;
		this.level = Text.petLevelStrong;
	},
	realWinEffect:function(callBack){
		for (var i=0;i<fight_Trigger.length;i++) {
			if (fight_Trigger[i]._name==nameJinchanguimu) {
				textAreaAddMessage(Text.effectCanNotEffectedJinchanguimu.format(this.name), myText, listView);
			} else {
				if (fight_Trigger[i].hp > 0) {
					for (var j = 0; j < 2; j++){
						baseEffectAddHP(fight_Trigger[i]);
					}
					textAreaAddMessage(Text.addHp.format(fight_Trigger[i]._name,2), myText, listView);
					has_Tianshezhang(fight_Trigger[i]);
				}
			}
		}
		if(callBack!=null){
			callBack();
		}
	},
	realLoseEffect:function(callBack){
		var tempCardNumber = 0;
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		var addCardPlayerList=new Array();
		var addCardNumberList=new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				tempHeartList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				if(tantadeqiongdingMark==2){
					tempHeartNumberList.push(12);
				}else{
					tempHeartNumberList.push(2);
				}
				tempCardNumber = nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length;
				for (var t = 0; t < nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length; t++) {
					remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].friendList[i].handCard[t].name);
				}
				if (nowPlayerTerm[nowPlayerNumber].friendList[i]._name==myControlPlayer._name) {
					handCardZone.removeAllItems();
				}
				nowPlayerTerm[nowPlayerNumber].friendList[i].handCard=new Array();
				addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				addCardNumberList.push(tempCardNumber);
				textAreaAddMessage(Text.changeCardFromDeck.format(nowPlayerTerm[nowPlayerNumber].friendList[i]._name), myText, listView);
			}
		}
		advAddHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,function(){
			advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, advBaseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				advSkillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if(callBack!=null){
						callBack();
					}
				});
			});
		});
	}
})