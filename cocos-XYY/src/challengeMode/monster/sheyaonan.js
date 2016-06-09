var SheyaonanMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameSheyaonan;
		this.ID = 0;
		this.combat = 9;
		this.dodge = 2;
		this.finalMark = 9;
		this.openEffectText = "无";
		this.winEffectText = "妨碍者HP-4";
		this.loseEffectText = "您的HP-4";
		this.petEffectText = "无";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_sheyaonan_png;
		this.level = "强";
	},
	winEffect:function(callBack){
		this._super();
		if (fight_Monster.length > 0) {
			if(!isJinchanguimu(fight_Monster[0],"蛇妖男胜利结算对金蟾鬼母无效")){
				if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Monster[0])){
					mainScene.addChild(new MagicLayer(fight_Monster[0].hadImageView,new MagicNodeShui(),function(){
						useYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [4], true, baseEffectReduceHPEffect,function(){
							// 唐雪见【追打】
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
			}else if(callBack!=null){
				callBack();
			}
		} else {
			textAreaAddMessage("无妨碍者，蛇妖男胜利结算无效", myText, listView,callBack);
		}
	},
	loseEffect:function(callBack){
		this._super();
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView,new MagicNodeShui(),function(){
				useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [4], true, baseEffectReduceHPEffect,function(){
					// 唐雪见【追打】技能
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