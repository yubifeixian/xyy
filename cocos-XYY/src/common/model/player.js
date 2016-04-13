function Player(){
	this._ID;
	this._name;
	this. npcName; // 该角色所对应的npc的名字
	this.hp;
	this.maxHP;
	this.combat;
	this.maxCombat;
	this.tempCombat = this.combat; // 用于保存该角色阵亡前的战力。在其阵亡之后可以减去
	this.petsCombat = 0;
	this.arms1Combat = 0;
	this.arms2Combat = 0;
	this.arms1Extent = 0;
	this.arms2Extent = 0;
	this.tempZhuangbeiSkillCombat=0;// 当邪剑仙存在时，林月如【林家剑法】对应的效果
	this.tempZhuangbeiSkillExtent=0;// 当邪剑仙存在时，酒剑仙【御剑术】对应的效果
	this.extent;
	this.maxExtent;
	this.petsExtent = 0;
	this.defenseCombat = 0;
	this.defenseExtent = 0;
	this.tempAddCombat = 0;
	this.skillAddCombat = 0;
	this.tempAddExtent = 0;
	this.skillAddExtent = 0;
	this.skill_1 = Text.nil;
	this.skill_2 = Text.nil;
	this.skill_3 = Text.nil;
	this.lover1 = Text.nil;
	this.lover2 = Text.nil;
	this.lover3 = Text.nil;
	this.lover4 = Text.nil;
	this.isDeath=false;
	this.pet_Feng = Text.petFeng
	this.pet_FengMonster = null;
	this.pet_Lei = Text.petLei;
	this.pet_LeiMonster = null;
	this.pet_Shui = Text.petShui;
	this.pet_ShuiMonster = null;
	this.pet_Huo = Text.petHuo;
	this.pet_HuoMonster = null;
	this.pet_Tu = Text.petTu;
	this.pet_TuMonster = null;
	this.sex; // 0为男,1为女
	this.loverEffect = false; // 倾慕效果是否发动过。
	this.arms1 = Text.nil;
	this.arms2 = Text.nil;
	this.defense = Text.nil;
	this.joinAttack = false; // 是否参战
	this.usedAttackCard = false; // 是否使用过战牌
	// 每个角色的技能列表（只保存有的技能）
	this.skillNameList = new Array();
	this.handCard = new Array();
	// 每个角色零时分配一个空集合，王蓬絮“饰品”集合
	this.skillTempList = new Array();
	// 记录收为助战效果的NPC
	this.npcHelp = new Array();
	this.xiejianxian_Arms1Name = "";
	this.xiejianxian_Arms1Combat = 0;
	this.xiejianxian_Arms1Extent = 0;
	this.xiejianxian_Arms2Name = "";
	this.xiejianxian_Arms2Combat = 0;
	this.xiejianxian_Arms2Extent = 0;
	this.playerHpText = null;
	this.playerArmText = null;
	this.playerDefenseText = null;
	this.playerCombatText = null;
	this.playerExtentText = null;
	this.playerPet1Text = null;
	this.playerPet2Text = null;
	this.playerPet3Text = null;
	this.playerPet4Text = null;
	this.playerPet5Text = null;
	this.hadImageView = null;
	this.deathImageView = null;
	this.skill1Effect = "";
	this.skill2Effect = "";
	this.skill3Effect = "";
	this.playerPicSrc = 0;
	this.playerDeathPicSrc = 0;
	this.skillButton1 = 0;
	this.skill1Button = 0;
	this.skillButton2 = 0;
	this.skill2Button = 0;
	this.skillButton3 = 0;
	this.skill3Button = 0;
	this.deathMusic = 0;
	this.takeOver; // 是否被翻面
	this.friendList = new Array(); // 队友列表
	this.everyRoundSkill_1 = false; // 每回合可用一次的技能1
	this.everyRoundSkill_2 = false; // 每回合可用一次的技能2
	this.everyRoundSkill_3 = false; // 每回合可用一次的技能3
	this.onlyOneSkill = false; // 限定技
	this.skillUrl=null;
	this.skillPng=null;
	this.animation=null;
	this.playerAchievement=null;
	this.mode=null;
	// SkillAnimModel skillAnimModel=new SkillAnimModel();
}