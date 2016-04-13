function createAdvHandCardImageView(name,cardID,cardSrcID,
		cardType, cardMessage,isGropCard){
	var tempHandCardImageView=handCardExample.clone();
	tempHandCardImageView.isGropCard=isGropCard!=null?true:false;
	tempHandCardImageView.name=name;
	tempHandCardImageView.clicked=false;
	tempHandCardImageView.cardID=cardID;
	tempHandCardImageView.cardSrcID=cardSrcID;
	tempHandCardImageView.cardType=cardType;
	tempHandCardImageView.cardMessage=cardMessage;
	if(cardSrcID!=null){
		tempHandCardImageView.loadTexture(cardSrcID);
	}
	tempHandCardImageView.setOpacity(180);
	var longClickFunction=function(){
		mainScene.addChild(new messageDialogLayer(cardMessage));
	};
	tempHandCardImageView.addTouchEventListener(function(sender,type){
		if(type==0){
			this.scheduleOnce(longClickFunction,1);
		}else if(type==1){
			this.unschedule(longClickFunction);
		}else if(type==2){
			this.unschedule(longClickFunction);
			if((nextStep==1&&nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name)||
					nextStep==2||nextStep==3||(nextStep == 7 && dropCarding)){
				tempHandCardImageView.clicked=!tempHandCardImageView.clicked;
				if(tempHandCardImageView.clicked){
					for(var i=0;i<myControlPlayer.handCard.length;i++){
						myControlPlayer.handCard[i].clicked=false;
						myControlPlayer.handCard[i].setOpacity(180);
					}
					tempHandCardImageView.clicked=true;
					selectHandCard=tempHandCardImageView;
					tempHandCardImageView.setOpacity(255);
					if (isBusiness) {
						buttonManager(order1Button, true, true);
					}else{
						if (nextStep == 1) {
							if (skillButton_DropCardEffect) {
								if (skill2Useing&& myControlPlayer.skill_2==skillnameYuanlingguixinshu) {
									if (this.cardType!=CARDTYPE.SKILLCARD) {
										buttonManager(order1Button, false, false);
									} else {
										buttonManager(order1Button, true, true);
									}
								} else {
									buttonManager(order1Button, true, true);
								}
							} else {
								if (this.cardType!=CARDTYPE.SKILLCARD
										&& this.name!=string_handCardNameLinghuxiandan
										&& this.name!=string_handCardNameTianxiangxuminglu
										&& this.name!=string_handCardNameHuanmeihuazhou
										&& this.cardType!=CARDTYPE.ARMCARD
										&& this.cardType!=CARDTYPE.DEFENSECARD) {
									buttonManager(order1Button, false, false);
								} else {
									buttonManager(order1Button, true, true);
									// 判断【偷盗】能否使用
									if (this.name==string_handCardNameToudao) {
										var temp = 0, index = nowPlayerNumber + 1;
										for (var i = 0; i < nowPlayerTerm.length-1;i++){
											index%=nowPlayerTerm.length;
											if (nowPlayerTerm[index]._name!=nowPlayerTerm[nowPlayerNumber]._name){
												if (nowPlayerTerm[index].handCard.length==0){
													temp++;
												}
											}
											index++;
										}
										if (temp == nowPlayerTerm.length - 1){
											buttonManager(order1Button, false, false);
										}
									} else if (this.name==string_handCardNameTongqianbiao) {
										// 判断【铜钱镖】能否使用
										var temp = 0, index = nowPlayerNumber + 1;
										for (var i = 0; i < nowPlayerTerm.length;i++){
											index%=nowPlayerTerm.length;
											if (nowPlayerTerm[index]._name!=myControlPlayer._name) {
												if (nowPlayerTerm[index].handCard.length==0
														&& baseEffectCountequment(nowPlayerTerm[index])==0) {
													temp++;
												}
											}
											index++;
										}
										if (temp == nowPlayerTerm.length - 1)
											buttonManager(order1Button, false, false);
									}
								}
							}
						} else if (nextStep == 2||nextStep==3) {
							if (skillButton_DropCardEffect) {
								if (myControlPlayer._name==nameShenqishuang) {
									if (this.cardType!=CARDTYPE.SKILLCARD) {
										buttonManager(order1Button, false, false);
									} else {
										buttonManager(order1Button, true, true);
									}
								} else {
									buttonManager(order1Button, true, true);
								}
							} else {
								if (!attack_3
										|| this.cardType!=CARDTYPE.FIGHTCARD
										|| myControlPlayer.usedAttackCard
										|| NPCEffect) {
									buttonManager(order1Button, false, false);
								} else {
									if(this.name==string_handCardNameXiukoujinxinzhou&&fight_SecondMonster!=null){
										buttonManager(order1Button, false, false);
									}else if(this.name==string_handCardNameJinchantuoqiao&&muhoudeyinmouMark){
										buttonManager(order1Button, false, false);
									}else{
										buttonManager(order1Button, true, true);
									}
								}
							}
						}else if ((nextStep == 7 && dropCarding)) {
							buttonManager(order1Button, true, true);
						}	
					}
				}else{
					selectHandCard=null;
					tempHandCardImageView.setOpacity(200);
				}
			}
		}
	}, tempHandCardImageView);
	tempHandCardImageView.retain();
	return tempHandCardImageView;
}