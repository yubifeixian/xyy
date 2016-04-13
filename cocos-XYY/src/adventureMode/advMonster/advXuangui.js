var AdvXuanguiMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameXuangui;
		this.ID = 0;
		this.combat = 5;
		this.dodge = 2;
		this.finalMark = 5;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.xuanguiWinEffectText;
		this.loseEffectText = Text.xuanguiLoseEffectText;
		this.petEffectText = Text.nil;
		this.nature = Text.natureTu;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_xuangui_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		tempHeartList.push(nowPlayerTerm[nowPlayerNumber]);
		if(tantadeqiongdingMark==2){
			tempHeartNumberList.push(12);
		}else{
			tempHeartNumberList.push(3);
		}
		if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],Text.monsterWinEffectInvalid.format(this.name))) {
				if (fight_Trigger[1].hp > 0) {
					tempHeartList.push(fight_Trigger[1]);
					if(tantadeqiongdingMark==2){
						tempHeartNumberList.push(12);
					}else{
						tempHeartNumberList.push(3);
					}
				}else if(callBack!=null){
					callBack();
				}
			}else if(callBack!=null){
				callBack();
			}
		}
		advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, advBaseEffectReduceHPEffect,function(){
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	},
	realLoseEffect:function(callBack){
		advUseYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [3], true, advBaseEffectReduceHPEffect, function(){});
		// 唐雪见【追打】效果
		advSkillCharactersTangxuejianZhuida(function(){
			heartList=new Array();
			if(callBack!=null){
				callBack();
			}						
		});
	}
})