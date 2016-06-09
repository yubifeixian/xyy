var GoumangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameGoumang;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 4;
		this.finalMark = 7;
		this.openEffectText = "无";
		this.winEffectText = "您与支援者HP各+2";
		this.loseEffectText = "我方全体从牌堆中交换全部手牌，之后各自HP-2";
		this.petEffectText = "（爆发）我方技牌阶段或任意战斗的战牌阶段，您可放弃句芒，之后我方全体从牌堆中交换全部手牌";
		this.nature = "风";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_jumang_png;
		this.level = "强";
	},
	winEffect:function(callBack){
		this._super();
		for (var i=0;i<fight_Trigger.length;i++) {
			if (fight_Trigger[i]._name==nameJinchanguimu) {
				textAreaAddMessage("句芒效果对金蟾鬼母无效", myText, listView);
			} else {
				if (fight_Trigger[i].hp > 0) {
					for (var j = 0; j < 2; j++){
						baseEffectAddHP(fight_Trigger[i]);
					}
					textAreaAddMessage(fight_Trigger[i]._name+"HP+2", myText, listView);
					has_Tianshezhang(fight_Trigger[i]);
				}
			}
		}
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		var tempCardNumber = 0;
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		var addCardPlayerList=new Array();
		var addCardNumberList=new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				tempHeartList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				tempHeartNumberList.push(2);
				tempCardNumber = nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length;
				for (var t = 0; t < nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length; t++) {
					remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].friendList[i].handCard[t].name);
				}
				if (nowPlayerTerm[nowPlayerNumber].friendList[i]._name==player1._name) {
					handCardZone.removeAllItems();
				}
				nowPlayerTerm[nowPlayerNumber].friendList[i].handCard=new Array();
				addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				addCardNumberList.push(tempCardNumber);
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber].friendList[i]._name+"从牌堆交换了手牌", myText, listView);
			}
		}
		addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,function(){
			for(var i=0;i<tempHeartList.length;i++){
				mainScene.addChild(new MagicLayer(tempHeartList[i].hadImageView,new MagicNodeFeng()));
			}
			useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if(callBack!=null){
						callBack();
					}
				});
			});
		});
	}
})