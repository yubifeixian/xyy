function characterCardManager(player,number){
	var _char=baseCharacterData[number];
	player._ID = parseInt(_char._ID);
	player._name = _char._name;
	player.npcName = player._name;
	player.playerPicSrc =g_resources[_char.playerPicSrc];
	player.hp = parseInt(_char.maxHP);
	player.combat = parseInt(_char.maxCombat);
	player.extent = parseInt(_char.maxExtent);
	player.playerDeathPicSrc = g_resources[_char.playerDeathPicSrc];
	player.skill_1 = _char.skill_1;
	player.skillButton1 = g_resources[_char.skillButton1];
	player.skill1Effect = _char.skill1Effect;

	player.skill_2 = _char.skill_2;
	player.skillButton2 = g_resources[_char.skillButton2];
	player.skill2Effect = _char.skill2Effect;

	var skill3Name=_char.skill_3;
	player.skill_3 = skill3Name;
	player.skill3Effect = _char.skill3Effect;
	if(skill3Name!=null&&skill3Name!=""&&skill3Name!=Text.nil){
		player.skillButton3 = g_resources[_char.skillButton3];
	}
	player.lover1 = _char.lover1; 
	player.lover2 = _char.lover2; 
	player.lover3 = _char.lover3; 
	player.lover4 = _char.lover4; 
	player.sex = parseInt(_char.sex); 
	var achivement=_char.playerAchievement;
	if(achivement!=null&&achivement!=""){
		player.playerAchievement=characterAchiveList[achivement];
	}
	player.playerAchievement=characterAchiveList[_char.playerAchievement];
	player.mode=parseInt(_char.mode);
	player.skillUrl=g_json[_char.skillUrl];
	player.skillPng=g_resources[_char.skillPng];
	
	
	/*
	 * if (number == 1) { player._ID = _char._ID; player._name = _char._name;
	 * player.npcName = player._name; player.playerPicSrc
	 * =g_resources[_char.playerPicSrc]; player.hp = _char.maxHP; player.combat =
	 * _char.maxCombat; player.extent = _char.maxExtent;
	 * player.playerDeathPicSrc = g_resources[_char.playerDeathPicSrc];
	 * player.skill_1 = _char.skill_1; player.skillButton1 =
	 * g_resources[_char.skillButton1]; player.skill1Effect =
	 * _char.skill1Effect;
	 * 
	 * player.skill_2 = skillnameFeilongtanyunshou; player.skillButton2 =
	 * g_resources[_char.skillButton2]; player.skill2Effect =
	 * _char.skill2Effect;
	 * 
	 * var skill3Name=_char.skill_3; if(skill3Name!=Text.nil){ player.skill_3 =
	 * skill3Name; player.skillButton3 = g_resources[_char.skillButton3];
	 * player.skill3Effect = _char.skill3Effect; } player.lover1 = _char.lover1;
	 * player.lover2 = _char.lover2; player.lover3 = _char.lover3; player.lover4 =
	 * _char.lover4; player.sex = _char.sex;
	 * player.skillUrl=g_json[_char.skillUrl]; player.skillPng=g_resources[4];
	 * player.playerAchievement=characterAchiveList[_char.playerAchievement];
	 * player.mode=_char.mode;
	 * player.skillUrl=res.skillanimation_xiagurouchang_plist;
	 * player.skillPng=resPng.skillanimation_xiagurouchang_png; } else if
	 * (number == 2) { player._ID = 2; player._name = nameZhaolinger;
	 * player.npcName = player._name; player.playerPicSrc = resPng.linger_png;
	 * player.playerDeathPicSrc =resPng.lingerdeath_png; player.hp = 7;
	 * player.combat = 3; player.extent = 4;
	 * 
	 * player.skill_1 = skillnameShuangjian; player.skillButton1 =
	 * resPng.zhaolinger_shuangjian_png; player.skill1Effect = effectShuangjian;
	 * 
	 * player.skill_2 = skillnameMengshe; player.skillButton2 =
	 * resPng.zhaolinger_mengshe_png; player.skill2Effect = effectMengshe;
	 * player.skill_3 = "无"; player.lover1 = nameLixiaoyao; player.sex = 1;
	 * player.skillUrl=res.skillanimation_mengshe_plist;
	 * player.skillPng=resPng.skillanimation_mengshe_png;
	 * player.playerAchievement=initAchivement.achivementZhaolinger;
	 * player.mode=MODE.NORMAL; } else if (number == 3) { player._ID = 3;
	 * player._name =nameLinyueru; player.npcName =player._name;
	 * player.playerPicSrc = resPng.yueru_png; player.playerDeathPicSrc =
	 * resPng.yuerudeath_png; player.hp = 9; player.combat = 2; player.extent =
	 * 5; player.skill_1 =skillnameLinjiajianfa; player.skillButton1 =
	 * resPng.linyueru_linjiajianfa_png; player.skill1Effect =
	 * effectLinjiajianfa; player.skill_2 = skillnameJieruchou
	 * player.skillButton2 =resPng.linyueru_jieruchou_png; player.skill2Effect
	 * =effectJieruchou; player.skill_3 = "无"; player.lover1 = nameLixiaoyao;
	 * player.sex = 1; player.skillUrl=res.skillanimation_jieruchou_plist;
	 * player.skillPng=resPng.skillanimation_jieruchou_png;
	 * player.playerAchievement=initAchivement.achivementLinyueru;
	 * player.mode=MODE.NORMAL; } else if (number == 4) { player._ID = 4;
	 * player._name =nameAnu; player.npcName =player._name; player.playerPicSrc =
	 * resPng.anu_png; player.playerDeathPicSrc = resPng.anudeath_png; player.hp =
	 * 5; player.combat = 4; player.extent = 2; player.skill_1
	 * =skillnameGuilingjing; player.skillButton1 =resPng.anu_guilingjing_png;
	 * player.skill1Effect =effectGuilingjing; player.skill_2
	 * =skillnameWangushitian; player.skillButton2 =resPng.anu_wangushitian_png;
	 * player.skill2Effect =effectWangushitian; player.skill_3 = "无";
	 * player.lover1 = "无"; player.sex = 1;
	 * player.skillUrl=res.skillanimation_guilingjing_plist;
	 * player.skillPng=resPng.skillanimation_guilingjing_png;
	 * player.playerAchievement=initAchivement.achivementAnu;
	 * player.mode=MODE.NORMAL; } else if (number == 5) { player._ID = 5;
	 * player._name = nameJiujianxian; player.npcName = player._name;
	 * player.playerPicSrc = resPng.jiujianxian_png; player.playerDeathPicSrc =
	 * resPng.jiujianxiandeath_png; player.hp =8; player.combat = 5;
	 * player.extent = 1; player.skill_1 =skillnameYujianshu;
	 * player.skillButton1 = resPng.jiujianxian_yujianshu_png;
	 * player.skill1Effect = effectYujianshu; player.skill_2 =
	 * skillnameZuixianwangyuebu; player.skillButton2
	 * =resPng.jiujianxian_zuixianwangyuebu_png; player.skill2Effect
	 * =effectZuixianwangyuebu; player.skill_3 = "无"; player.lover1 = "无";
	 * player.sex = 0;
	 * player.skillUrl=res.skillanimation_zuixianwangyuebu_plist;
	 * player.skillPng=resPng.skillanimation_zuixianwangyuebu_png;
	 * player.playerAchievement=initAchivement.achivementJiujianxian;
	 * player.mode=MODE.NORMAL; } else if (number ==6){ player._ID = 6;
	 * player._name =nameBaiyuejiaozhu; player.npcName = player._name;
	 * player.playerPicSrc = resPng.baiyue_png; player.playerDeathPicSrc
	 * =resPng.baiyuedeath_png; player.hp = 8; player.combat = 3; player.extent =
	 * 3; player.skill_1 = skillnameShuimoshouheti; player.skillButton1
	 * =resPng.baiyuejiaozhu_shuimoshouheti_png; player.skill1Effect
	 * =effectShuimoshouheti; player.skill_2 = skillnameZhaohuanshuimoshou;
	 * player.skillButton2 =resPng.baiyuejiaozhu_zhaohuanshuimoshou_png;
	 * player.skill2Effect =effectZhaohuanshuimoshou; player.skill_3 = "无";
	 * player.lover1 = "水魔兽"; player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementBaiyuejiaozhu;
	 * player.mode=MODE.NORMAL; } else if (number == 7) { player._ID = 7;
	 * player._name =nameWangxiaohu; player.npcName = player._name;
	 * player.playerPicSrc = resPng.xiaohu_png; player.playerDeathPicSrc =
	 * resPng.xiaohudeath_png; player.hp = 11; player.combat = 2; player.extent =
	 * 3; player.skill_1 =skillnameFahuibuwending; player.skillButton1
	 * =resPng.wangxiaohu_fahuibuwending_png; player.skill1Effect
	 * =effectFahuibuwending; player.skill_2 = skillnameBuqubunao;
	 * player.skillButton2 =resPng.wangxiaohu_buqubunao_png; player.skill2Effect
	 * =effectBuqubunao; player.skill_3 = "无"; player.lover1 = nameSumei;
	 * player.lover2 = nameShenqishuang; player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementWangxiaohu;
	 * player.mode=MODE.NORMAL; } else if (number == 8) { player._ID = 8;
	 * player._name =nameSumei; player.npcName =player._name;
	 * player.playerPicSrc = resPng.sumei_png; player.playerDeathPicSrc =
	 * resPng.sumeideath_png; player.hp = 6; player.combat = 3; player.extent =
	 * 3; player.skill_1 =skillnameJiaohua; player.skillButton1 =
	 * resPng.sumei_jiaohua_png; player.skill1Effect =effectJiaohua;
	 * player.skill_2 = skillnameJujue; player.skillButton2 =
	 * resPng.sumei_jujue_png; player.skill2Effect = effectJujue; player.skill_3 =
	 * "无"; player.lover1 = nameWangxiaohu; player.sex = 1;
	 * player.skillUrl=res.skillanimation_jujue_plist;
	 * player.skillPng=resPng.skillanimation_jujue_png;
	 * player.playerAchievement=initAchivement.achivementSumei;
	 * player.mode=MODE.NORMAL; } else if(number == 9) { player._ID = 9;
	 * player._name =nameShenqishuang; player.npcName = player._name;
	 * player.playerPicSrc =resPng.shenqishuang_png; player.playerDeathPicSrc
	 * =resPng.shenqishuangdeath_png; player.hp = 6; player.combat = 3;
	 * player.extent = 2; player.skill_1 = skillnameXianxiawuqi;
	 * player.skillButton1 =resPng.shenqishuang_xianxiawuqi_png;
	 * player.skill1Effect =effectXianxiawuqi; player.skill_2 =
	 * skillnameYuanlingguixinshu; player.skillButton2
	 * =resPng.shenqishuang_yuanlingguixinshu_png; player.skill2Effect
	 * =effectYuanlingguixinshu; player.skill_3 = "无"; player.lover1 =
	 * nameWangxiaohu; player.sex = 1;
	 * player.skillUrl=res.skillanimation_yuanlingguixinshu_plist;
	 * player.skillPng=resPng.skillanimation_yuanlingguixinshu_png;
	 * player.playerAchievement=initAchivement.achivementShenqishuang;
	 * player.mode=MODE.NORMAL; } else if (number == 10) { player._ID = 10;
	 * player._name = nameKonglin; player.npcName = player._name;
	 * player.playerPicSrc =resPng.konglin_png; player.playerDeathPicSrc
	 * =resPng.konglindeath_png; player.hp = 10; player.combat = 4;
	 * player.extent = 2; player.skill_1 = skillnameLashoucuihua;
	 * player.skillButton1 =resPng.konlin_lashoucuihua_png; player.skill1Effect
	 * =effectLashoucuihua; player.skill_2 = skillnameShengmingxianji;
	 * player.skillButton2 =resPng.konlin_shengmingxianji_png;
	 * player.skill2Effect =effectShengmingxianji; player.skill_3 = "无";
	 * player.lover1 = "无"; player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementKonlin;
	 * player.mode=MODE.NORMAL; } else if (number == 11) { player._ID = 11;
	 * player._name = nameTangxuejian; player.npcName = player._name;
	 * player.playerPicSrc = resPng.xuejian_png; player.playerDeathPicSrc
	 * =resPng.xuejiandeath_png; player.hp = 6; player.combat = 2; player.extent =
	 * 4; player.skill_1 = skillnameZhuida; player.skillButton1
	 * =resPng.tangxuejian_zhuida_png; player.skill1Effect =effectZhuida;
	 * player.skill_2 = skillnameLianji; player.skillButton2
	 * =resPng.tangxuejian_lianji_png; player.skill2Effect =effectLianji;
	 * player.skill_3 = skillnameHaosheng; player.skillButton3
	 * =resPng.tangxuejian_haosheng_png; player.skill3Effect =effectHaosheng;
	 * player.lover1 = "景天"; player.sex = 1;
	 * player.skillUrl=res.skillanimation_haosheng_plist;
	 * player.skillPng=resPng.skillanimation_haosheng_png;
	 * player.playerAchievement=initAchivement.achivementTangxuejian;
	 * player.mode=MODE.NORMAL; } else if (number == 12) { player._ID = 12;
	 * player._name =nameZixuan; player.npcName =player._name;
	 * player.playerPicSrc = resPng.zixuan_png; player.playerDeathPicSrc =
	 * resPng.zixuandeath_png; player.hp = 5; player.combat = 3; player.extent =
	 * 4; player.skill_1 =skillnameGuanai; player.skillButton1 =
	 * resPng.zixuan_guanai_png; player.skill1Effect =effectGuanai;
	 * player.skill_2 = skillnameShensheng; player.skillButton2
	 * =resPng.zixuan_shensheng_png; player.skill2Effect =effectShensheng;
	 * player.skill_3 = "无"; player.lover1 = nameChonglou; player.lover2 =
	 * "徐长卿"; player.sex = 1; player.skillUrl=res.skillanimation_guanai_plist;
	 * player.skillPng=resPng.skillanimation_guanai_png;
	 * player.playerAchievement=initAchivement.achivementZixuan;
	 * player.mode=MODE.NORMAL; } else if (number == 13) { player._ID = 13;
	 * player._name =nameChonglou; player.npcName = player._name;
	 * player.playerPicSrc = resPng.chonglou_png; player.playerDeathPicSrc =
	 * resPng.chongloudeath_png; player.hp = 12; player.combat = 5;
	 * player.extent = 1; player.skill_1 =skillnameJuedou; player.skillButton1 =
	 * resPng.chonglou_juedou_png; player.skill1Effect =effectJuedou;
	 * player.skill_2 = skillnameShouxialiuqing; player.skillButton2
	 * =resPng.chonglou_shouxialiuqing_png; player.skill2Effect
	 * =effectShouxialiuqing; player.skill_3 = skillnameJianglin;
	 * player.skillButton3 =resPng.chonglou_jianglin_png; player.skill3Effect
	 * =effectJianglin; player.lover1 = "无"; player.sex = 0;
	 * player.skillUrl=res.skillanimation_juedou_plist;
	 * player.skillPng=resPng.skillanimation_juedou_png;
	 * player.playerAchievement=initAchivement.achivementChonglou;
	 * player.mode=MODE.NORMAL; } else if (number == 14) { player._ID = 14;
	 * player._name =nameNangonghuang; player.npcName = player._name;
	 * player.playerPicSrc =resPng.nangong_png; player.playerDeathPicSrc
	 * =resPng.nangongdeath_png; player.hp = 9; player.combat = 4; player.extent =
	 * 2; player.skill_1 = skillnameZhanbu; player.skillButton1
	 * =resPng.nangonghuang_zhanbu_png; player.skill1Effect =effectZhanbu;
	 * player.skill_2 = skillnameShelingfazhen; player.skillButton2
	 * =resPng.nangonghuang_shelingfazhen_png; player.skill2Effect
	 * =effectShelingfazhen; player.skill_3 = "无"; player.lover1 = nameWenhui;
	 * player.lover2 = nameWangpengxu; player.sex = 0;
	 * player.skillUrl=res.skillanimation_zhanbu_plist;
	 * player.skillPng=resPng.skillanimation_zhanbu_png;
	 * player.playerAchievement=initAchivement.achivementNangonghuang;
	 * player.mode=MODE.NORMAL; } else if (number == 15) { player._ID = 15;
	 * player._name =nameWenhui; player.npcName =player._name;
	 * player.playerPicSrc = resPng.wenhui_png; player.playerDeathPicSrc =
	 * resPng.wenhuideath_png; player.hp = 11; player.combat = 2; player.extent =
	 * 4; player.skill_1 =skillnameZhenfa; player.skillButton1 =
	 * resPng.wenhui_zhenfa_png; player.skill1Effect =effectZhenfa;
	 * player.skill_2 = skillnameManheng; player.skillButton2
	 * =resPng.wenhui_manheng_png; player.skill2Effect =effectManheng;
	 * player.skill_3 = "无"; player.lover1 = nameNangonghuang; player.lover2 =
	 * "雷元戈"; player.sex = 1; player.skillUrl=res.skillanimation_manheng_plist;
	 * player.skillPng=resPng.skillanimation_manheng_png;
	 * player.playerAchievement=initAchivement.achivementWenhui;
	 * player.mode=MODE.NORMAL; } else if (number == 16) { player._ID = 16;
	 * player._name =nameXingxuan; player.npcName =player._name;
	 * player.playerPicSrc = resPng.xingxuan_png; player.playerDeathPicSrc =
	 * resPng.xingxuandeath_png; player.hp = 7; player.combat = 2; player.extent =
	 * 5; player.skill_1 =skillnamePengren; player.skillButton1
	 * =resPng.xingxuan_pengren_png; player.skill1Effect =effectPengren;
	 * player.skill_2 = skillnameXiongdi; player.skillButton2
	 * =resPng.xingxuan_xiongdi_png; player.skill2Effect =effectXiongdi;
	 * player.skill_3 = "无"; player.lover1 = nameWangpengxu; player.sex = 0;
	 * player.skillUrl=res.skillanimation_xiongdi_plist;
	 * player.skillPng=resPng.skillanimation_xiongdi_png;
	 * player.playerAchievement=initAchivement.achivementXingxuan;
	 * player.mode=MODE.NORMAL; } else if (number == 17) { player._ID = 17;
	 * player._name =nameWangpengxu; player.npcName = player._name;
	 * player.playerPicSrc = resPng.taozi_png; player.playerDeathPicSrc =
	 * resPng.taozideath_png; player.hp = 6; player.combat = 1; player.extent =
	 * 4; player.skill_1 =skillnameTaotie; player.skillButton1 =
	 * resPng.wangpengxu_taotie_png; player.skill1Effect = effectTaotie;
	 * player.skill_2 = skillnameHechengshipin; player.skillButton2
	 * =resPng.wangpengxu_hechengshipin_png; player.skill2Effect
	 * =effectHechengshipin; player.skill_3 = skillnameMingan;
	 * player.skillButton3 =resPng.wangpengxu_mingan_png; player.skill3Effect
	 * =effectMingan; player.lover1 = nameXingxuan; player.sex = 1;
	 * player.skillUrl=res.skillanimation_taotie_plist;
	 * player.skillPng=resPng.skillanimation_taotie_png;
	 * player.playerAchievement=initAchivement.achivementWangpengxu;
	 * player.mode=MODE.NORMAL; } else if (number == 18) { player._ID = 18;
	 * player._name =nameYuntianhe; player.npcName = player._name;
	 * player.playerPicSrc =resPng.tianhe_png; player.playerDeathPicSrc =
	 * resPng.tianhedeath_png; player.hp = 8; player.combat = 2; player.extent =
	 * 6; player.skill_1 =skillnameTianhejian; player.skillButton1 =
	 * resPng.yuntianhe_tianhejian_png; player.skill1Effect = effectTianhejian;
	 * player.skill_2 = skillnameHouyisherigong; player.skillButton2
	 * =resPng.yuntianhe_houyisherigong_png; player.skill2Effect
	 * =effectHouyisherigong; yuntianhe_HouYiSheRiGong = 0; player.skill_3 =
	 * "无"; player.lover1 = nameHanlingsha; player.lover2 = nameLiumengli;
	 * player.sex = 0; player.skillUrl=res.skillanimation_houyisherigong_plist;
	 * player.skillPng=resPng.skillanimation_houyisherigong_png;
	 * player.playerAchievement=initAchivement.achivementYuntianhe;
	 * player.mode=MODE.NORMAL; } else if (number == 19) { player._ID = 19;
	 * player._name =nameHanlingsha; player.npcName =player._name;
	 * player.playerPicSrc = resPng.lingsha_png; player.playerDeathPicSrc =
	 * resPng.lingshadeath_png; player.hp = 7; player.combat = 2; player.extent =
	 * 4; player.skill_1 =skillnameSounangtanbao; player.skillButton1 =
	 * resPng.hanlingsha_sounangtanbao_png; player.skill1Effect =
	 * effectSounangtanbao; player.skill_2 = skillnameJiefujipin;
	 * player.skillButton2 =resPng.hanlingsha_jiefujipin_png;
	 * player.skill2Effect =effectJiefujipin; player.skill_3 = skillnameDaomu;
	 * player.skillButton3 =resPng.hanlingsha_daomu_png; player.skill3Effect
	 * =effectDaomu; player.lover1 = nameYuntianhe; player.sex = 1;
	 * player.skillUrl=res.skillanimation_sounangtanbao_plist;
	 * player.skillPng=resPng.skillanimation_sounangtanbao_png;
	 * player.playerAchievement=initAchivement.achivementHanlingsha;
	 * player.mode=MODE.NORMAL; }else if (number == 20) { player._ID = 20;
	 * player._name =nameLiumengli; player.npcName = player._name;
	 * player.playerPicSrc =resPng.mengli_png; player.playerDeathPicSrc =
	 * resPng.menglideath_png; player.hp = 7; player.combat = 3; player.extent =
	 * 3; player.skill_1 =skillnameYaowang; player.skillButton1
	 * =resPng.liumengli_yaowang_png; player.skill1Effect =effectYaowang;
	 * player.skill_2 = skillnameMengkuilei; player.skillButton2
	 * =resPng.liumengli_mengkuilei_png; player.skill2Effect =effectMengkuilei;
	 * player.skill_3 = "无"; player.lover1 = nameYuntianhe; player.sex = 1;
	 * player.skillUrl=res.skillanimation_mengkuilei_plist;
	 * player.skillPng=resPng.skillanimation_mengkuilei_png;
	 * player.playerAchievement=initAchivement.achivementLiumengli;
	 * player.mode=MODE.NORMAL; } else if (number == 21) { player._ID = 21;
	 * player._name =nameMurongziying; player.npcName = player._name;
	 * player.playerPicSrc =resPng.ziying_png; player.playerDeathPicSrc =
	 * resPng.ziyingdeath_png; player.hp = 7; player.combat = 4; player.extent =
	 * 1; player.skill_1 =skillnameZengjian; player.skillButton1 =
	 * resPng.murongziying_zengjian_png; player.skill1Effect =effectZengjian;
	 * player.skill_2 = skillnameJianxia; player.skillButton2
	 * =resPng.murongziying_jianjia_png; player.skill2Effect =effectJianxia;
	 * player.skill_3 = "无"; player.lover1 = "任意指定一人"; player.sex = 0;
	 * player.skillUrl=res.skillanimation_zengjian_plist;
	 * player.skillPng=resPng.skillanimation_zengjian_png;
	 * player.playerAchievement=initAchivement.achivementMurongziying;
	 * player.mode=MODE.NORMAL; } else if (number == 22) { player._ID = 22;
	 * player._name =nameXuanxiao; player.npcName =player._name;
	 * player.playerPicSrc = resPng.xuanxiao_png; player.playerDeathPicSrc
	 * =resPng.xuanxiaodeath_png; player.hp = 6; player.combat = 5;
	 * player.extent = 2; player.skill_1 =skillnameNingbingfenyan;
	 * player.skillButton1 = resPng.xuanxiao_ningbingfenyan_png;
	 * player.skill1Effect =effectNingbingfenyan; player.skill_2 =
	 * skillnameJiebai; player.skillButton2 =resPng.xuanxiao_jiebai_png;
	 * player.skill2Effect =effectJiebai; player.skill_3 = "无"; player.lover1 =
	 * "夙玉"; player.sex = 0;
	 * player.skillUrl=res.skillanimation_ningbingfenyan_plist;
	 * player.skillPng=resPng.skillanimation_ningbingfenyan_png;
	 * player.playerAchievement=initAchivement.achivementXuanxiao;
	 * player.mode=MODE.NORMAL; }else if (number == 23) { player._ID = 23;
	 * player._name =nameLongyou; player.npcName =player._name;
	 * player.playerPicSrc = resPng.longyou_png; player.playerDeathPicSrc =
	 * resPng.longyoudeath_png; player.hp = 6; player.combat = 2; player.extent =
	 * 5; player.skill_1 =skillnameYuexingzhishu; player.skillButton1 =
	 * resPng.longyou_yuexingzhishu_png; player.skill1Effect =
	 * effectYuexingzhishu; player.skill_2 = skillnameBiaoxianyu;
	 * player.skillButton2 =resPng.longyou_biaoxianyu_png; player.skill2Effect
	 * =effectBiaoxianyu; player.skill_3 = "无"; player.lover1 = nameXiaoman;
	 * player.sex = 0; player.skillUrl=res.skillanimation_yuexingzhishu_plist;
	 * player.skillPng=resPng.skillanimation_yuexingzhishu_png;
	 * player.playerAchievement=initAchivement.achivementLongyou;
	 * player.mode=MODE.NORMAL; }else if (number == 24) { player._ID = 24;
	 * player._name =nameXiaoman; player.npcName =player._name;
	 * player.playerPicSrc = resPng.xiaoman_png; player.playerDeathPicSrc =
	 * resPng.xiaomandeath_png; player.hp = 7; player.combat = 1; player.extent =
	 * 4; player.skill_1 =skillnameWufawutian; player.skillButton1 =
	 * resPng.xiaoman_wufawutian_png; player.skill1Effect =effectWufawutian;
	 * player.skill_2 = skillnameHuoli; player.skillButton2
	 * =resPng.xiaoman_huoli_png; player.skill2Effect =effectHuoli;
	 * player.skill_3 = skillnameLianyao; player.skillButton3
	 * =resPng.xiaoman_lianyao_png; player.skill3Effect =effectLianyao;
	 * player.lover1 = nameLongyou; player.sex = 1;
	 * player.skillUrl=res.skillanimation_wufawutian_plist;
	 * player.skillPng=resPng.skillanimation_wufawutian_png;
	 * player.playerAchievement=initAchivement.achivementXiaoman;
	 * player.mode=MODE.NORMAL; }else if (number == 25) { player._ID = 25;
	 * player._name =nameMozun; player.npcName =nameKonglin; player.playerPicSrc =
	 * resPng.mozun_png; player.playerDeathPicSrc =resPng.mozundeath_png;
	 * player.hp = 5; player.combat = 8; player.extent = 2; player.skill_1 =
	 * skillnameXushidaifa; player.skillButton1 =resPng.mozun_xushidaifa_png;
	 * player.skill1Effect =effectXushidaifa; player.skill_2 =
	 * skillnameBenghuai; player.skillButton2 =resPng.mozun_benghuai_png;
	 * player.skill2Effect =effectBenghuai; player.skill_3 = "无"; player.lover1 =
	 * "无"; player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementMozun;
	 * player.mode=MODE.NORMAL; } else if (number == 26) { player._ID = 26;
	 * player._name =nameZhaolingerMengshe; player.npcName =nameZhaolinger;
	 * player.playerPicSrc = resPng.mengshe_png; player.playerDeathPicSrc
	 * =resPng.mengshedeath_png; player.hp = 7; player.combat = 4; player.extent =
	 * 5; player.skill_1 = skillnameShuangjian; player.skillButton1
	 * =resPng.zhaolinger_shuangjian_png; player.skill1Effect =effectShuangjian;
	 * player.skill_2 = skillnameNvwa; player.skillButton2
	 * =resPng.mengshe_nvwa_png; player.skill2Effect =effectNvwa; player.skill_3 =
	 * skillnameBianshen; player.skillButton3 =resPng.mengshe_bianshen_png;
	 * player.skill3Effect =effectBianshen; player.lover1 =nameLixiaoyao;
	 * player.sex = 1; player.skillUrl=res.skillanimation_nvwa_plist;
	 * player.skillPng=resPng.skillanimation_nvwa_png;
	 * player.playerAchievement=initAchivement.achivementZhaolingerMengshe;
	 * player.mode=MODE.NORMAL; } else if (number == 27) { player._ID = 27;
	 * player._name = nameJiangyunfan; player.npcName = player._name;
	 * player.playerPicSrc = resPng.jiangyunfan_png; player.playerDeathPicSrc =
	 * resPng.jiangyunfandeath_png; player.hp = 8; player.combat = 3;
	 * player.extent = 3; player.skill_1 =skillnameKuanglongxunyingzhan;
	 * player.skillButton1 =resPng.jiangyunfan_kuanglongxunyingzhan_png;
	 * player.skill1Effect =effectKuanglongxunyingzhan; player.skill_2 =
	 * skillnameShanzei; player.skillButton2 =resPng.jiangyunfan_shanzei_png;
	 * player.skill2Effect =effectShanzei; player.skill_3 = "无"; player.lover1
	 * =nameTangyurou; player.sex=0;
	 * player.skillUrl=res.skillanimation_kuanglongxunyingzhan_plist;
	 * player.skillPng=resPng.skillanimation_kuanglongxunyingzhan_png;
	 * player.playerAchievement=initAchivement.achivementJiangyunfan;
	 * player.mode=MODE.EXTEND1; }else if (number == 28) { player._ID = 28;
	 * player._name =nameTangyurou; player.npcName =player._name;
	 * player.playerPicSrc = resPng.tangyurou_png; player.playerDeathPicSrc =
	 * resPng.tangyuroudeath_png; player.hp = 7; player.combat = 4;
	 * player.extent = 2; player.skill_1 =skillnameYongshengdiao;
	 * player.skillButton1 = resPng.tangyurou_yongshengdiao_png;
	 * player.skill1Effect = effectYongshengdiao; player.skill_2 =
	 * skillnameNitianzhen; player.skillButton2
	 * =resPng.tangyurou_nitianzhen_png; player.skill2Effect =effectNitianzhen;
	 * player.skill_3 = "无"; player.lover1 =nameJiangyunfan; player.sex = 1;
	 * player.skillUrl=res.skillanimation_nitianzhen_plist;
	 * player.skillPng=resPng.skillanimation_nitianzhen_png;
	 * player.playerAchievement=initAchivement.achivementTangyurou;
	 * player.mode=MODE.EXTEND1; }else if (number == 29) { player._ID = 29;
	 * player._name = nameOuyanghui; player.npcName = player._name;
	 * player.playerPicSrc =resPng.ouyanghui_png; player.playerDeathPicSrc
	 * =resPng.ouyanghuideath_png; player.hp = 5; player.combat = 4;
	 * player.extent = 2; player.skill_1 =skillnameLeiling; player.skillButton1
	 * =resPng.ouyanghui_leiling_png; player.skill1Effect =effectLeiling;
	 * player.skill_2 = skillnameLeiping; player.skillButton2
	 * =resPng.ouyanghui_leiping_png; player.skill2Effect =effectLeiping;
	 * player.skill_3 =skillnameLitianji; player.skillButton3
	 * =resPng.ouyanghui_litianji_png; player.skill3Effect =effectLitianji;
	 * player.lover1 = "无"; player.sex = 1;
	 * player.skillUrl=res.skillanimation_litianji_plist;
	 * player.skillPng=resPng.skillanimation_litianji_png;
	 * player.playerAchievement=initAchivement.achivementOuyanghui;
	 * player.mode=MODE.EXTEND1; }else if (number == 30){ player._ID = 30;
	 * player._name =nameJiangshili; player.npcName = player._name;
	 * player.playerPicSrc =resPng.jiangshili_png; player.playerDeathPicSrc
	 * =resPng.jiangshilideath_png; player.hp = 6; player.combat = 6;
	 * player.extent = 0; player.skill_1 = skillnameMojun; player.skillButton1
	 * =resPng.jiangshili_mojun_png; player.skill1Effect =effectMojun;
	 * player.skill_2 = skillnameXishen; player.skillButton2
	 * =resPng.jiangshili_xisheng_png; player.skill2Effect =effectXishen;
	 * player.skill_3 = "无"; player.lover1 = "欧阳倩"; player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementJiangshili;
	 * player.mode=MODE.EXTEND1; }else if (number == 31){ player._ID = 31;
	 * player._name = nameMoyi; player.npcName = player._name;
	 * player.playerPicSrc = resPng.moyi_png; player.playerDeathPicSrc =
	 * resPng.moyideath_png; player.hp = 10; player.combat = 3; player.extent =
	 * 3; player.skill_1 =skillnameSuohun; player.skillButton1 =
	 * resPng.moyi_suohun_png; player.skill1Effect =effectSuohun; player.skill_2 =
	 * skillnameDipai; player.skillButton2 = resPng.moyi_dipai_png;
	 * player.skill2Effect = effectDepai; player.skill_3 = "无"; player.lover1 =
	 * "无"; player.sex = 0; player.skillUrl=res.skillanimation_dipai_plist;
	 * player.skillPng=resPng.skillanimation_dipai_png;
	 * player.playerAchievement=initAchivement.achivementMoyi;
	 * player.mode=MODE.EXTEND1; } else if (number == 32) { player._ID = 32;
	 * player._name = nameYanshiqionbing; player.npcName = player._name;
	 * player.playerPicSrc =resPng.yanshiqiongbin_png; player.playerDeathPicSrc =
	 * resPng.yanshiqiongbindeath_png; player.hp =6; player.combat = 6;
	 * player.extent = 6; player.skill_1 =skillnameQinlueruhuo;
	 * player.skillButton1 =resPng.yanshiqionbing_qinlueruhuo_png;
	 * player.skill1Effect =effectQinlueruhuo; player.skill_2 =
	 * skillnameHuitianmiedi; player.skillButton2
	 * =resPng.yanshiqionbing_huitianmiedi_png; player.skill2Effect
	 * =effectHuitianmiedi; player.skill_3 = "无"; player.lover1 = "无";
	 * player.sex = 0;
	 * player.playerAchievement=initAchivement.achivementYanshiqiongbing;
	 * player.mode=MODE.EXTEND1; }else if (number == 33) { player._ID =33;
	 * player._name = nameLongkui; player.npcName = player._name;
	 * player.playerPicSrc =resPng.longkui_png; player.playerDeathPicSrc
	 * =resPng.longkuideath_png; player.hp = 6; player.combat = 2; player.extent =
	 * 5; player.skill_1 = skillnameLongkuiBianshen; player.skillButton1
	 * =resPng.mengshe_bianshen_png; player.skill1Effect =effectLongkuiBianshen;
	 * player.skill_2 = skillnameRongzhu; player.skillButton2
	 * =resPng.longkui_rongzhu_png; player.skill2Effect =effectRongzhu;
	 * player.skill_3 = skillnameJianling; player.skillButton3
	 * =resPng.longkui_jianling_png; player.skill3Effect =effectJianling;
	 * player.lover1 = "景天"; player.sex = 1;
	 * player.skillUrl=res.skillanimation_jianling_plist;
	 * player.skillPng=resPng.skillanimation_jianling_png;
	 * player.playerAchievement=initAchivement.achivementLongkui;
	 * player.mode=MODE.EXTEND1; } else if (number == 34) { player._ID = 34;
	 * player._name =nameLongkuigui; player.npcName = player._name;
	 * player.playerPicSrc =resPng.longkuigui_png; player.playerDeathPicSrc
	 * =resPng.longkuiguideath_png; player.hp = 6; player.combat = 5;
	 * player.extent = 1; player.skill_1 = skillnameLongkuiguiBianshen;
	 * player.skillButton1 =resPng.mengshe_bianshen_png; player.skill1Effect
	 * =effectLongkuiguiBianshen; player.skill_2 = skillnameKongjian;
	 * player.skillButton2 =resPng.longkuigui_kongjian_png; player.skill2Effect
	 * =effectkongjian; player.skill_3 = skillnameJianhun; player.skillButton3
	 * =resPng.longkuigui_jianhun_png; player.skill3Effect =effectJianhun;
	 * player.lover1 = "景天"; player.sex = 1;
	 * player.skillUrl=res.skillanimation_jianhun_plist;
	 * player.skillPng=resPng.skillanimation_jianhun_png;
	 * player.playerAchievement=initAchivement.achivementLongkuigui;
	 * player.mode=MODE.EXTEND1; }else if (number == 35) { player._ID = 35;
	 * player._name = nameJingtianSp; player.npcName = player._name;
	 * player.playerPicSrc =resPng.jingtiansp_png player.playerDeathPicSrc
	 * =resPng.jingtianspdeath_png; player.hp = 7; player.combat = 4;
	 * player.extent = 3; player.skill_1 = skillnameJianbao; player.skillButton1
	 * =resPng.jingtiansp_jianbao_png; player.skill1Effect =effectJianbao;
	 * player.skill_2 = skillnameTaojiahuanjia; player.skillButton2
	 * =resPng.jingtiansp_taojiahuanjia_png; player.skill2Effect
	 * =effectTaojiahuanjia; player.skill_3 = "无"; player.lover1 =
	 * nameTangxuejian; player.lover2 =nameLongkui; player.lover3
	 * =nameLongkuigui; player.lover4 =nameChonglou; player.sex = 0;
	 * player.playerAchievement = initAchivement.achivementJingtianSp;
	 * player.mode=MODE.SPECIAL; }else if (number == 36) { player._ID =36;
	 * player._name = nameTangyurouSp; player.npcName = player._name;
	 * player.playerPicSrc = resPng.tangyurousp_png; player.playerDeathPicSrc =
	 * resPng.tangyurouspdeath_png; player.hp =6; player.combat = 3;
	 * player.extent = 3; player.skill_1 =skillnameRumengdiao;
	 * player.skillButton1 = resPng.tangyurousp_rumengdiao_png;
	 * player.skill1Effect = effectRumengdiao; player.skill_2 =
	 * skillnameYushang; player.skillButton2 =resPng.tangyurousp_yushang_png;
	 * player.skill2Effect =effectYushang; player.skill_3 = "无"; player.lover1 =
	 * nameJiangyunfan; player.sex = 1;
	 * player.skillUrl=res.skillanimation_rumengdiao_plist;
	 * player.skillPng=resPng.skillanimation_rumengdiao_png;
	 * player.mode=MODE.SPECIAL; } else if (number == 38) { player._ID = 38;
	 * player._name =nameLongyouSp; player.npcName =player._name;
	 * player.playerPicSrc =resPng.longyousp_png; player.playerDeathPicSrc =
	 * resPng.longyouspdeath_png; player.hp = 7; player.combat = 5;
	 * player.extent = 1; player.skill_1 =skillnameZhencha; player.skillButton1 =
	 * resPng.longyousp_zhencha_png; player.skill1Effect = effectZhencha;
	 * 
	 * player.skill_2 = skillnameYaoqiang; player.skillButton2
	 * =resPng.longyousp_yaoqiang_png; player.skill2Effect =effectYaoqiang;
	 * 
	 * player.skill_3 = "无"; player.lover1 =nameXiaoman; player.sex = 0;
	 * player.mode=MODE.SPECIAL; } else if (number == 39) { player._ID = 39;
	 * player._name =nameXiaomanSp; player.npcName =player._name;
	 * player.playerPicSrc = resPng.xiaomansp_png; player.playerDeathPicSrc =
	 * resPng.xiaomanspdeth_png; player.hp = 8; player.combat = 3; player.extent =
	 * 4; player.skill_1 =skillnameDuerdeliwu; player.skillButton1 =
	 * resPng.xiaomansp_duerdeliwu_png; player.skill1Effect = effectDuerdeliwu;
	 * 
	 * player.skill_2 = skillnameJuexing; player.skillButton2
	 * =resPng.xiaomansp_juexing_png; player.skill2Effect =effectJuexing;
	 * 
	 * player.skill_3 = "无";
	 * 
	 * player.lover1 =nameLongyou; player.sex = 1; player.mode=MODE.SPECIAL;
	 * }else if (number == 40) { player._ID = 40; player._name =
	 * nameJiangyunfanSp player.npcName = player._name; player.playerPicSrc =
	 * resPng.jiangyunfansp_png; player.playerDeathPicSrc =
	 * resPng.jiangyunfanspdeath_png; player.hp =9; player.combat = 4;
	 * player.extent = 3; player.skill_1 =skillnameKuangfengzhai;
	 * player.skillButton1 =resPng.jiangyunfansp_kuangfengzhai_png;
	 * player.skill1Effect =effectKuangfengzhai; player.skill_2 =skillnameFuai;
	 * player.skillButton2 =resPng.jiangyunfansp_fuai_png; player.skill2Effect
	 * =effectFuai;
	 * 
	 * player.skill_3 = "无";
	 * 
	 * player.lover1 = nameTangyurou; player.sex = 0; player.mode=MODE.SPECIAL;
	 * }else if(number==42){ player._ID =42; player._name = nameChonglouSp;
	 * player.npcName = player._name; player.playerPicSrc =
	 * resPng.chonglousp_png; player.playerDeathPicSrc =
	 * resPng.chonglouspdeath_png; player.hp =12; player.combat = 5;
	 * player.extent = 1; player.skill_1 =skillnameBaqi; player.skillButton1 =
	 * resPng.chonglousp_baqi_png; player.skill1Effect = effectBaqi;
	 * player.skill_2 = skillnameWangzhe; player.skillButton2
	 * =resPng.chonglousp_wangzhe_png; player.skill2Effect =effectWangzhe;
	 * player.skill_3 = "无"; player.sex = 0; player.mode=MODE.SPECIAL; }else
	 * if(number==43){ player._ID =43; player._name = nameLinyueruSp;
	 * player.npcName = player._name; player.playerPicSrc =
	 * resPng.linyuerusp_png; player.playerDeathPicSrc =
	 * resPng.linyueruspdeath_png; player.hp =10; player.combat = 2;
	 * player.extent = 5; player.skill_1 =skillnameBiwuzhaoqin;
	 * player.skillButton1 = resPng.linyuerusp_biwuzhaoqin_png;
	 * player.skill1Effect = effectBiwuzhaoqin; player.skill_2 =
	 * skillnameDiaoman; player.skillButton2 =resPng.linyuerusp_diaoman_png;
	 * player.skill2Effect =effectDiaoman; player.skill_3 = "无"; player.sex = 1;
	 * player.mode=MODE.SPECIAL; }else if(number==44){ player._ID =44;
	 * player._name = nameZhaolingerSp; player.npcName = player._name;
	 * player.playerPicSrc = resPng.zhaolingersp_png; player.playerDeathPicSrc =
	 * resPng.zhaolingerspdeath_png; player.hp =6; player.combat = 3;
	 * player.extent = 4; player.skill_1 =skillnameHuihunxinameng;
	 * player.skillButton1 = resPng.zhaolingersp_huihunxianmeng;
	 * player.skill1Effect = effectHuihunxianmeng; player.skill_2 =
	 * skillnameShengling; player.skillButton2 =resPng.zhaolingersp_shengling;
	 * player.skill2Effect =effectShengling; player.skill_3 = "无"; player.lover1 =
	 * nameLixiaoyao; player.sex = 1;
	 * player.skillUrl=res.skillanimation_huihunxianmeng_plist;
	 * player.skillPng=resPng.skillanimation_huihunxianmeng_png;
	 * player.mode=MODE.SPECIAL; }
	 */
	player.skillNameList=new Array();
	if (player.skill_1!=""&&player.skill_1!=Text.nil) {
		player.skillNameList.push(player.skill_1);
	}
	if (player.skill_2!=""&&player.skill_2!=Text.nil) {
		player.skillNameList.push(player.skill_2);
	}
	if (player.skill_3!=""&&player.skill_3!=Text.nil) {
		player.skillNameList.push(player.skill_3);
	}
		 
	player.maxHP = player.hp;
	player.maxCombat = player.combat;
	player.maxExtent = player.extent;
	player.tempAddCombat = 0;
	player.skillAddCombat = 0;
	player.tempAddExtent = 0;
	player.skillAddExtent = 0;
	player.isDeath=false;
	player.tempZhuangbeiSkillCombat = 0;
	player.tempZhuangbeiSkillExtent = 0;
}