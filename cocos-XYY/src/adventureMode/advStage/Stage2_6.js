//-魔界 拜月教主
function getStage2_6Instance(){
	boss=new Player();
	bossCardManager(boss,12);
	var stage2_6=new StageModel(Text.stage2_6,null,boss,Text.placeXiaoyaohuanjing,0,5,Text.stage2_6Explain,null,[52,52,51,51,50]);
	stage2_6.stageSpecialAward=function(callBack){
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
	stage2_6.stageSpecialRequirement=function(callBack){
		if(boss.monsterList.length>=8){
			stage2_6.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage2_6;
}