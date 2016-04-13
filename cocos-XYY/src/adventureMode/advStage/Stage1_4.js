//-锁妖塔 镇狱明王
function getStage1_4Instance(){
	boss=new Player();
	bossCardManager(boss,5);
	var stage1_4=new StageModel(Text.stage1_4,Text.stage1_5,boss,Text.placeSuoyaota,35,4,Text.nil,[16,18,33,30],[50,50,46,48]);
	stage1_4.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 12);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 27);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.push(selectPlayer1);
			saveNewCharacterIdToLocalStorage(selectPlayer1);
			callBack();
		}));
	};
	stage1_4.stageSpecialRequirement=function(callBack){
		if(game_MonsterDeck.length==0&&playerScore>=45){
			stage1_4.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage1_4;
}