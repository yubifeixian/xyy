var QianbeibuzuiMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameQianbeibuzui;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 4;
		this.finalMark = 4;
		this.openEffectText = "您和一名妨碍者手牌对调";
		this.winEffectText = "无";
		this.loseEffectText = "您的角色横置";
		this.petEffectText = "主人战力+1";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_qianbeibuzui_png;
		this.level = "弱";
	},
	openEffect:function(callBack){
		if (fight_Monster.length > 0) {
			if (!isJinchanguimu(fight_Monster[0],"妨碍者为金蟾鬼母，千杯不醉出场效果无效")) {
				textAreaAddMessage("千杯不醉出场效果："+this.openEffectText, myText, listView);
				useAnyTimeSkill(function(){
					var temp=new Array();
					for(var i=0;i<nowPlayerTerm[nowPlayerNumber].handCard.length;i++){
						temp.push(nowPlayerTerm[nowPlayerNumber].handCard[i]);
						if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
							nowPlayerTerm[nowPlayerNumber].handCard[i].removeFromParent();
						}
					}
					nowPlayerTerm[nowPlayerNumber].handCard=new Array();
					for(var i=0;i<fight_Monster[0].handCard.length;i++){
						nowPlayerTerm[nowPlayerNumber].handCard.push(fight_Monster[0].handCard[i]);
						if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
							handCardZone.pushBackCustomItem(fight_Monster[0].handCard[i]);
						}
						if(fight_Monster[0]._name==player1._name){
							fight_Monster[0].handCard[i].removeFromParent();
						}
					}
					fight_Monster[0].handCard=new Array();
					for(var i=0;i<temp.length;i++){
						fight_Monster[0].handCard.push(temp[i]);
						if(fight_Monster[0]._name==player1._name){
							handCardZone.pushBackCustomItem(temp[i]);
						}
					}
					textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"与"+fight_Monster[0]._name+"手牌对调", myText, listView);
					callBack();
				});
			}else if(callBack!=null){
				callBack();
			}
		} else {
			textAreaAddMessage("无妨碍者，千杯不醉出场效果无效", myText, listView,function(){
				callBack();
			});
		}
	},
	winEffect:function(callBack){
		this._super();
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		if (nowPlayerTerm[nowPlayerNumber].takeOver) {
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"已经被横置，本次横置无效", myText, listView);
			if(callBack!=null){
				callBack();
			}
		} else {
			nowPlayerTerm[nowPlayerNumber].takeOver = true;
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"被横置", myText, listView);
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