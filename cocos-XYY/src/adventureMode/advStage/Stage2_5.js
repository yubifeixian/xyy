//-魔界 魔翳·湮世穹兵 
function getStage2_5Instance(){
	boss=new Player();
	bossCardManager(boss,11);
	var stage2_5=new StageModel(Text.stage2_5,null,boss,Text.placeMojie,0,5,Text.stage2_5Explain,null,[52,52,51,51,50]);
	stage2_5.stageSpecialAward=function(callBack){
		if(haveTiangangdouyi=="fasle"){
			textAreaAddMessage(Text.getTreasure.format(string_handCardNameTiangangdouyi), myText, listView);
			saveXianbaoCardToStorage("tiangangdouyi");
			haveTiangangdouyi="true";
			if(callBack!=null){
				callBack();
			}
		}else{
			textAreaAddMessage(Text.getTreasure.format(string_handCardNameShiziyaoshuo), myText, listView);
			saveXianbaoCardToStorage("shiziyaoshuo");
			haveShiziyaoshuo="true";
			if(callBack!=null){
				callBack();
			}
		}
	};
	stage2_5.stageSpecialRequirement=function(callBack){
		if(boss.monsterList.length>=8){
			stage2_5.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage2_5;
}