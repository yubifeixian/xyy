var AdvXingtianMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameXingtian;
		this.ID = 0;
		this.combat = 5;
		this.dodge = 3;
		this.finalMark = 5;
		this.openEffectText = Text.xingtianOpenEffectText;
		this.winEffectText = Text.nil;
		this.loseEffectText = Text.nil;
		this.petEffectText = Text.xingtianPetEffectText;
		this.nature = Text.natureTu;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_xingtian_png;
		this.level = Text.petLevelWeak;
	},
	realOpenEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView);
		var tempHeartList=new Array();
		var tempHearNumbertList=new Array();
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i].hp>0&&!nowPlayerTerm[i].joinAttack){
				tempHeartList.push(nowPlayerTerm[i]);
				tempHearNumbertList.push(nowPlayerTerm[i].handCard.length);
			}
		}
		advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHearNumbertList, true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				callBack();
			})
		});
	},
	realWinEffect:function(callBack){
		if(callBack!=null){
			callBack();
		}
	},
	realLoseEffect:function(callBack){
		if(callBack!=null){
			callBack();
		}
	},
	petEffect:function(player){
		player.petsExtent++;
	},
	updatePetEffect:function(player){
		player.petsExtent--;
		if (player.petsExtent < 0)
			player.petsExtent = 0;
	}
})