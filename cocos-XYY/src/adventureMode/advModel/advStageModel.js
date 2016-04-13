var StageModel=cc.Class.extend({
	nowStageId:0,//当前关卡的id
	nextStageId:0,//下一个关卡的id
	stageBoss:null,
	stagePlace:null,
	stageWinScore:0,
	stageCanUseGrowUpCard:0,//本关可用成长牌的数量
	stageExplain:null,//关卡说明(boss技能)
	stageOverPlayerID:[],//过关可供选择加入的角色ID
	stageCrisisCards:[],//本关中的危机牌ID
	//stageSpecialRequirement:null,//挑战任务
	//stageSpecialAward:null,//过关特别奖励
	ctor:function(nowStageId,nextStageId,stageBoss,stagePlace,stageWinScore,stageCanUseGrowUpCard,stageExplain,stageOverPlayerID,stageCrisisCards){
		this.nowStageId=nowStage;
		this.nextStageId=nextStageId;
		this.stageBoss=stageBoss;
		this.stagePlace=stagePlace;
		this.stageWinScore=stageWinScore;
		this.stageCanUseGrowUpCard=stageCanUseGrowUpCard;
		this.stageExplain=stageExplain;
		this.stageOverPlayerID=stageOverPlayerID;
		this.stageCrisisCards=stageCrisisCards;
	},
	stageClear:function(callBack){
		if(this.stageOverPlayerID!=null){
			var characterList=[];
			for(var i=0;i<this.stageOverPlayerID.length;i++){
				var tempPlayer=new Player();
				characterCardManager(tempPlayer, this.stageOverPlayerID[i]);
				characterList.push(tempPlayer);
			}
			addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAwardCharacter.format(1), function(selectPlayer1){
				canUseCharacterList.push(selectPlayer1);
				saveNewCharacterIdToLocalStorage(selectPlayer1);
				characterList.removeObject(selectPlayer1);
				addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAwardCharacter.format(2), function(selectPlayer2){
					canUseCharacterList.push(selectPlayer2);
					saveNewCharacterIdToLocalStorage(selectPlayer2);
					characterList.removeObject(selectPlayer2);
					if(callBack!=null){
						callBack();
					}
				}));
			}));
		}else if(callBack!=null){
			callBack();
		}
		
	},
	stageSpecialRequirement:function(callBack){
		callBack();
	},
	stageSpecialAward:function(callBack){
		callBack();
	}
})