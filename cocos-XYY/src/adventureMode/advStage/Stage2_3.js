//-蜀山 蜀山七圣 
function getStage2_3Instance(){
	boss=new Player();
	bossCardManager(boss,9);
	var stage2_3=new StageModel(Text.stage2_3,Text.stage2_4,boss,Text.placeShushan,40,3,Text.nil,[5,17,13,33],[52,52,46,46]);
	stage2_3.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 1);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 14);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.pushUnique(selectPlayer1._ID);
			saveNewCharacterIdToLocalStorage();
			callBack();
		}));
	};
	stage2_3.stageSpecialRequirement=function(callBack){
		if(game_MonsterDeck.length==0&&playerScore>=50){
			stage2_3.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage2_3;
}