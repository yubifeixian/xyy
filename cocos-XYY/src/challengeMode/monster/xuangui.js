var XuanguiMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameXuangui;
		this.ID = 0;
		this.combat = 5;
		this.dodge = 2;
		this.finalMark = 5;
		this.openEffectText = "无";
		this.winEffectText = "您与支援者HP各-3";
		this.loseEffectText = "妨碍者HP-3";
		this.petEffectText = "无";
		this.nature = "土";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_xuangui_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		var tempHeartList=[nowPlayerTerm[nowPlayerNumber]];
		var tempHeartNumberList=[3];
		if (fight_Trigger.length > 1) {
			if (!isJinchanguimu(fight_Trigger[1],"璇龟效果对金蟾鬼母无效")) {
				if (fight_Trigger[1].hp > 0) {
					tempHeartList.push(fight_Trigger[1]);
					tempHeartNumberList.push(3);
				}else if(callBack!=null){
					callBack();
				}
			}else if(callBack!=null){
				callBack();
			}
		}
		for(var i=0;i<tempHeartList.length;i++){
			mainScene.addChild(new MagicLayer(tempHeartList[i].hadImageView,new MagicNodeTu()));
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect,function(){
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
		if (fight_Monster.length == 0){
			textAreaAddMessage("无妨碍者，璇龟失败结算无效", myText, listView,callBack);
		}else{
			if (!isJinchanguimu(fight_Monster[0],"璇龟失败结算对金蟾鬼母无效")) {
				if (fight_Monster[0].hp > 0) {
					mainScene.addChild(new MagicLayer(fight_Monster[0].hadImageView,new MagicNodeTu(),function(){
						useYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [3], true, baseEffectReduceHPEffect, function(){});
						// 唐雪见【追打】效果
						skillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							if(callBack!=null){
								callBack();
							}						
						});
					}));
				}else if(callBack!=null){
					callBack();
				}
			}else if(callBack!=null){
				callBack();
			}
		}
	}
})