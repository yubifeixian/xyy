var RongyanshouwangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameRongyanshouwang;
		this.ID = 0;
		this.combat = 10;
		this.dodge = 2;
		this.finalMark = 10;
		this.openEffectText = "全体角色HP-2";
		this.winEffectText = "敌方全体HP-2";
		this.loseEffectText = "您与支援者HP各-2";
		this.petEffectText = "主人战力+2";
		this.nature = "火";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_rongyanshouwang_png;
		this.level = "BOSS";
	},
	openEffect:function(callBack){
		textAreaAddMessage("熔岩兽王出场效果："+this.openEffectText, myText, listView);
		// 玄霄【凝冰焚炎】技能
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[i])){
				tempHeartList.push(nowPlayerTerm[i]);
				tempHeartNumberList.push(2);
			}
		}
		for(var i=0;i<tempHeartList.length;i++){
			var _targetPlayer=tempHeartList[i];
			mainScene.addChild(new FireParticleLayer(monsterLabel,_targetPlayer.hadImageView));
			mainScene.addChild(new MagicLayer(_targetPlayer.hadImageView,new MagicNodeHuo()));
		}
		useYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true, baseEffectReduceHPEffect,function(){
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				callBack();
			});
		});
	},
	winEffect:function(callBack){
		this._super();
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0
					&& !player1IsPlayer2Friend(nowPlayerTerm[i],
							nowPlayerTerm[nowPlayerNumber])) {
				if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[i])){
					tempHeartList.push(nowPlayerTerm[i]);
					tempHeartNumberList.push(2);
					mainScene.addChild(new MagicLayer(nowPlayerTerm[i].hadImageView,new MagicNodeHuo()));
				}
			}
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
			if (!isJinchanguimu(fight_Trigger[1],"熔岩兽王失败结算对金蟾鬼母无效")) {
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
	},
	petEffect:function(player){
		player.petsCombat += 2;
	},
	updatePetEffect:function(player){
		player.petsCombat -= 2;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
	}
})