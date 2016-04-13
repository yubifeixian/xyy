var XingtianMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameXingtian;
		this.ID = 0;
		this.combat = 5;
		this.dodge = 3;
		this.finalMark = 5;
		this.openEffectText = "参战者以外的所有角色HP-n，n=持有该角色玩家的手牌数";
		this.winEffectText = "无";
		this.loseEffectText = "无";
		this.petEffectText = "主人命中+1";
		this.nature = "土";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_xingtian_png;
		this.level = "弱";
	},
	openEffect:function(callBack){
		textAreaAddMessage("刑天出场效果："+this.openEffectText, myText, listView);
		var tempHeartList=new Array();
		var tempHearNumbertList=new Array();
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i].hp>0&&!nowPlayerTerm[i].joinAttack){
				tempHeartList.push(nowPlayerTerm[i]);
				tempHearNumbertList.push(nowPlayerTerm[i].handCard.length);
			}
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHearNumbertList, true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				callBack();
			})
		});
	},
	winEffect:function(callBack){
		this._super();
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
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