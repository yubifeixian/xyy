//-京城 黄山三怪 
function getStage2_1Instance(){
	boss=new Player();
	bossCardManager(boss,7);
	var stage2_1=new StageModel(Text.stage2_1,Text.stage2_2,boss,Text.placeJingcheng,35,0,Text.nil,[16,15,3,8],[46,49]);
	return stage2_1;
}