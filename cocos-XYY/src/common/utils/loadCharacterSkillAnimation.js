function loadCharacterSkillAnimation(player){
	switch(player._ID){
	case 1:
		player.animation = createAnimationSkillXiagurouchang(player);
		break;
	case 2:
		player.animation=createAnimationSkillMengshe(player);
		break;
	case 3:
		player.animation=createAnimationSkillJieruchou(player);
		break;
	case 4:
		player.animation=createAnimationSkillGuilingjing(player);
		break;
	case 5:
		player.animation=createAnimationSkillZuixianwangyuebu(player);
		break;
	case 8:
		player.animation=createAnimationSkillJujue(player);
		break;
	case 9:
		player.animation=createAnimationSkillYuanlingguixinshu(player);
		break;
	case 11:
		player.animation=createAnimationSkillHaosheng(player);
		break;
	case 12:
		player.animation=createAnimationSkillGuanai(player);
		break;
	case 13:
		player.animation=createAnimationSkillJuedou(player);
		break;
	case 14:
		player.animation=createAnimationSkillZhanbu(player);
		break;
	case 15:
		player.animation=createAnimationSkillManheng(player);
		break;
	case 16:
		player.animation=createAnimationSkillXiongdi(player);
		break;
	case 17:
		player.animation=createAnimationSkillTaotie(player);
		break;
	case 18:
		player.animation=createAnimationSkillHouyisherigong(player);
		break;
	case 19:
		player.animation=createAnimationSkillSounangtanbao(player);
		break;
	case 20:
		player.animation=createAnimationSkillMengkuilei(player);
		break;
	case 21:
		player.animation=createAnimationSkillZengjian(player);
		break;
	case 22:
		player.animation=createAnimationSkillNingbingfenyan(player);
		break;
	case 23:
		player.animation=createAnimationSkillYuexingzhishu(player);
		break;
	case 24:
		player.animation=createAnimationSkillWufawutian(player);
		break;
	case 26:
		player.animation=createAnimationSkillNvwa(player);
		break;
	case 27:
		player.animation=createAnimationSkillKuanglongxunyingzhan(player);
		break;
	case 28:
		player.animation=createAnimationSkillNitianzhen(player);
		break;
	case 29:
		player.animation=createAnimationSkillLitianji(player);
		break;
	case 31:
		player.animation=createAnimationSkillDipai(player);
		break;
	case 33:
		player.animation=createAnimationSkillJianling(player);
		break;
	case 34:
		player.animation=createAnimationSkillJianhun(player);
		break;
	case 36:
		player.animation=createAnimationSkillRumengdiao(player);
		break;
	case 44:
		player.animation=createAnimationSkillHuihunxianmeng(player);
		break;
		
	}
	if(player.animation!=null){
		player.animation.retain();
	}
}