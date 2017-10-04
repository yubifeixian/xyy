mainScene=null;
//表示回合行动的光圈
actionMark=null;
// 设置头像
player1DeathImageView=null;
player2DeathImageView=null;
player3DeathImageView=null;
player4DeathImageView=null;
player1PicLabel=null;
player2PicLabel=null;
player3PicLabel=null;

// 设置技能
player1SkillButton1=null;
player1SkillButton2=null;
player1SkillButton3=null;
//玩家的队友的技能按钮
teamSkill1Button=null;

player2SkillButton1=null;
player2SkillButton2=null;
player2SkillButton3=null;

player3SkillButton1=null;
player3SkillButton2=null;
player3SkillButton3=null;

// 设置体力
player1hpText=null;
player2hpText=null;
player3hpText=null;

// 设置手牌
player2HandCardText=null;
player3HandCardText=null;

// 设置战力
player1CombatText=null;
player2CombatText=null;
player3CombatText=null;


// 设置命中
player1ExtentText=null;
player2ExtentText=null;
player3ExtentText=null;

// 设置武器
player1ArmText=null;
player2ArmText=null;
player3ArmText=null;

// 设置防具
player1DefenseText=null;
player2DefenseText=null;
player3DefenseText=null;

// 设置宠物
player1Pet1Text=null;
player1Pet2Text=null;
player1Pet3Text=null;
player1Pet4Text=null;
player1Pet5Text=null;

player2Pet1Text=null;
player2Pet2Text=null;
player2Pet3Text=null;
player2Pet4Text=null;
player2Pet5Text=null;

player3Pet1Text=null;
player3Pet2Text=null;
player3Pet3Text=null;
player3Pet4Text=null;
player3Pet5Text=null;

// 设置ListView
listView=null;
myText=null;

// 设置Label
handCardDeckNumber=null;
eventCardDeckNumber=null;
monsterCardDeckNumber=null;
dropCardDeckNumber=null;
triggerCombatBMFont=null;
monsterCombatBMFont=null;
monsterLabel=null;
cardAnimationLabel=null;

// 设置Button
order1Button=null;
back=null;
order2Button=null;

// 设置手牌区域
handCardEx=null;
handCardZone=null;


function releaseGameView(){
	mainScene.release();
	mainScene = null;

	// 设置头像
	player1DeathImageView=null;
	player2DeathImageView=null;
	player3DeathImageView=null;
	player4DeathImageView=null;
	player1PicLabel=null;
	player2PicLabel=null;
	player3PicLabel=null;
	player4PicLabel=null;
	// 设置技能
	player1SkillButton1=null;
	player1SkillButton2=null;
	player1SkillButton3=null;

	player2SkillButton1=null;
	player2SkillButton2=null;
	player2SkillButton3=null;

	player3SkillButton1=null;
	player3SkillButton2=null;
	player3SkillButton3=null;

	player4SkillButton1=null;
	player4SkillButton2=null;
	player4SkillButton3=null;


	// 设置体力
	player1hpText=null;
	player2hpText=null;
	player3hpText=null;
	player4hpText=null;

	// 设置手牌
	player2HandCardText=null;
	player3HandCardText=null;
	player4HandCardText=null;

	// 设置战力
	player1CombatText=null;
	player2CombatText=null;
	player3CombatText=null;
	player4CombatText=null;

	// 设置命中
	player1ExtentText=null;
	player2ExtentText=null;
	player3ExtentText=null;
	player4ExtentText=null;


	// 设置武器
	player1ArmText=null;
	player2ArmText=null;
	player3ArmText=null;
	player4ArmText=null;


	// 设置防具
	player1DefenseText=null;
	player2DefenseText=null;
	player3DefenseText=null;
	player4DefenseText=null;

	// 设置宠物
	player1Pet1Text=null;
	player1Pet2Text=null;
	player1Pet3Text=null;
	player1Pet4Text=null;
	player1Pet5Text=null;

	player2Pet1Text=null;
	player2Pet2Text=null;
	player2Pet3Text=null;
	player2Pet4Text=null;
	player2Pet5Text=null;

	player3Pet1Text=null;
	player3Pet2Text=null;
	player3Pet3Text=null;
	player3Pet4Text=null;;
	player3Pet5Text=null;

	player4Pet1Text=null;
	player4Pet2Text=null;
	player4Pet3Text=null;
	player4Pet4Text=null;
	player4Pet5Text=null;

	// 设置ListView
	listView=null;
	myText=null;

	// 设置Label
	handCardDeckNumber=null;
	eventCardDeckNumber=null;
	monsterCardDeckNumber=null;
	dropCardDeckNumber=null;
	combatVScombat=null;
	monsterLabel=null;
	// 设置Button
	order1Button=null;
	back=null;
	order2Button=null;
	// 设置手牌区域
	handCardEx=null;
	handCardZone=null;
	
	//正常流程操作区域
	operateZone=null;
	//选择操作区域
	chooseZone=null;
}












