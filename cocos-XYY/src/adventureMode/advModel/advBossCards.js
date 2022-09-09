function bossCardManager(boss,number){
	if (number == 1) {
		boss._ID = 1;
		boss._name = bossNameLingyuegongzhu;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_lingyuegongzhu_png;
		boss.hp = 12;
		boss.combat = 2;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_lingyuegongzhudeath_png;
		boss.skill_1 = Text.nil;
		boss.sex = 1; 
	}else if(number==2){
		boss._ID = 2;
		boss._name = bossNameSheyaonan;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_sheyaonan_png;
		boss.hp = 10;
		boss.combat = 3;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_sheyaonandeath_png;
		boss.skill_1 = Text.bossSkillSheyaonan;
		boss.sex = 0; 
	}else if(number==3){
		boss._ID=3;
		boss._name=bossNameHuyaonv;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_huyaonv_png;
		boss.hp = 6;
		boss.combat = 3;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_huyaonvdeath_png;
		boss.skill_1 = Text.bossSkillHuyaonv;
		boss.sex = 1; 
	}else if(number==4){
		boss._ID=4;
		boss._name=bossNameCaiyi;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_caiyi_png;
		boss.hp = 12;
		boss.combat = 3;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_caiyideath_png;
		boss.skill_1 = Text.bossSkillCaiyi;
		boss.sex = 1; 
	}else if(number==5){
		boss._ID=5;
		boss._name=bossNameZhenyumingwang;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_zhenyumingwang_png;
		boss.hp = 12;
		boss.combat = 5;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_zhenyumingwangdeath_png;
		boss.skill_1 = Text.bossSkillZhenyumingwang;
		boss.sex = 0; 
	}else if(number==6){
		boss._ID=6;
		boss._name=bossNameBaiyuejiaozhu;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_baiyuejiaozhu_png;
		boss.hp = 12;
		boss.combat = 5;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_baiyuejiaozhudeath_png;
		boss.skill_1 = Text.bossSkillBaiyuejiaozhu;
		boss.sex = 0; 
	}else if(number==7){
		boss._ID=7;
		boss._name=bossNameHuangshansanguai;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_huangshansanguai_png;
		boss.hp = 10;
		boss.combat = 3;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_huangshansanguaideath_png;
		boss.skill_1 = Text.bossSkillHuangshansanguai;
		boss.sex = 0; 
	}else if(number==8){
		boss._ID=8;
		boss._name=bossNameXueshouDuying;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_xueshouduying_png;
		boss.hp = 12;
		boss.combat = 3;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_xueshouduyingdeath_png;
		boss.skill_1 = Text.bossSkillXueshouduying;
		boss.sex = 0; 
	}else if(number==9){
		boss._ID=9;
		boss._name=bossNameShushanqisheng;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_shushanqisheng_png;
		boss.hp = 12;
		boss.combat = 7;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_shushanqishengdeath_png;
		boss.skill_1 = Text.bossSkillShushanqishen;
		boss.sex = 0; 
	}else if(number==10){
		boss._ID=10;
		boss._name=bossNameJiangshili;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_jiangshili_png;
		boss.hp = 36;
		boss.combat = 4;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_jiangshilideath_png;
		boss.skill_1 = Text.bossSkillJiangshili;
		boss.sex = 0; 
	}else if(number==11){
		boss._ID=11;
		boss._name=bossNameMoyiYanshiqiongbing;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_moyiyanshiqiongbing_png;
		boss.hp = 1;
		boss.combat = 4;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_moyiyanshiqiongbingdeath_png;
		boss.skill_1 = Text.bossSkillMoyiYanshiqiongbing;
		boss.sex = 0; 
	}else if(number==12){
		boss._ID=12;
		boss._name=bossNameBaiyuejiaozhu;
		boss.npcName = boss._name;
		boss.playerPicSrc =resPng.mozhu_baiyuejiaozhu_png;
		boss.hp = 24;
		boss.combat = 4;
		boss.extent = 0;
		boss.playerDeathPicSrc = resPng.mozhu_baiyuejiaozhudeath_png;
		boss.skill_1 = Text.bossSkillBaiyuejiaozhu;
		boss.sex = 0; 
	}
	boss.skillNameList=new Array();
	if (boss.skill_1!=Text.nil) {
		boss.skillNameList.push(boss.skill_1);
	}

	boss.maxHP = boss.hp;
	boss.maxCombat = boss.combat;
	boss.maxExtent = boss.extent;
	boss.tempAddCombat = 0;
	boss.skillAddCombat = 0;
	boss.tempAddExtent = 0;
	boss.skillAddExtent = 0;
	boss.tempZhuangbeiSkillCombat = 0;
	boss.tempZhuangbeiSkillExtent = 0;
	//return boss;
}