//水月宫-灵月宫主
function getStage1_1Instance(){
	boss=new Player();
	bossCardManager(boss,1);
	var stage1_1=new StageModel(Text.stage1_1,Text.stage1_2,boss,Text.placeShuiyuegong,35,0,Text.nil,[7,9,10,19],[46,47]);
	return stage1_1;
}