function getCharacterList() {
	var characterList=[];
	var standerCharacterList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
			14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
	var fengmingyushiCharacterList=[ 27, 28, 29, 30, 31, 33];
	var wulingfeixianCharacterList=[45,46];

	for(var i=0;i<standerCharacterList.length;i++){
		characterList.push(standerCharacterList[i]);
	}
	if(true){
		for(var i=0;i<fengmingyushiCharacterList.length;i++){
			characterList.push(fengmingyushiCharacterList[i]);
		}
	}
	//处理sp角色
	if(spSwitch=="true"){
		//cc.log("已开启sp角色，替换原版角色");
		//处理【景天sp】
		if(initSpecialAchivement.achivementLunhui.progress==initSpecialAchivement.achivementLunhui.maxProgress){
			characterList.push(35);
		}
		//处理【唐雨柔sp】
		if(initSpecialAchivement.achivementXianquRumengdiao.progress==initSpecialAchivement.achivementXianquRumengdiao.maxProgress){
			characterList.removeObject(28);
			characterList.push(36);
			cc.log(characterList);
		}
		//处理【重楼sp】
		characterList.removeObject(13);
		characterList.push(42);
		
		//处理【龙幽sp】
		characterList.removeObject(23);
		characterList.push(38);
		
		//处理【姜云凡sp】
		characterList.removeObject(27);
		characterList.push(40);

		//处理【小蛮sp】
		characterList.removeObject(24);
		characterList.push(39);
		
		//处理【林月如sp】
		characterList.removeObject(3);
		characterList.push(43);

		//处理【赵灵儿sp】
		characterList.removeObject(2);
		characterList.push(44);

		//处理【徐长卿】
		characterList.push(45);
		//处理【景天】
		//characterList.push(46);
		
	}
	characterList.sort(function(){ return 0.5 - Math.random() }) ;
	return characterList;
}