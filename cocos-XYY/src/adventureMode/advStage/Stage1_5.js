//-苗疆 拜月教主
function getStage1_5Instance(){
	boss=new Player();
	bossCardManager(boss,6);
	var stage1_5=new StageModel(Text.stage1_5,Text.stage2_1,boss,Text.placeMiaojiang,40,5,Text.stage2_1Explain,null,[51,51,47,49]);
	stage1_5.stageSpecialAward=function(callBack){
		textAreaAddMessage(Text.getTreasure.format(string_handCardNameTiangangdouyi), myText, listView);
		saveXianbaoCardToStorage("tiangangdouyi");
		haveTiangangdouyi="true";
		if(callBack!=null){
			callBack();
		}
	};
	stage1_5.stageSpecialRequirement=function(callBack){
		if(game_MonsterDeck.length==0&&playerScore>=45){
			stage1_5.stageClear(callBack);
		}else if(callBack!=null){
			callBack();
		}
	};
	return stage1_5;
}