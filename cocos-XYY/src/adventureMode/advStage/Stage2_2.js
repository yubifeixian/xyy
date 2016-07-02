//-苗疆 血手·毒影 
function getStage2_2Instance(){
	boss=new Player();
	bossCardManager(boss,8);
	var stage2_2=new StageModel(Text.stage2_2,Text.stage2_3,boss,Text.placeMiaojiang,35,2,Text.nil,[4,6,29,12],[51,51,49,47]);
	stage2_2.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 11);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 21);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.pushUnique(selectPlayer1._ID);
			saveNewCharacterIdToLocalStorage();
			callBack();
		}));
	};
	stage2_2.stageSpecialRequirement=function(callBack){
		var hasJiangyunfan=false;
		var hasXiaoman=false;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i]._name==nameXiaoman){
				hasXiaoman=true;
			}
			if(nowPlayerTerm[i]._name==nameJiangyunfan){
				hasJiangyunfan=true;
			}
		}
		if(hasJiangyunfan&&hasXiaoman){
			stage2_2.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage2_2;
}