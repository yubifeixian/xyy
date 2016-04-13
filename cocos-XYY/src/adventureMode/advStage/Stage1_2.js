//隐龙窟-蛇妖男
function getStage1_2Instance(){
	boss=new Player();
	bossCardManager(boss,2);
	//var stage1_2=new StageModel("1_2",null,boss,"隐龙窟",40,2,"无",[8,15,11,24],[49,50]);
	var stage1_2=new StageModel(Text.stage1_2,Text.stage1_3,boss,Text.placeYinlongku,40,2,Text.nil,[8,15,11,24],[49,50]);
	stage1_2.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 21);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 23);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.push(selectPlayer1);
			saveNewCharacterIdToLocalStorage(selectPlayer1);
			callBack();
		}));
	};
	stage1_2.stageSpecialRequirement=function(callBack){
		if(boss._name==bossNameHuyaonv&&boss.hp>0){
			stage1_2.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage1_2;
}