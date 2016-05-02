var skillButton_DropCardEffect=false;
var skillEffectDropCard;
var yuntianhe_HouYiSheRiGong=0; // 云天河后羿射日弓的发动计数
var zhaolingerSp_HouYiSheRiGong=0; // 赵灵儿SP后羿射日弓的发动计数
var chonglou_JueDou = 0; // 重楼本回合决斗次数
var NPCEffect; // 翻取NPC时，不允许使用战牌
var skill1Useing; // 技能1正在发动中，其他技能无法发动
var skill2Useing; // 技能2正在发动中，其他技能无法发动
var skill3Useing; // 技能3正在发动中，其他技能无法发动
var xuanxiao_JieBai;
var laShouCuiHuaList=new Array(); // 辣手摧花列表
var zengJian=new Array(); // 赠剑列表
var game_HandCard_Start=new Array(); // 最初的手牌堆
var game_DropHandCard=new Array(); // 弃牌堆。充当洗牌之后新的手牌堆
var game_EventCardDeck=new Array(); // 事件牌堆
var game_MonsterDeck=new Array(); // 怪物牌堆
var selectHandCard = null;
var monsterLabel = null;
var threadGameRound = null;
var threadMengshe = null;
var textArea = null;
var back = null;
var player1skillButton1 = null;
var player1skillButton2 = null;
var player1skillButton3 = null;
var player1ArmLabel = null;
var player1DefenseLabel = null;
var player1Pet1Label = null;
var player1Pet4Label = null;
var cardEffectLabel = null;
var player1playerPic = null;
var player2playerPic = null;
var player3playerPic = null;
var player4playerPic = null;
var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;
var nowPlayerTerm=null;
var nextStep = 0; // 0开始阶段、1事件阶段、2技牌阶段、3战斗阶段1、4战斗阶段2，5战斗结束阶段、6补牌阶段、7弃牌阶段、8结束阶段
var nowPlayerNumber = 0; // 当前行动的玩家序号
var jiujianxianZuiXianWangYueBu = 0; // 0为未触发第二次打怪，1为已触发第二次打怪;
var usedJiaohua = false;
var gameRunning = true;
var dropCarding = false;
var jincantuoqiao = false;
var attakedMoster = false; // 判断是否打过怪
var attack_1 = false;
var attack_2 = false;
var attack_3 = true;
var tempMonster = null;
var fight_Trigger=new Array(); // 触发方
var fight_Monster=new Array(); // 怪物方
var fight_FirstMonster = null;
var fight_SecondMonster = null;
var ai_AttackMonster = false; // 判断AI是否选择打怪，如果不打则无需计算打怪结果
var game_Bingxingjue=false;
var jiangshili_xisheng=false;// 姜世离是否发动“牺牲”
//var suoHunList=null;//魔翳“锁魂”列表
var longkuiRongzhuCardName=null;// 龙葵熔铸的技牌名称
var linyueruSpBiwuzhaoqinMaleList=null;// 林月如sp【比武招亲】男性角色列表
var linyueruSpBiwuzhaoqinFemaleList=null;// 林月如sp【比武招亲】女性角色列表

