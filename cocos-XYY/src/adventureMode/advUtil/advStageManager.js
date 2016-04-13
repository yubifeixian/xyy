function stageManager(stageId){
	var targetStage=null;
	switch(stageId){
	case "1_1":
		targetStage=getStage1_1Instance();
		break;
	case "1_2":
		targetStage=getStage1_2Instance();
		break;
	case "1_3":
		targetStage=getStage1_3Instance();
		break;
	case "1_4":
		targetStage=getStage1_4Instance();
		break;
	case "1_5":
		targetStage=getStage1_5Instance();
		break;
	case "2_1":
		targetStage=getStage2_1Instance();
		break;
	case "2_2":
		targetStage=getStage2_2Instance();
	case "2_3":
		targetStage=getStage2_3Instance();
		break;
	case "2_4":
		targetStage=getStage2_4Instance();
		break;
	case "2_5":
		targetStage=getStage2_5Instance();
		break;
	}
	return targetStage;
}