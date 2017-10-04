// 设置头像
player4DeathImageView=null;
player4PicLabel=null;
// 设置技能
player4SkillButton1=null;
player4SkillButton2=null;
player4SkillButton3=null;


// 设置体力
player4hpText=null;

// 设置手牌
player4HandCardText=null;

// 设置战力
player4CombatText=null;

// 设置命中
player4ExtentText=null;


// 设置武器
player4ArmText=null;


// 设置防具
player4DefenseText=null;

// 设置宠物
player4Pet1Text=null;
player4Pet2Text=null;
player4Pet3Text=null;
player4Pet4Text=null;
player4Pet5Text=null;

function initGameView(){
	mainScene = ccs.load(res.MainScene_json).node;
	player1PicLabel=ccui.helper.seekWidgetByName(mainScene, "player1Pic");
	player2PicLabel=ccui.helper.seekWidgetByName(mainScene, "player2Pic");
	player3PicLabel=ccui.helper.seekWidgetByName(mainScene, "player3Pic");
	player4PicLabel=ccui.helper.seekWidgetByName(mainScene, "player4Pic");
	// 设置技能
	player1SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player1Skill1Button");
	player1SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player1Skill2Button");
	player1SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player1Skill3Button");
	teamSkill1Button=ccui.helper.seekWidgetByName(mainScene, "teamSkill1Button");
	
	player2SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player2Skill1Button");
	player2SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player2Skill2Button");
	player2SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player2Skill3Button");
	
	player3SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player3Skill1Button");
	player3SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player3Skill2Button");
	player3SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player3Skill3Button");
	
	player4SkillButton1=ccui.helper.seekWidgetByName(mainScene, "player4Skill1Button");
	player4SkillButton2=ccui.helper.seekWidgetByName(mainScene, "player4Skill2Button");
	player4SkillButton3=ccui.helper.seekWidgetByName(mainScene, "player4Skill3Button");
	
	// 设置体力
	player1hpText=ccui.helper.seekWidgetByName(mainScene, "player1hpText");
	player1hpText.ignoreContentAdaptWithSize(true);
	player2hpText=ccui.helper.seekWidgetByName(mainScene, "player2hpText");
	player2hpText.ignoreContentAdaptWithSize(true);
	player3hpText=ccui.helper.seekWidgetByName(mainScene, "player3hpText");
	player3hpText.ignoreContentAdaptWithSize(true);
	player4hpText=ccui.helper.seekWidgetByName(mainScene, "player4hpText");
	player4hpText.ignoreContentAdaptWithSize(true);

	// 设置手牌
	player2HandCardText=ccui.helper.seekWidgetByName(mainScene, "player2HandCardText");
	player3HandCardText=ccui.helper.seekWidgetByName(mainScene, "player3HandCardText");
	player4HandCardText=ccui.helper.seekWidgetByName(mainScene, "player4HandCardText");

	// 设置战力
	player1CombatText=ccui.helper.seekWidgetByName(mainScene, "player1CombatText");
	player2CombatText=ccui.helper.seekWidgetByName(mainScene, "player2CombatText");
	player3CombatText=ccui.helper.seekWidgetByName(mainScene, "player3CombatText");
	player4CombatText=ccui.helper.seekWidgetByName(mainScene, "player4CombatText");

	// 设置命中
	player1ExtentText=ccui.helper.seekWidgetByName(mainScene, "player1ExtentText");
	player2ExtentText=ccui.helper.seekWidgetByName(mainScene, "player2ExtentText");
	player3ExtentText=ccui.helper.seekWidgetByName(mainScene, "player3ExtentText");
	player4ExtentText=ccui.helper.seekWidgetByName(mainScene, "player4ExtentText");
	
	// 设置武器
	player1ArmText=ccui.helper.seekWidgetByName(mainScene, "player1ArmText");
	player1ArmText.ignoreContentAdaptWithSize(true);
	player2ArmText=ccui.helper.seekWidgetByName(mainScene, "player2ArmText");
	player2ArmText.ignoreContentAdaptWithSize(true);
	player3ArmText=ccui.helper.seekWidgetByName(mainScene, "player3ArmText");
	player3ArmText.ignoreContentAdaptWithSize(true);
	player4ArmText=ccui.helper.seekWidgetByName(mainScene, "player4ArmText");
	player4ArmText.ignoreContentAdaptWithSize(true);
	
	// 设置防具
	player1DefenseText=ccui.helper.seekWidgetByName(mainScene, "player1DefenseText");
	player1DefenseText.ignoreContentAdaptWithSize(true);
	player2DefenseText=ccui.helper.seekWidgetByName(mainScene, "player2DefenseText");
	player2DefenseText.ignoreContentAdaptWithSize(true);
	player3DefenseText=ccui.helper.seekWidgetByName(mainScene, "player3DefenseText");
	player3DefenseText.ignoreContentAdaptWithSize(true);
	player4DefenseText=ccui.helper.seekWidgetByName(mainScene, "player4DefenseText");
	player4DefenseText.ignoreContentAdaptWithSize(true);
	
	// 设置宠物
	player1Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet1Text");
	player1Pet1Text.ignoreContentAdaptWithSize(true);
	player1Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet2Text");
	player1Pet2Text.ignoreContentAdaptWithSize(true);
	player1Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet3Text");
	player1Pet3Text.ignoreContentAdaptWithSize(true);
	player1Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet4Text");
	player1Pet4Text.ignoreContentAdaptWithSize(true);
	player1Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player1Pet5Text");
	player1Pet5Text.ignoreContentAdaptWithSize(true);

	player2Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet1Text");
	player2Pet1Text.ignoreContentAdaptWithSize(true);
	player2Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet2Text");
	player2Pet2Text.ignoreContentAdaptWithSize(true);
	player2Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet3Text");
	player2Pet3Text.ignoreContentAdaptWithSize(true);
	player2Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet4Text");
	player2Pet4Text.ignoreContentAdaptWithSize(true);
	player2Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player2Pet5Text");
	player2Pet5Text.ignoreContentAdaptWithSize(true);

	player3Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet1Text");
	player3Pet1Text.ignoreContentAdaptWithSize(true);
	player3Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet2Text");
	player3Pet2Text.ignoreContentAdaptWithSize(true);
	player3Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet3Text");
	player3Pet3Text.ignoreContentAdaptWithSize(true);
	player3Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet4Text");
	player3Pet4Text.ignoreContentAdaptWithSize(true);
	player3Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player3Pet5Text");
	player3Pet5Text.ignoreContentAdaptWithSize(true);

	player4Pet1Text=ccui.helper.seekWidgetByName(mainScene, "player4Pet1Text");
	player4Pet1Text.ignoreContentAdaptWithSize(true);
	player4Pet2Text=ccui.helper.seekWidgetByName(mainScene, "player4Pet2Text");
	player4Pet2Text.ignoreContentAdaptWithSize(true);
	player4Pet3Text=ccui.helper.seekWidgetByName(mainScene, "player4Pet3Text");
	player4Pet3Text.ignoreContentAdaptWithSize(true);
	player4Pet4Text=ccui.helper.seekWidgetByName(mainScene, "player4Pet4Text");
	player4Pet4Text.ignoreContentAdaptWithSize(true);
	player4Pet5Text=ccui.helper.seekWidgetByName(mainScene, "player4Pet5Text");
	player4Pet5Text.ignoreContentAdaptWithSize(true);
	
	// 设置ListView
	listView=ccui.helper.seekWidgetByName(mainScene, "ListView");
	myText=ccui.helper.seekWidgetByName(mainScene, "myText");
	//myText.setTextAreaSize(cc.size(300,30));
	myText.ignoreContentAdaptWithSize(true);
	myText.retain();
	listView.setBackGroundImageScale9Enabled(true);
	//listView.setBackGroundColor(cc.color(203, 193, 158, 255));
	listView.removeAllItems();
	listView.showsVerticalScrollIndicator=true;
	// 设置Label
	handCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "handCardDeckNumber");
	eventCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "eventCardDeckNumber");
	monsterCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "monsterCardDeckNumber");
	dropCardDeckNumber=ccui.helper.seekWidgetByName(mainScene, "dropCardDeckNumber");
	triggerCombatBMFont=ccui.helper.seekWidgetByName(mainScene, "triggerCombatBMFont");
	monsterCombatBMFont=ccui.helper.seekWidgetByName(mainScene, "monsterCombatBMFont");
	monsterLabel=ccui.helper.seekWidgetByName(mainScene, "monsterLabel");
	cardAnimationLabel=ccui.helper.seekWidgetByName(mainScene, "cardAnimationLabel");
	cardAnimationLabel.setOpacity(0);
	
	// 设置Button
	back=ccui.helper.seekWidgetByName(mainScene, "back");
	order1Button=ccui.helper.seekWidgetByName(mainScene, "order1");
	order2Button=ccui.helper.seekWidgetByName(mainScene, "order2");
	
	//设置操作区域
	operateZone=ccui.helper.seekWidgetByName(mainScene, "operateZone");
	chooseZone=ccui.helper.seekWidgetByName(mainScene, "chooseZone").clone();
	chooseZone.retain();
	
	// 设置手牌区域
	handCardEx=ccui.helper.seekWidgetByName(mainScene, "handCardExample");
	handCardExample=handCardEx.clone();
	handCardExample.retain();
	handCardZone=ccui.helper.seekWidgetByName(mainScene, "handCardZone");
	handCardZone.setItemModel(handCardExample);
	handCardZone.setBackGroundColor(cc.color(252, 251, 195, 255));
	handCardZone.removeAllItems();
	
	player1DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player1DeathImageView");
	player2DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player2DeathImageView");
	player3DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player3DeathImageView");
	player4DeathImageView=ccui.helper.seekWidgetByName(mainScene, "player4DeathImageView");
	
	turnMonsterCardLayer=null;
	
	if(player1.friendList[1].skillNameList.containsObject(skillnameZhangmenren)){
		teamSkill1Button.setVisible(true);
		teamSkill1Button.loadTextures(player1.friendList[1].skillButton1,
				player1.friendList[1].skillButton1,
				player1.friendList[1].skillButton1,ccui.Widget.LOCAL_TEXTURE);
	}
	
	mainScene.retain();
}

