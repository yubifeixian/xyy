var AdvQianbeibuzuiMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameQianbeibuzui;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 4;
		this.finalMark = 4;
		this.openEffectText = Text.qianbeibuzuiOpenEffectText;
		this.winEffectText = Text.nil;
		this.loseEffectText = Text.qianbeibuzuiLoseEffectText;
		this.petEffectText = Text.qianbeibuzuiPetEffectText;
		this.nature = Text.natureShui;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_qianbeibuzui_png;
		this.level = Text.petLevelWeak;
	},
	realOpenEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView);
		useAnyTimeSkill(function(){
			var temp=new Array();
			for(var i=0;i<nowPlayerTerm[nowPlayerNumber].handCard.length;i++){
				temp.push(nowPlayerTerm[nowPlayerNumber].handCard[i]);
				if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
					nowPlayerTerm[nowPlayerNumber].handCard[i].removeFromParent();
				}
				// nowPlayerTerm[nowPlayerNumber].handCard.removeObject(nowPlayerTerm[nowPlayerNumber].handCard[i]);
			}
			nowPlayerTerm[nowPlayerNumber].handCard=new Array();
			for(var i=0;i<fight_Monster[0].handCard.length;i++){
				nowPlayerTerm[nowPlayerNumber].handCard.push(fight_Monster[0].handCard[i]);
				if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
					handCardZone.pushBackCustomItem(fight_Monster[0].handCard[i]);
				}
			}
			fight_Monster[0].handCard=new Array();
			for(var i=0;i<temp.length;i++){
				fight_Monster[0].handCard.push(temp[i]);
			}
			textAreaAddMessage(Text.player1ExchangeCardWithPlayer2.format(nowPlayerTerm[nowPlayerNumber]._name,fight_Monster[0]._name), myText, listView);
			callBack();
		});
	},
	realWinEffect:function(callBack){
		if(callBack!=null){
			callBack();
		}
	},
	realLoseEffect:function(callBack){
		if (nowPlayerTerm[nowPlayerNumber].takeOver) {
			textAreaAddMessage(Text.playerStatusTransverseInvaild.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
			if(callBack!=null){
				callBack();
			}
		} else {
			nowPlayerTerm[nowPlayerNumber].takeOver = true;
			textAreaAddMessage(Text.playerStatusTransverse.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
			if(callBack!=null){
				callBack();
			}
		}
	},
	petEffect:function(player){
		player.petsCombat++;
	},
	updatePetEffect:function(player){
		player.petsCombat--;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
	}
})