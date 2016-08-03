var HuoqilinMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameHuoqilin;
		this.ID = 0;
		this.combat = 5;
		this.dodge = 5;
		this.finalMark = 5;
		this.openEffectText = "如果触发方有火属性宠物，火麒麟实际灵力=基础灵力+当前火属性宠物的灵力";
		this.winEffectText = "妨碍者HP-2,如触发方没有火属性宠物,火麒麟直接进入弃牌,无法被捕捉.使用傀儡虫夺宠时亦如此";
		this.loseEffectText = "触发者、支援者HP-2";
		this.petEffectText = "我方灵力池+3";
		this.nature = "火";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_huoqilin_png;
		this.level = "强";
	},
	openEffect:function(callBack){
		var _petHuo=nowPlayerTerm[nowPlayerNumber].pet_HuoMonster;
		if(_petHuo==null){
			textAreaAddMessage("触发者无火属性宠物，火麒麟出场效果无效", myText, listView,callBack);
			return;
		}
		this.combat+=_petHuo.combat;
		textAreaAddMessage("触发者有火属性宠物，火麒麟实际战力="+this.combat, myText, listView);
		callBack();
	},
	winEffect:function(callBack){
		this._super();
		if (fight_Monster.length > 0) {
			if(!isJinchanguimu(fight_Monster[0],"火麒麟胜利结算对金蟾鬼母无效")){
				if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Monster[0])){
					mainScene.addChild(new MagicLayer(fight_Monster[0].hadImageView,new MagicNodeHuo(),function(){
						useYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [2], true, baseEffectReduceHPEffect,function(){
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
		}else{
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			tempHeartList.push(nowPlayerTerm[nowPlayerNumber]);
			tempHeartNumberList.push(2);
		}
		if (fight_Trigger.length == 1) {
			textAreaAddMessage("无支援者", myText, listView);
		} else if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],"火麒麟失败结算对金蟾鬼母无效")) {
				if (fight_Trigger[1].hp > 0) {
					if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Trigger[1])){
						tempHeartList.push(fight_Trigger[1]);
						tempHeartNumberList.push(2);
					}
				}
			}
		}
		for(var i=0;i<tempHeartList.length;i++){
			mainScene.addChild(new MagicLayer(tempHeartList[i].hadImageView,new MagicNodeHuo()));
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function(){
			// 唐雪见【追打】效果
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	}
})