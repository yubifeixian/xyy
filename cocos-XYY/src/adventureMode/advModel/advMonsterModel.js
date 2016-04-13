var isBusiness = false;
var monsterEffect = false;
var jinchanguimu = null;
var heartList = new Array();


function advPet_Effect(monster, player) {
	monster.name=monster.name.replaceAll(Text.baofa);
	// 柳梦璃【妖王】技能(触发时效果)
	advSkillcharacters_LiumengliYaowang(player, true);
	jiangshiliAddCombatEffect();
	moyiYanshiqiongbingSkillEffect(function(){
		monster.petEffect(player);
	});
}

function advUpdate_PetsEffect(monster, player) {
	if (monster != null) {
		game_MonsterDropDeck.push(monster.uid);
		monster.name=monster.name.replaceAll(Text.baofa);
		advSkillcharacters_LiumengliYaowang(player, false);
		monster.updatePetEffect(player);
	}
}


//NPC效果
function advNpc_Effect(monster,result,callBack) {
	NPCEffect = true;
	switch (result) {
	case NPCEFFECTMESSAGE.ZHUZHAN:
		npcEffectZhuzhan(monster,callBack)
		break;
	case NPCEFFECTMESSAGE.JIAOYI:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectJiaoyi(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XIJI:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectXiji(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.CHUANGONG:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectChuangong(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XIULIAN:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectXiulian(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.ZHILIAO:
		game_MonsterDropDeck.push(monster.uid);
		avdNpcEffectZhiliao(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.DAOQIE:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectDaoqie(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XUNHUA:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectXunhua(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.JIARU:
		game_MonsterDropDeck.push(monster.uid);
		advNpcEffectJoin(monster,callBack);
		break;

	}
}

