var AdvJushentiantu=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameJushentiantu;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.jushentiantuEffectText;//翻出效果
		this.winEffectText = Text.jushentiantuEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.jushentiantu_png;
		this.level = Text.crisis;
	},
	executePetLostEffect:function(petList,index,player,callBack){
		var temp=this;
		if(petList.length<=0){
			if(player._name!=player3._name){
				temp.jushentiantuEffect(player.friendList[1], callBack);
			}else if(nowPlayerTerm[nowPlayerNumber].hp<=0){
				//触发者阵亡，结束当前打怪
				nextStep=7;
				buttonManager(order2Button, true, true);
			}else if(callBack!=null){
				callBack();
			}
		}else{
			petList[index].loseEffect(function(){
				index++;
				if(player.hp<=0||index>=petList.length){
					if(player._name!=player3._name){
						temp.jushentiantuEffect(player.friendList[1], callBack);
					}else if(callBack!=null){
						if(nowPlayerTerm[nowPlayerNumber].hp>0){
							callBack();
						}else{
							//触发者阵亡，结束当前打怪
							nextStep=7;
							buttonManager(order2Button, true, true);
						}
					}
				}else{
					temp.executePetLostEffect(petList, index, player, callBack);
				}
			});
		}
	},
	jushentiantuEffect:function(player,callBack){
		var temp=this;
		if(baseEffectCountPets(player)>0){
			var petsUidList=[];
			var petsList=[];
			if(player.pet_FengMonster!=null){
				petsList.push(player.pet_FengMonster);
				petsUidList.push(player.pet_FengMonster.uid);
			}
			if(player.pet_LeiMonster!=null){
				petsList.push(player.pet_LeiMonster);
				petsUidList.push(player.pet_LeiMonster.uid);
			}
			if(player.pet_ShuiMonster!=null){
				petsList.push(player.pet_ShuiMonster);
				petsUidList.push(player.pet_ShuiMonster.uid);
			}
			if(player.pet_HuoMonster!=null){
				petsList.push(player.pet_HuoMonster);
				petsUidList.push(player.pet_HuoMonster.uid);
			}
			if(player.pet_TuMonster!=null){
				petsList.push(player.pet_TuMonster);
				petsUidList.push(player.pet_TuMonster.uid);
			}
			addDialog(mainScene, new ChooseOrDropMonsterDialogLayer(Text.chooseJushentiantuEffect,petsUidList,function(selectList){
				var tempList=[];
				for(var i=0;i<petsList.length;i++){
					var isSame=false;
					for(var h=0;h<selectList.length;h++){
						if(petsList[i].name==selectList[h].name){
							isSame=true;
							break;
						}
					}
					if(!isSame){
						tempList.push(petsList[i]);
					}
				}
				for(var i=0;i<tempList.length;i++){
					textAreaAddMessage(Text.dropPet.format(player._name,tempList[i].name), myText, listView);
					perishPet(tempList[i].nature,player);
				}
				//按顺序执行选择的宠物的失败效果
				temp.executePetLostEffect(selectList,0,player,callBack);
			}));
		}else{
			if(player._name!=player3._name){
				temp.jushentiantuEffect(player.friendList[1], callBack);
			}else if(nowPlayerTerm[nowPlayerNumber].hp<=0){
				//触发者阵亡，结束当前打怪
				nextStep=7;
				buttonManager(order2Button, true, true);
			}else if(callBack!=null){
				callBack();
			}
		}
	},
	
	
	openEffect:function(callBack){
		var temp=this;
		askHuanmeihuazhou(player1, function(){
			temp.jushentiantuEffect(player1,callBack);
		}, callBack);
	},
	winEffect:function(callBack){
		var temp=this;
		askHuanmeihuazhou(player1, function(){
			jushentiantuMark=true;
			textAreaAddMessage(temp.winEffectText, myText, listView, callBack);
		}, callBack);
	}
})