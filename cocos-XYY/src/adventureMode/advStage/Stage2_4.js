//-锁妖塔 姜世离 
function getStage2_4Instance(){
	boss=new Player();
	bossCardManager(boss,10);
	var stage2_4=new StageModel(Text.stage2_4,Text.stage2_5,boss,Text.placeSuoyaota,0,4,Text.stage2_4Explain,[18,22,7,19],[50,50,46,48]);
	stage2_4.stageSpecialAward=function(callBack){
		var characterList=[];
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1, 2);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2, 20);
		characterList.push(tempPlayer1);
		characterList.push(tempPlayer2);
		addDialog(mainScene, new ChooseCharacterDialog(characterList,Text.chooseAdditionalAwardCharacter, function(selectPlayer1){
			canUseCharacterList.push(selectPlayer1);
			saveNewCharacterIdToLocalStorage(selectPlayer1);
			callBack();
		}));
	};
	stage2_4.stageSpecialRequirement=function(callBack){
		var hasFeng=false;
		var hasLei=false;
		var hasShui=false;
		var hasHuo=false;
		var hasTu=false;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(!hasFeng&&nowPlayerTerm[i].pet_FengMonster!=null){
				hasFeng=true;
			}
			if(!hasLei&&nowPlayerTerm[i].pet_LeiMonster!=null){
				hasLei=true;
			}
			if(!hasShui&&nowPlayerTerm[i].pet_ShuiMonster!=null){
				hasShui=true;
			}
			if(!hasHuo&&nowPlayerTerm[i].pet_HuoMonster!=null){
				hasHuo=true;
			}
			if(!hasTu&&nowPlayerTerm[i].pet_TuMonster!=null){
				hasTu=true;
			}
		}
		var point=0;
		if(hasFeng){
			point++;
		}
		if(hasLei){
			point++;
		}
		if(hasShui){
			point++;
		}
		if(hasHuo){
			point++;
		}
		if(hasTu){
			point++;
		}
		
		if(boss.hp==0&&point>=4){
			stage2_4.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage2_4;
}