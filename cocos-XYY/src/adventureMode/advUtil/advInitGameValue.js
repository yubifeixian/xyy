var game_MonsterDropDeck=null; // 怪物牌弃牌堆（用于发动【秀口锦心咒】等效果）
var myControlPlayer=null;	//玩家控制的角色
var otherControlPlayer1=null;//其他玩家控制的角色1
var otherControlPlayer2=null;//其他玩家控制的角色2
var moyiYanshiqiongbingAddCombatMark=false;//标识魔主“魔翳·湮世穹兵”战力是否已经变成10
var nowGameModel=0;
var boss=null;
var bossUseDongmingbaojing=false;	//魔主使用洞冥宝镜
var player1=new Player();
var player2=new Player();
var player3=new Player();
var guanyinmizhenList=new Array();//保存被“观音迷阵”效果影响的角色
var muhoudeyinmouMark=false;//危机牌【幕后的阴谋】是否发挥效果
var huayaoshuiMark=false;//危机牌【化妖水】是否发挥效果
var jushentiantuMark=false;//危机牌【巨神天屠】是否发挥效果
var playerScore=0;
var bossScore=0;

//用之标志是否已经翻出危机牌【坍塌的穹顶】
//0:未翻开 
//1：已翻开且等待下次执行效果，询问混战时需要检测此数值，若为1则强制混战且执行本危机牌效果，将本数值置为2
//2:已翻开且本回合就要执行效果：处理战斗结算时需要检测此数值，若为2则我方本次受到的伤害数值均为12，打怪结束时若本数值为2则需改为0
var tantadeqiongdingMark=0;

function initAdvPlayer(){
	switch(nowGameModel){
	case ADVGAMESCENEMODEL.LEFT:
		myControlPlayer=player1;
		otherControlPlayer1=player2;
		otherControlPlayer2=player3;
		break;
	case ADVGAMESCENEMODEL.CENTER:
		otherControlPlayer1=player1;
		otherControlPlayer2=player3;
		myControlPlayer=player2;
		break;
	case ADVGAMESCENEMODEL.RIGHT:
		otherControlPlayer1=player1;
		otherControlPlayer2=player2;
		myControlPlayer=player3;
		break;
	}
	nowPlayerTerm=new Array();
	player1.friendList.push(player1,player2,player3);
	player2.friendList.push(player2,player3,player1);
	player3.friendList.push(player3,player1,player2);
	nowPlayerTerm.push(player1);
	nowPlayerTerm.push(player2);
	nowPlayerTerm.push(player3);
	nowPlayerTerm.push(boss);
}

function initAdvGameValue(){
	triggerCombat=0;
	monsterCombat=0;
	skillButton_DropCardEffect=false;
	skillEffectDropCard=false;
	yuntianhe_HouYiSheRiGong=0;
	chonglou_JueDou=0;
	NPCEffect=false;
	skill1Useing=false;
	skill2Useing=false;
	skill3Useing=false;
	xuanxiao_JieBai=null;
	laShouCuiHuaList=new Array();
	zengJian=new Array(); // 赠剑列表
	game_HandCard_Start=new Array(); // 最初的手牌堆
	game_DropHandCard=new Array(); // 弃牌堆。充当洗牌之后新的手牌堆
	game_EventCardDeck=new Array(); // 事件牌堆
	game_MonsterDeck=new Array(); // 怪物牌堆
	game_MonsterDropDeck=new Array(); // 怪物牌弃牌堆
	nextStep = 0;
	nowPlayerNumber = 0;
	gameRunning = true;
	dropCarding = false;
	tempMonster = null;
	fight_Trigger = new Array();
	fight_Monster = new Array();
	fight_FirstMonster = null;
	fight_SecondMonster = null;
	jincantuoqiao = false;
	attakedMoster = false;
	attack_1 = false;
	attack_2 = false;
	attack_3 = true;
	game_Bingxingjue=false;
	jiangshili_xisheng=false;
	//suoHunList=new Array();
	longkuiRongzhuCardName=null;
	jiujianxianZuiXianWangYueBu = 0;
	bossUseDongmingbaojing=false;
	tantadeqiongdingMark=false;
	muhoudeyinmouMark=false;
	huayaoshuiMark=false;
	jushentiantuMark=false;//危机牌【巨神天屠】是否发挥效果
	moyiYanshiqiongbingAddCombatMark=false;//标识魔主“魔翳·湮世穹兵”战力是否已经变成10
	playerScore=0;
	bossScore=0;

	// 洗手牌堆
	game_HandCard_Start = new Array();
	game_DropHandCard = new Array();
	game_HandCard_Start = initAdvHandCardDeck(game_HandCard_Start);
	// 洗怪物牌堆
	game_MonsterDeck = new Array();
	game_MonsterDeck = initMonsterDeck();
	game_MonsterDeck=addCrisisCard(game_MonsterDeck,nowStage.stageCrisisCards);
	//game_MonsterDeck[0]=11;
	//cc.log("monterDeck = "+game_MonsterDeck);
	//boss.bingxingjueList.push(1);
	initGropCard(function(){
		advAddHandCard(nowPlayerTerm,nowPlayerTerm[0],nowPlayerTerm[0],null,[3,3,3,1],true,false);
		//addHandCard(nowPlayerTerm,nowPlayerTerm[0],nowPlayerTerm[0],null,[50,0,0,1],true,false);
		//new Tantadeqiongding(48).openEffect();
		//jimushuiEffect(myControlPlayer,null);
	});
	//advAddHandCard([player1],player1,player1,58,[1],false,false);//魔剑
	//advAddHandCard([player2],player2,player2,28,[1],false,false);//魔剑
	

	//boss.yinguList.push(boss.handCard[0]);
	//boss.handCard.remove(0);
	//boss.hp=1;
	//player1.pet_FengMonster=new GoumangMonster(0);
	//player1.pet_Feng="句芒";
	//player1.pet_LeiMonster=new JiliangyinzheMonster(4);
	//player1.pet_Lei="积粮隐者";
	//boss.monsterList=[1,1,1,1];
	//game_MonsterDeck[0]=11;
	//player1.hp=1;
	//player2.hp=3;
	//player3.hp=1;
}
