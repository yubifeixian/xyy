var XiejianxianMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameXiejianxian;
		this.ID = 0;
		this.combat = 11;
		this.dodge = 3;
		this.finalMark = 11;
		this.openEffectText = "无";
		this.winEffectText = "我方全体玩家各补n张牌，n=补牌者当前的装备数";
		this.loseEffectText = "我方全体HP-2";
		this.petEffectText = "敌方全体的武器类装备扣置，能力、数值无效";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_xiejianxian_png;
		this.level = "BOSS";
	},
	winEffect:function(callBack){
		this._super();
		var addCardPlayerList = new Array();
		var addCardNumberList = new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				var number =baseEffectCountequment(nowPlayerTerm[nowPlayerNumber].friendList[i]); 
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber].friendList[i]._name+"补牌"+number+"张", myText, listView);
				addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				addCardNumberList.push(number);
			}
		}
		addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
	},
	loseEffect:function(callBack){
		this._super();
		var tempHeartList=[];
		var tempHeartNumberList=[];
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				tempHeartList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				tempHeartNumberList.push(2);
				mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].friendList[i].hadImageView,new MagicNodeLei()));
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
	petEffect:function(player){
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0) {
				if (!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
					skillXiejianxianXiejianxianPetEffect(nowPlayerTerm[i]);
				}
			}
		}
	},
	updatePetEffect:function(player){
		if (fight_Trigger.length > 0) {
			triggerCombat -= (fight_Trigger[0].arms1Combat
					+ fight_Trigger[0].arms2Combat + fight_Trigger[0].tempZhuangbeiSkillCombat);
		}
		if (fight_Trigger.length > 1
				&& attactIsMiss(fight_Trigger[1],fight_FirstMonster)) {
			triggerCombat -= fight_Trigger[1].combat;
		}
		if (fight_Monster.length > 0
				&&attactIsMiss(fight_Monster[0],
						fight_FirstMonster)) {
			monsterCombat -= fight_Monster[0].combat;
		}
		textAreaAddMessage("邪剑仙效果解除，敌方所有武器类装备恢复", myText, listView);
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0) {
				if (!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
					if (nowPlayerTerm[i].arms1!="无") {
						nowPlayerTerm[i].arms1 = nowPlayerTerm[i].xiejianxian_Arms1Name;
						nowPlayerTerm[i].arms1Combat = nowPlayerTerm[i].xiejianxian_Arms1Combat+nowPlayerTerm[i].tempZhuangbeiSkillCombat;
						nowPlayerTerm[i].arms1Extent = nowPlayerTerm[i].xiejianxian_Arms1Extent+nowPlayerTerm[i].tempZhuangbeiSkillExtent;
					}
					nowPlayerTerm[i].tempZhuangbeiSkillCombat=0;
					nowPlayerTerm[i].tempZhuangbeiSkillExtent=0;
					if (nowPlayerTerm[i].arms2!="无") {
						nowPlayerTerm[i].arms2 = nowPlayerTerm[i].xiejianxian_Arms2Name;
						nowPlayerTerm[i].arms2Combat = nowPlayerTerm[i].xiejianxian_Arms2Combat;
						nowPlayerTerm[i].arms2Combat = nowPlayerTerm[i].xiejianxian_Arms2Extent;
					}
				}
			}
		}
		if (fight_Trigger.length > 0) {
			triggerCombat += (fight_Trigger[0].arms1Combat
					+ fight_Trigger[0].arms2Combat + fight_Trigger[0].tempZhuangbeiSkillCombat);
			if (fight_Trigger.length > 1) {
				if (attactIsMiss(fight_Trigger[1],fight_FirstMonster)) {
					triggerCombat += fight_Trigger[1].combat;
				}
			}
			if (fight_Monster.length> 0) {
				if (attactIsMiss(fight_Monster[0],fight_FirstMonster)) {
					monsterCombat += fight_Monster[0].combat;
				}
			}
		}
	}
})