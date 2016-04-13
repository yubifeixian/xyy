var AdvXiejianxianMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameXiejianxian;
		this.ID = 0;
		this.combat = 11;
		this.dodge = 3;
		this.finalMark = 11;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.xiejianxianWinEffectText;
		this.loseEffectText = Text.xiejianxianLoseEffectText;
		this.petEffectText = Text.xiejianxianPetEffectText;
		this.nature = Text.natureLei;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_xiejianxian_png;
		this.level = Text.petLevelBoss;
	},
	realWinEffect:function(callBack){
		var addCardPlayerList = new Array();
		var addCardNumberList = new Array();
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
				var number =baseEffectCountequment(nowPlayerTerm[nowPlayerNumber].friendList[i]); 
				textAreaAddMessage(Text.addHandCard.format(nowPlayerTerm[nowPlayerNumber].friendList[i]._name,number), myText, listView);
				addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
				addCardNumberList.push(number);
			}
		}
		advAddHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
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
		advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
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
				&& advAttactIsMiss(fight_Trigger[1],fight_FirstMonster)) {
			triggerCombat -= fight_Trigger[1].combat;
		}
		if (fight_Monster.length > 0
				&&advAttactIsMiss(fight_Monster[0],
						fight_FirstMonster)) {
			monsterCombat -= fight_Monster[0].combat;
		}
		textAreaAddMessage(Text.xiejianxianPetEffectRelieve, myText, listView);
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0) {
				if (!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
					nowPlayerTerm[i].tempZhuangbeiSkillCombat=0;
					nowPlayerTerm[i].tempZhuangbeiSkillExtent=0;
					if (nowPlayerTerm[i].arms1!=Text.nil) {
						nowPlayerTerm[i].arms1 = nowPlayerTerm[i].xiejianxian_Arms1Name;
						nowPlayerTerm[i].arms1Combat = nowPlayerTerm[i].xiejianxian_Arms1Combat;
						nowPlayerTerm[i].arms1Extent = nowPlayerTerm[i].xiejianxian_Arms1Extent;
					}
					if (nowPlayerTerm[i].arms2!=Text.nil) {
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
				if (advAttactIsMiss(fight_Trigger[1],fight_FirstMonster)) {
					triggerCombat += fight_Trigger[1].combat;
				}
			}
			if (fight_Monster.length> 0) {
				if (advAttactIsMiss(fight_Monster[0],fight_FirstMonster)) {
					monsterCombat += fight_Monster[0].combat;
				}
			}
		}
	}
})