var initAchivement={
		// 人物成就
		achivementLixiaoyao:new Achivement("lixiaoyao",resPng.AchivementLixiaoyao,"使用【李逍遥】并触发“侠骨柔肠”累积达到100次",100),
		achivementZhaolinger:new Achivement("zhaolinger",resPng.AchivementZhaolinger,"触发【赵灵儿】“梦蛇”效果累积达到100次",100),
		achivementZhaolingerMengshe:new Achivement("zhaolingerMengshe",resPng.AchivementZhaolingerMengshe,"触发【赵灵儿(梦蛇)】“女娲”效果累积达到100次",100),
		achivementLinyueru:new Achivement("linyueru",resPng.AchivementLinyueru,"使用【林月如】并触发“嫉恶如仇”效果累积达到100次",100),
		achivementAnu:new Achivement("anu",resPng.AchivementAnu,"使用【阿奴】并发动“鬼灵精”效果累积达到100次",100),
		achivementJiujianxian:new Achivement("jiujianxian",resPng.AchivementJiujianxian,"使用【酒剑仙】并发动“醉仙望月步”效果累积达到100次",100),
		achivementBaiyuejiaozhu:new Achivement("baiyuejiaozhu",resPng.AchivementBaiyuejiaozhu,"使用【拜月教主】并发动“召唤水魔兽”效果累积达到100次",100),
		achivementWangxiaohu:new Achivement("wangxiaohu",resPng.AchivementWangxiaohu,"使用【王小虎】并触发“发挥不稳定”效果，且首次掷骰子点数不为0和6，累积达到100次",100),
		achivementSumei:new Achivement("sumei",resPng.AchivementSumei,"使用【苏媚】并触发“拒绝”效果累积达到100次",100),
		achivementShenqishuang:new Achivement("shenqishuang",resPng.AchivementShenqishuang,"触发【沈欺霜】“仙霞五奇”效果累积达到100次",100),
		achivementKonlin:new Achivement("konlin",resPng.AchivementKonlin,"使用【孔磷】并发动“辣手摧花”累积达到100次",100),                                                                                                                                                                                                                                                             
		achivementMozun:new Achivement("monzun",resPng.AchivementMozun,"使用【魔尊】并发动“蓄势待发”累积达到100次",100),
		achivementTangxuejian:new Achivement("tangxuejian",resPng.AchivementTangxuejian,"使用【唐雪见】并发动“追打”效果累积达到100次",100),
		achivementChonglou:new Achivement("chonglou",resPng.AchivementChonglou,"使用【重楼】并发动“决斗”效果且获得胜利累积达到100次",100),
		achivementZixuan:new Achivement("zixuan",resPng.AchivementZixuan,"使用【紫萱】并发动“关爱”效果累积达到100次",100),
		achivementNangonghuang:new Achivement("nangonghuang",resPng.AchivementNangonghuang,"使用【南宫煌】并发动“占卜”效果累积达到100次",100),
		achivementXingxuan:new Achivement("xingxuan",resPng.AchivementXingxuan,"使用【星璇】并在技牌阶段发动“烹饪”效果累积达到100次",100),
		achivementWenhui:new Achivement("wenhui",resPng.AchivementWenhui,"使用【温慧】并触发“阵法”效果累积达到100次",100),
		achivementWangpengxu:new Achivement("wangpengxu",resPng.AchivementWangpengxu,"使用【王蓬絮】并发动“饕餮”效果累积达到100次",100),
		achivementYuntianhe:new Achivement("yuntianhe",resPng.AchivementYuntianhe,"使用【云天河】并发动“后羿射日弓”效果累积达到100次",100),
		achivementHanlingsha:new Achivement("hanlingsha",resPng.AchivementHanlingsha,"使用【韩菱纱】并发动“搜囊探宝”效果累积达到100次",100),
		achivementLiumengli:new Achivement("liumengli",resPng.AchivementLiumengli,"使用【柳梦璃】并触发“妖王”效果累积达到100次",100),
		achivementMurongziying:new Achivement("murongziying",resPng.AchivementMurongziying,"使用【慕容紫英】并发动“赠剑”效果累积达到100次",100),
		achivementXuanxiao:new Achivement("xuanxiao",resPng.AchivementXuanxiao,"使用【玄霄】并触发“凝冰焚炎”效果累积达到100次",100),
		achivementLongyou:new Achivement("longyou",resPng.AchivementLongyou,"使用【龙幽】并触发“越行之术”效果累积达到1000次",1000),
		achivementXiaoman:new Achivement("xiaoman",resPng.AchivementXiaoman,"使用【小蛮】并触发“活力”效果累积达到100次",100),
		achivementJiangyunfan:new Achivement("jiangyunfan",resPng.AchivementJiangyunfan,"使用【姜云凡】并发动“狂龙迅影斩”效果累积达到500次",500),
		achivementTangyurou:new Achivement("tangyurou",resPng.AchivementTangyurou,"使用【唐雨柔】并发动“逆天阵”效果累积达到200次",200),
		achivementOuyanghui:new Achivement("ouyanghui",resPng.AchivementOuyanghui,"使用【欧阳慧】并发动“雳天击”效果累积达到100次",100),
		achivementJiangshili:new Achivement("longkuigui",resPng.AchivementJiangshili,"使用【姜世离】并发动“牺牲”效果累积达到200次",200),
		achivementMoyi:new Achivement("moyi",resPng.AchivementMoyi,"使用【魔翳】并发动“锁魂”效果获得傀儡累积达到100次",100),
		achivementYanshiqiongbing:new Achivement("yanshiqiongbing",resPng.AchivementYanshiqiongbing,"使用【湮世穹兵】并成功发动“毁天灭地”效果累积达到50次",50),
		achivementLongkui:new Achivement("longkui",resPng.AchivementLongkui,"使用【龙葵】并发动“剑灵”效果累积达到100次",100),
		achivementLongkuigui:new Achivement("longkuigui",resPng.AchivementLongkuigui,"使用【龙葵鬼】并发动“剑魂”效果累积达到100次",100),
		achivementJingtianSp:new Achivement("jingtiansp",resPng.AchivementJingtianSp,"使用【景天sp】并发动“鉴宝”效果累积达到1000次",1000),
		// 卡牌成就
		achivementBingxinjue:new Achivement("bingxinjue",resPng.AchivementBingxinjue,"使用卡牌【冰心诀】累积达到100次",100),
		achivementDongmingbaojing:new Achivement("dongmingbaojing",resPng.AchivementDongmingbaojing,"使用卡牌【洞冥宝镜】累积达到100次",100),
		achivementYingu:new Achivement("yingu",resPng.AchivementYingu,"使用卡牌【隐蛊】累积达到100次",100),
		achivementLinghuxiandan:new Achivement("linghuxiandan",resPng.AchivementLinghuxiandan,"技牌阶段使用卡牌【灵葫仙丹】累积达到100次",100),
		achivementShuerguo:new Achivement("shuerguo",resPng.AchivementShuerguo,"使用卡牌【鼠儿果】累积达到100次",100),
		achivementKuicetianji:new Achivement("kuicetianji",resPng.AchivementKuicetianji,"使用卡牌【窥测天机】累积达到100次",100),
		achivementToudao:new Achivement("toudao",resPng.AchivementToudao,"使用卡牌【偷盗】累积达到100次",100),
		achivementTongqianbiao:new Achivement("tongqianbiao",resPng.AchivementTongqianbiao,"使用卡牌【铜钱镖】累积达到100次",100),
		achivementTianleipo:new Achivement("tianleipo",resPng.AchivementTianleipo,"使用卡牌【天雷破】累积达到100次",100),
		achivementWuqichaoyuan:new Achivement("wuqichaoyuan",resPng.AchivementWuqichaoyuan,"使用卡牌【五气朝元】累积达到100次",100),

		// 特殊成就
		achivementLunhui:new Achivement("lunhui",resPng.AchivementLunhui,"获得单局游戏胜利时，有概率完成本成就\n（完成本成就可开启角色卡【景天sp】）",1),
		achivementXianquRumengdiao:new Achivement("xianququmengdiao",resPng.AchivementXianquRumengdiao,"选择凤鸣玉誓角色【姜云凡】获得游戏胜利且胜利时【姜云凡】的生命值为最大值\n（完成本成就可开启角色卡【唐雨柔sp】）",1),
		achivementHuiyiZhaoqin:new Achivement("huiyizhaoqin",resPng.AchivementHuiyizhaoqin,"选择角色【林月如sp】并发动技能“比武招亲”效果累计达到100次",100)
};

