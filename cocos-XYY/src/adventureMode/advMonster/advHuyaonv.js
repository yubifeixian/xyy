var AdvHuyaonvMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameHuyaonv;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 1;
		this.finalMark = 6;
		this.openEffectText = Text.huyaonvOpenEffectText;
		this.winEffectText = Text.huyaonvWinEffectText;
		this.loseEffectText = Text.huyaonvLoseEffectText;
		this.petEffectText = Text.huyaonvPetEffectText;
		this.nature = Text.natureHuo;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_huyaonv_png;
		this.level = Text.petLevelStrong;
	},
	realOpenEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView);
		var temp = nowPlayerTerm[nowPlayerNumber].combat;
		if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],Text.monsterOpenEffectInvalid.format(this.name))) {
				if (fight_Trigger[1].hp > 0) {
					if(!advSkillCharacters_XuanxiaoNingbingfenyan(fight_Trigger[1])){
						advUseYingu([fight_Trigger[1]], fight_Trigger[1], fight_Trigger[1], [temp-1], true, advBaseEffectReduceHPEffect,function(){
							advSkillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								callBack();
							})
						});
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
			textAreaAddMessage(Text.monsterOpenEffectInvalid.format(this.name), myText, listView,function(){
				callBack();
			});
		}
	},
	realWinEffect:function(callBack){
		if (fight_Monster.length > 0) {
			if (fight_Monster[0].hp > 0) {
				advUseYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [3], true, advBaseEffectReduceHPEffect,function(){
					// 唐雪见【追打】技能
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						if(callBack!=null){
							callBack();
						}
					})
				});
			}else if(callBack!=null){
				callBack();
			}
		}
	},
	realLoseEffect:function(callBack){
		var count = 0;
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
			if (player1.hp > 0) {
				count++;
				if(!advSkillCharacters_XuanxiaoNingbingfenyan(player1)){
					tempHeartList.push(player1);
					if(tantadeqiongdingMark==2){
						tempHeartNumberList.push(12);
					}else{
						tempHeartNumberList.push(3);
					}
				}
			}
			if (player2.hp > 0) {
				count++;
				if(!advSkillCharacters_XuanxiaoNingbingfenyan(player2)){
					tempHeartList.push(player2);
					if(tantadeqiongdingMark==2){
						tempHeartNumberList.push(12);
					}else{
						tempHeartNumberList.push(3);
					}
				}
			}
			if (count < 2) {
				if (player3.hp > 0) {
					count++;
					if(!advSkillCharacters_XuanxiaoNingbingfenyan(player3)){
						tempHeartList.push(player3);
						if(tantadeqiongdingMark==2){
							tempHeartNumberList.push(12);
						}else{
							tempHeartNumberList.push(3);
						}
					}
				}
				if(count<2){
					tempHeartList.push(boss);
					if(tantadeqiongdingMark==2){
						tempHeartNumberList.push(12);
					}else{
						tempHeartNumberList.push(3);
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