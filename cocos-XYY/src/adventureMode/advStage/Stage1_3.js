//-京城 彩依
function getStage1_3Instance(){
	boss=new Player();
	bossCardManager(boss,4);
	var stage1_3=new StageModel(Text.stage1_3,Text.stage1_4,boss,Text.placeJingcheng,40,3,Text.nil,[22,5,29,28],[46,49]);
	stage1_3.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 14);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 20);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.pushUnique(selectPlayer1._ID);
			saveNewCharacterIdToLocalStorage();
			callBack();
		}));
	};
	stage1_3.stageSpecialRequirement=function(callBack){
		if(boss.hp==0&&playerScore>=20){
			stage1_3.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage1_3;
}