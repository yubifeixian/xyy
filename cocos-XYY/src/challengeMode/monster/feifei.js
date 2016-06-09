var FeifeiMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameFeifei;
		this.ID = 0;
		this.combat = 2;
		this.dodge = 5;
		this.finalMark = 2;
		this.openEffectText = "无";
		this.winEffectText = "妨害者HP-3";
		this.loseEffectText = "您的HP-3";
		this.petEffectText = "（爆发）任何打怪战中使用，本场战斗本方战力+3，战斗结束后放弃肥肥";
		this.nature = "火";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_feifei_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		if (fight_Monster.length > 0) {
			if (!isJinchanguimu(fight_Monster[0],this.name+"效果对金蟾鬼母无效")) {
				if (fight_Monster[0].hp > 0) {
					if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Monster[0])){
						mainScene.addChild(new MagicLayer(fight_Monster[0].hadImageView,new MagicNodeHuo(),function(){
							useYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [3], true, baseEffectReduceHPEffect,function(){
								// 唐雪见【追打】技能
								skillCharactersTangxuejianZhuida(function(){
									heartList=new Array();
									if(callBack!=null){
										callBack();
									}
								})
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
			textAreaAddMessage("无妨碍者，"+this.name+"胜利结算无效", myText, listView,callBack);
		}
	},
	loseEffect:function(callBack){
		this._super();
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView,new MagicNodeHuo(),function(){
				useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [3], true, baseEffectReduceHPEffect, function(){
					// 唐雪见【追打】效果
					skillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						if(callBack!=null){
							callBack();
						}
					});
				});
			}));
		}else if(callBack!=null){
			callBack();
		}
	}
})