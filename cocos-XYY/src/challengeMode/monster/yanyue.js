var YanyueMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameYanyue;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 1;
		this.finalMark = 4;
		this.openEffectText = "无";
		this.winEffectText = "妨害者HP-2";
		this.loseEffectText = "您的HP-3";
		this.petEffectText = "主人战力+1";
		this.nature = "火";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_yanyue_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		if (fight_Monster.length > 0) {
			if (!isJinchanguimu(fight_Monster[0],"赝月效果对金蟾鬼母无效")) {
				if (fight_Monster[0].hp > 0) {
					if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Monster[0])){
						mainScene.addChild(new MagicLayer(fight_Monster[0].hadImageView,new MagicNodeHuo(),function(){
							useYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [2], true, baseEffectReduceHPEffect,function(){
								skillCharactersTangxuejianZhuida(function(){
									heartList=[];
									if(callBack!=null){
										callBack();
									}
								});
							});
						}));
					}else if(callBack!=null){
						callBack();
					}
				}else if(callBack!=null){
					callBack();
				}
			}else if(callBack!=null){
				callBack();
			}
		} else {
			textAreaAddMessage("无妨碍者，赝月胜利结算无效", myText, listView,callBack);
		}
	},
	loseEffect:function(callBack){
		this._super();
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView,new MagicNodeHuo(),function(){
				useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [3], true, baseEffectReduceHPEffect, function(){
					// 唐雪见【追打】效果
					skillCharactersTangxuejianZhuida(function(){
						heartList=[];
						if(callBack!=null){
							callBack();
						}
					});
				});
			}));
		}else if(callBack!=null){
			callBack();
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