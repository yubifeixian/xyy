var JinchanguimuMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameJinchanguimu;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 4;
		this.finalMark = 4;
		this.openEffectText = "金蟾鬼母本场战斗中战力额外+3";
		this.winEffectText = "敌方全体HP-1";
		this.loseEffectText = "我方HP-2";
		this.petEffectText = "任何战斗，允许选择金蟾鬼母进行支援，妨碍（战力4，命中4，HP不会增减）";
		this.nature = "土";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_jinchanguimu_png;
		this.level = "强";
	},
	openEffect:function(callBack){
		this.combat += 3;
		monsterCombat += 3;
		textAreaAddMessage("金蟾鬼母出场效果："+this.openEffectText, myText, listView,function(){
			callBack();
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
				tempHeartList.push(nowPlayerTerm[i]);
				tempHeartNumberList.push(1);
				mainScene.addChild(new MagicLayer(nowPlayerTerm[i].hadImageView,new MagicNodeTu()));
			}
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			})
		});
	},
	loseEffect:function(callBack){
		this._super();
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				tempHeartList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				tempHeartNumberList.push(2);
				mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].friendList[i].hadImageView,new MagicNodeTu()));
			}
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