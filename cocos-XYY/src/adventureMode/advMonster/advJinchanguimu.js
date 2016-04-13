var AdvJinchanguimuMonster=AdvBaseMonster.extend({
	ctor:function(){
		this.name = nameJinchanguimu;
		this.ID = 16;
		this.combat = 4;
		this.dodge = 4;
		this.finalMark = 4;
		this.openEffectText = Text.jinchanguimuOpenEffectText;
		this.winEffectText = Text.jinchanguimuWinEffectText;
		this.loseEffectText = Text.jinchanguimuLoseEffectText;
		this.petEffectText = Text.jinchanguimuPetEffectText;
		this.nature = Text.natureTu;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_jinchanguimu_png;
		this.level = Text.petLevelStrong;
	},
	realOpenEffect:function(callBack){
		this.combat += 3;
		monsterCombat += 3;
		textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView,function(){
			callBack();
		});
	},
	realWinEffect:function(callBack){
		advUseYingu([boss], boss, boss, [1], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			})
		});
	},
	realLoseEffect:function(callBack){
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				tempHeartList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				if(tantadeqiongdingMark==2){
					tempHeartNumberList.push(12);
				}else{
					tempHeartNumberList.push(2);
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
		jinchanguimu = new Player();
		jinchanguimu._name =nameJinchanguimu;
		jinchanguimu.hp = 0;
		jinchanguimu.combat = 4;
		jinchanguimu.maxCombat=jinchanguimu.combat;
		jinchanguimu.extent = 4;
		jinchanguimu.friendList.push(player);
		jinchanguimu.friendList.push(player.friendList[1]);
	}
})