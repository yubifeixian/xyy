//设置头像
bossPicLabel=null;

//设置技能
bossSkillButton=null;

//设置体力
bosshpText=null;

// 设置手牌
player1HandCardText=null;
bossHandCardText=null;

// 设置战力
bossCombatText=null;


//设置武器
bossArmText=null;

//设置防具
bossDefenseText=null;

//魔主信息
placeMessageLabel=null;	//场景牌名称
bossDongmingbaojingText=null;	//boss当前洞冥宝镜数量
bossBingxinjueText=null;	//boss当前冰心诀数量
bossYinguText=null;	//boss当前隐蛊数量
bossLingquanText=null; //boss当前灵泉数量
bossPetText=null; //boss当前获得的怪物数量



function initAdvGameView(root){
	mainScene=root;
	mainScene.retain();
	// 设置手牌
	player1HandCardText=null;
	player2HandCardText=null;
	player3HandCardText=null;
	bossHandCardText=null;
	player1PicLabel=ccui.helper.seekWidgetByName(mainScene, "player1Pic");
	player2PicLabel=ccui.helper.seekWidgetByName(mainScene, "player2Pic");
	player3PicLabel=ccui.helper.seekWidgetByName(mainScene, "player3Pic");
	bossPicLabel=ccui.helper.seekWidgetByName(mainScene, "bossPic");
	// 设置技能
	player1SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player1Skill1Button");
	player1SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player1Skill2Button");
	player1SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player1Skill3Button");

	player2SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player2Skill1Button");
	player2SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player2Skill2Button");
	player2SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player2Skill3Button");

	player3SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player3Skill1Button");
	player3SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player3Skill2Button");
	player3SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player3Skill3Button");

	bossSkillButton=ccui.helper.seekWidgetByName(mainScene, "bossSkill");

	// 设置体力
	player1hpText=ccui.helper.seekWidgetByName(mainScene, "player1hpText");
	player2hpText=ccui.helper.seekWidgetByName(mainScene, "player2hpText");
	player3hpText=ccui.helper.seekWidgetByName(mainScene, "player3hpText");
	bosshpText=ccui.helper.seekWidgetByName(mainScene, "bosshpText");

	// 设置手牌
	switch(nowGameModel){
	case ADVGAMESCENEMODEL.LEFT:
		player2HandCardText=ccui.helper.seekWidgetByName(mainScene, "player2HandCardText");
		player3HandCardText=ccui.helper.seekWidgetByName(mainScene, "player3HandCardText");
		break;
	case ADVGAMESCENEMODEL.CENTER:
		player1HandCardText=ccui.helper.seekWidgetByName(mainScene, "player1HandCardText");
		player3HandCardText=ccui.helper.seekWidgetByName(mainScene, "player3HandCardText");
		break;
	case ADVGAMESCENEMODEL.RIGHT:
		player1HandCardText=ccui.helper.seekWidgetByName(mainScene, "player1HandCardText");
		player2HandCardText=ccui.helper.seekWidgetByName(mainScene, "player2HandCardText");
		break;
	}
	bossHandCardText=ccui.helper.seekWidgetByName(mainScene, "bossHandCardText");

	// 设置战力
	player1CombatText=ccui.helper.seekWidgetByName(mainScene, "player1CombatText");
	player2CombatText=ccui.helper.seekWidgetByName(mainScene, "player2CombatText");
	player3CombatText=ccui.helper.seekWidgetByName(mainScene, "player3CombatText");
	bossCombatText=ccui.helper.seekWidgetByName(mainScene, "bossCombatText");

	// 设置命中
	player1ExtentText=ccui.helper.seekWidgetByName(mainScene, "player1ExtentText");
	player2ExtentText=ccui.helper.seekWidgetByName(mainScene, "player2ExtentText");
	player3ExtentText=ccui.helper.seekWidgetByName(mainScene, "player3ExtentText");

	// 设置武器
	player1ArmText=ccui.helper.seekWidgetByName(mainScene, "player1ArmText");
	player2ArmText=ccui.helper.seekWidgetByName(mainScene, "player2ArmText");
	player3ArmText=ccui.helper.seekWidgetByName(mainScene, "player3ArmText");
	bossArmText=ccui.helper.seekWidgetByName(mainScene, "bossArmText");

	// 设置防具
	player1DefenseText=ccui.helper.seekWidgetByName(mainScene, "player1DefenseText");
	player2DefenseText=ccui.helper.seekWidgetByName(mainScene, "player2DefenseText");
	player3DefenseText=ccui.helper.seekWidgetByName(mainScene, "player3DefenseText");
	bossDefenseText=ccui.helper.seekWidgetByName(mainScene, "bossDefenseText");

	// 设置宠物
	player1Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet1Text");
	player1Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet2Text");
	player1Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet3Text");
	player1Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet4Text");
	player1Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet5Text");

	player2Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet1Text");
	player2Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet2Text");
	player2Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet3Text");
	player2Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet4Text");
	player2Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet5Text");

	player3Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet1Text");
	player3Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet2Text");
	player3Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet3Text");
	player3Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet4Text");
	player3Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet5Text");

	//魔主信息
	placeMessageLabel=ccui.helper.seekWidgetByName(mainScene, "placeText");	//场景牌名称
	bossDongmingbaojingText=ccui.helper.seekWidgetByName(mainScene, "bossDongmingbaojingText");	//boss当前洞冥宝镜数量
	bossBingxinjueText=ccui.helper.seekWidgetByName(mainScene, "bossBingxingjueText");	//boss当前冰心诀数量
	bossYinguText=ccui.helper.seekWidgetByName(mainScene, "bossYinguText");	//boss当前隐蛊数量
	bossLingquanText=ccui.helper.seekWidgetByName(mainScene, "bossLingquanText"); //boss当前灵泉数量
	bossPetText=ccui.helper.seekWidgetByName(mainScene, "bossPetText"); //boss当前获得的怪物数量



	// 设置ListView
	listView=ccui.helper.seekWidgetByName(mainScene, "ListView");
	myText=ccui.helper.seekWidgetByName(mainScene, "myText");
	myText.setTextAreaSize(cc.size(300,30));
	myText.ignoreContentAdaptWithSize(true);
	myText.retain();
	listView.setBackGroundColor(cc.color(203, 193, 158, 255));
	listView.removeAllItems();
	listView.showsVerticalScrollIndicator=true;
	listView.setBackGroundImageScale9Enabled(true);
	// 设置Label
	handCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "handCardDeckNumber");
	monsterCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "monsterCardDeckNumber");
	dropCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "dropCardDeckNumber");
	combatVScombat=ccui.helper.seekWidgetByName(mainScene, "combatVScombat");
	monsterLabel=ccui.helper.seekWidgetByName(mainScene, "monsterLabel");
	monsterLabel.setVisible(false);
	cardAnimationLabel=ccui.helper.seekWidgetByName(mainScene, "cardEffectAnimation");
	cardAnimationLabel.setOpacity(0);

	// 设置Button
	back=ccui.helper.seekWidgetByName(mainScene, "back");
	order1Button=ccui.helper.seekWidgetByName(mainScene, "order1");
	order2Button=ccui.helper.seekWidgetByName(mainScene, "order2");

	// 设置手牌区域
	handCardEx=ccui.helper.seekWidgetByName(mainScene, "handCardExample");
	handCardExample=handCardEx.clone();
	handCardExample.retain();
	handCardZone=ccui.helper.seekWidgetByName(mainScene, "handCardZone");
	handCardZone.setItemModel(handCardExample);
	handCardZone.setBackGroundColor(cc.color(252, 251, 195, 255));
	handCardZone.removeAllItems();

	//设置操作区域
	operateZone=ccui.helper.seekWidgetByName(mainScene, "operateZone");
	chooseZone=ccui.helper.seekWidgetByName(mainScene, "chooseZone").clone();
	chooseZone.retain();
	
	
	triggerCombatBMFont=ccui.helper.seekWidgetByName(mainScene, "triggerCombatBMFont");
	monsterCombatBMFont=ccui.helper.seekWidgetByName(mainScene, "monsterCombatBMFont");
	
	player1DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player1DeathImageView");
	player2DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player2DeathImageView");
	player3DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player3DeathImageView");
	bossDeathImageView=ccui.helper.seekWidgetByName(mainScene, "bossDeathImageView");
}