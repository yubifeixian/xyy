var AdvRongyanshouwangMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameRongyanshouwang;
		this.ID = 0;
		this.combat = 10;
		this.dodge = 2;
		this.finalMark = 10;
		this.openEffectText = Text.rongyanshouwangOpenEffectText;
		this.winEffectText = Text.rongyanshouwangWinEffectText;
		this.loseEffectText = Text.rongyanshouwangLoseEffectText;
		this.petEffectText = Text.rongyanshouwangPetEffectText;
		this.nature = Text.natureHuo;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_rongyanshouwang_png;
		this.level = Text.petLevelBoss;
	},
	realOpenEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView);
		// 玄霄【凝冰焚炎】技能
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[i])){
				tempHeartList.push(nowPlayerTerm[i]);
				tempHeartNumberList.push(2);
			}
		}
		for(var i=0;i<tempHeartList.length;i++){
			mainScene.addChild(new AttackTargetLayer(monsterLabel,tempHeartList[i].hadImageView));
		}
		advUseYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true, advBaseEffectReduceHPEffect,function(){
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				callBack();
			});
		});
	},
	realWinEffect:function(callBack){
		advUseYingu([boss], boss, boss, [2], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	},
	realLoseEffect:function(callBack){
		var temp=this;
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			tempHeartList.push(nowPlayerTerm[nowPlayerNumber]);
			if(tantadeqiongdingMark==2){
				tempHeartNumberList.push(12);
			}else{
				tempHeartNumberList.push(2);
			}
		}
		if (fight_Trigger.length == 1) {
			textAreaAddMessage(Text.noSupporter, myText, listView);
		} else if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],Text.effectCanNotEffectedJinchanguimu.format(temp.name))) {
				if (fight_Trigger[1].hp > 0) {
					if(!advSkillCharacters_XuanxiaoNingbingfenyan(fight_Trigger[1])){
						tempHeartList.push(fight_Trigger[1]);
						if(tantadeqiongdingMark==2){
							tempHeartNumberList.push(12);
						}else{
							tempHeartNumberList.push(2);
						}
					}
				}
			}
		}
		advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, advBaseEffectReduceHPEffect, function(){
			// 唐雪见【追打】效果
			advSkillCharactersTangxuejianZhuida(function(){
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