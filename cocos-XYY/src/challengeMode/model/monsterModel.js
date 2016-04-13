var isBusiness = false;
var monsterEffect = false;
var jinchanguimu = null;
var heartList = new Array();


function pet_Effect(monster, player) {
	monster.name=monster.name.replaceAll("(爆发)");
	// 柳梦璃【妖王】技能(触发时效果)
	skillcharacters_LiumengliYaowang(player, true);
	monster.petEffect(player);
}

function updata_PetsEffect(monster, player) {
	if (monster != null) {
		monster.name=monster.name.replaceAll("(爆发)");
		skillcharacters_LiumengliYaowang(player, false);
		monster.updatePetEffect(player);
	}
}


// NPC效果
function npc_Effect(monster,result,callBack) {
	NPCEffect = true;
	switch (result) {
	case NPCEFFECTMESSAGE.ZHUZHAN:
		npcEffectZhuzhan(monster,callBack)
		break;
	case NPCEFFECTMESSAGE.JIAOYI:
		npcEffectJiaoyi(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XIJI:
		npcEffectXiji(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.CHUANGONG:
		npcEffectChuangong(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XIULIAN:
		npcEffectXiulian(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.ZHILIAO:
		npcEffectZhiliao(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.DAOQIE:
		npcEffectDaoqie(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.XUNHUA:
		npcEffectXunhua(monster,callBack);
		break;
	case NPCEFFECTMESSAGE.JIARU:
		npcEffectJoin(monster,callBack);
		break;
		
	}
}

