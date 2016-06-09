var HuyaonvMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameHuyaonv;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 1;
		this.finalMark = 6;
		this.openEffectText = "支援者受到伤害，伤害=您的战力-1";
		this.winEffectText = "妨害者HP-3";
		this.loseEffectText = "由敌方指定两名角色HP-3";
		this.petEffectText = "主人战力+2";
		this.nature = "火";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_huyaonv_png;
		this.level = "强";
	},
	openEffect:function(callBack){
		textAreaAddMessage("狐妖女出场效果："+this.openEffectText, myText, listView);
		var temp = nowPlayerTerm[nowPlayerNumber].combat;
		if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],"金蟾鬼母支援，狐妖女出场效果无效")) {
				if (fight_Trigger[1].hp > 0) {
					if(!skillCharacters_XuanxiaoNingbingfenyan(fight_Trigger[1])){
						mainScene.addChild(new MagicLayer(fight_Trigger[1].hadImageView,new MagicNodeHuo,function(){
							useYingu([fight_Trigger[1]], fight_Trigger[1], fight_Trigger[1], [temp-1], true, baseEffectReduceHPEffect,function(){
								skillCharactersTangxuejianZhuida(function(){
									heartList=new Array();
									callBack();
								})
							});
						}));
					}else{
						callBack();
					}
				}else{
					callBack();
				}
			}else if(callBack!=null){
				callBack();
			}
		} else {
			textAreaAddMessage("无支援者，狐妖女出场效果无效", myText, listView,function(){
				callBack();
			});
		}
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
		var count = 0;
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		if (nowPlayerTerm[nowPlayerNumber]._name==player1._name
				|| nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
			if (player1.hp > 0) {
				count++;
				if(!skillCharacters_XuanxiaoNingbingfenyan(player1)){
					tempHeartList.push(player1);
					tempHeartNumberList.push(3);
				}
			}
			if (player2.hp > 0) {
				count++;
				if(!skillCharacters_XuanxiaoNingbingfenyan(player2)){
					tempHeartList.push(player2);
					tempHeartNumberList.push(3);
				}
			}
			if (count < 2) {
				var tempPlayer = player3;
				// 敌方选择自己一个角色Hp-3
				if (player3.hp < player4.hp) {
					tempPlayer = player4;
				}
				if(!skillCharacters_XuanxiaoNingbingfenyan(tempPlayer)){
					tempHeartList.push(tempPlayer);
					tempHeartNumberList.push(3);
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
		} else if (nowPlayerTerm[nowPlayerNumber]._name==player3._name
				|| nowPlayerTerm[nowPlayerNumber]._name==player4._name) {
			addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
					"请选择一名(共2名)角色HP-3", false, false,function(result1){
				if(!skillCharacters_XuanxiaoNingbingfenyan(result1)){
					tempHeartList.push(result1);
					tempHeartNumberList.push(3);
				}
				var player1Shown=true;
				var player2Shown=true;
				var player3Shown=true;
				var player4Shown=true;
				for(var i=0;i<tempHeartList.length;i++){
					player1Shown=tempHeartList[i]._name==player1._name?false:true;
					player2Shown=tempHeartList[i]._name==player2._name?false:true;
					player3Shown=tempHeartList[i]._name==player3._name?false:true;
					player4Shown=tempHeartList[i]._name==player4._name?false:true;
				}
				addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, player4Shown,
						"请选择一名(共2名)角色HP-3", false, false,function(result2){
					if(!skillCharacters_XuanxiaoNingbingfenyan(result2)){
						tempHeartList.push(result2);
						tempHeartNumberList.push(3);
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
				}));
			}));
		}
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