var characterAchiveList=[];
for(var i in initAchivement){
	characterAchiveList.push(initAchivement[i]);
}

function initPlayer(){
	nowPlayerTerm = new Array();
	nowPlayerTerm.push(player1);
	nowPlayerTerm.push(player3);
	nowPlayerTerm.push(player2);
	nowPlayerTerm.push(player4);
	player1.friendList.push(player1);
	player1.friendList.push(player2);
	player2.friendList.push(player2);
	player2.friendList.push(player1);
	player3.friendList.push(player3);
	player3.friendList.push(player4);
	player4.friendList.push(player4);
	player4.friendList.push(player3);
}

function initGameValue(){
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
	// suoHunList=new Array();
	longkuiRongzhuCardName=null;
	jiujianxianZuiXianWangYueBu = 0;
	linyueruSpBiwuzhaoqinMaleList=[];// 林月如sp【比武招亲】男性角色列表
	linyueruSpBiwuzhaoqinFemaleList=[];// 林月如sp【比武招亲】女性角色列表

	// 洗手牌堆
	game_HandCard_Start = new Array();
	game_DropHandCard = new Array();
	game_HandCard_Start = initHandCardDeck(game_HandCard_Start);
	// 洗怪物牌堆
	game_MonsterDeck = new Array();
	game_MonsterDeck = initMonsterDeck(game_MonsterDeck, randMonster());
	// game_MonsterDeck[0]= 11;

	/*
	 * game_MonsterDeck.push(game_MonsterDeck[0]);
	 * game_MonsterDeck.removeObject(16); game_MonsterDeck[0]=0;
	 */

	 //game_MonsterDeck[0]=24;
	 //game_MonsterDeck[1]=23;
	 //game_MonsterDeck[2]=12;

	// 初始化事件牌
	game_EventCardDeck = new Array();
	game_EventCardDeck = initEventCardDeck();
	//game_EventCardDeck=[20];

	// 发初始手牌
	addHandCard(nowPlayerTerm,nowPlayerTerm[0],nowPlayerTerm[0],null,[3,3,3,3],true,false);
	//addHandCard(nowPlayerTerm,nowPlayerTerm[0],nowPlayerTerm[0],null,[25,0,2,0],true,false);
	 //addHandCard([player1],player1,player1,34,[1],false,false);//天雷破
	 //addHandCard([player4],player4,player4,25,[1],false,false);//灵葫仙丹
	// addHandCard([player1],player1,player1,43,[1],false,false);//偷盗
	// addHandCard([player1],player1,player1,22,[1],false,false);//鼠儿果
	// addHandCard([player3],player3,player3,32,[1],false,false);//铜钱镖
	// addHandCard([player3],player3,player3,28,[1],false,false);//冰心
	// addHandCard([player4],player4,player4,18,[1],false,false);//隐蛊
	// addHandCard([player3],player3,player3,47,[1],false,false);//无尘剑
	// addHandCard([player3],player3,player3,50,[1],false,false);//天蛇杖

	/*
	 * for(var i=0;i<2;i++){ var leiling = new createHandCardImageView("雷灵");
	 * player1.maxExtent -= parseInt(player1.skillTempList.length / 2);
	 * player1.skillTempList.push(leiling); player1.maxExtent +=
	 * parseInt(player1.skillTempList.length / 2); }
	 */
	 //player1.hp=1;
	 //player3.hp=1;
	// player1.defenseExtent=2;
	//player2.hp=0;
	 //player3.hp=1;
	 //player4.hp=0;
	// isDeath(player3,[player3,player4], true,null,true);
	// player2.handCard=new Array();
	// player1.defense="踏云靴";
	// player2.arms1="天蛇杖";
	// player4.arms1="无尘剑";
	// player4.defense="乾坤道袍";
	// isDeath(player3, true);
	// player3.hp=0;
	// isDeath(player3, true);
	// player4.hp=0;
	// isDeath(player4, true);
	// player1.pet_LeiMonster=new XiejianxianMonster();
	/*
	 * newHandCard(randHandCardNumber( game_HandCard_Start, game_DropHandCard),
	 * nowPlayerTerm[0], 40, true);
	 */
	/*
	 * player3.pet_FengMonster=new MonsterModel("句芒");
	 * player3.pet_Feng=player3.pet_FengMonster.name;
	 * player3.pet_Lei=player3.pet_LeiMonster.name;
	 * player3.pet_HuoMonster=new MonsterModel("肥肥");
	 * player3.pet_Huo=player3.pet_HuoMonster.name;
	 */
	// player1.pet_FengMonster=new MonsterModel("句芒");
	// player1.pet_Feng=player1.pet_FengMonster.name;
	// player1.pet_HuoMonster=new MonsterModel("肥肥");
	// player1.pet_Huo=player1.pet_HuoMonster.name;
	// player2.pet_ShuiMonster=new MonsterModel("水魔兽");
	// player2.pet_Shui=player2.pet_ShuiMonster.name;
	// player1.pet_TuMonster=new MonsterModel("天鬼皇");
	// calculate_Pets(player1, new XiejianxianMonster());
	// calculate_Pets(player1, new JinchanguimuMonster());
	// calculate_Pets(player2, pet_TuMonster);
	// calculate_Pets(player3, pet_TuMonster);
	// calculate_Pets(player4, pet_TuMonster);
	// player1.pet_Tu=player1.pet_TuMonster.name;
	// pet_Effect(player1.pet_TuMonster, player1);
	// pet_Effect(player2.pet_ShuiMonster, player2);
	// player1.npcHelp=[1,1,1,1,1,1,1,1,1,1];
	/*
	 * player1.maxCombat=1; player2.maxCombat=1; player3.maxCombat=1;
	 * player4.maxCombat=1;
	 */

}