function createHandCardImageView(name,cardID,cardSrcID,
		cardType, cardMessage){
	var tempHandCardImageView=handCardExample.clone();
	tempHandCardImageView.name=name;
	tempHandCardImageView.clicked=false;
	tempHandCardImageView.cardID=cardID;
	tempHandCardImageView.cardSrcID=cardSrcID;
	tempHandCardImageView.cardType=cardType;
	tempHandCardImageView.cardMessage=cardMessage;
	if(cardSrcID!=null){
		tempHandCardImageView.loadTexture(cardSrcID);
	}
	tempHandCardImageView.setOpacity(200);
	tempHandCardImageView.addTouchEventListener(function(sender,type){
		if(type==0){
			this.scheduleOnce(function(){
				mainScene.addChild(new messageDialogLayer(this.cardMessage));
			},1);
		}else if(type==2){
		
			//tempHandCardImageView.unschedule(longClickFunction);
			this.unscheduleAllCallbacks();
			if((nextStep==2&&nowPlayerTerm[nowPlayerNumber]._name==player1._name)||
					nextStep==3||nextStep==4||(nextStep == 8 && dropCarding)){
				tempHandCardImageView.clicked=!tempHandCardImageView.clicked;
				if(tempHandCardImageView.clicked){
					for(var i=0;i<player1.handCard.length;i++){
						player1.handCard[i].clicked=false;
						player1.handCard[i].setOpacity(200);
						player1.handCard[i].y=90;
					}
					tempHandCardImageView.clicked=true;
					selectHandCard=tempHandCardImageView;
					tempHandCardImageView.setOpacity(255);
					tempHandCardImageView.y+=30;
					if (isBusiness) {
						buttonManager(order1Button, true, true);
					}else{
						if (nextStep == 2) {
							if (skillButton_DropCardEffect) {
								if (skill2Useing&& player1.skill_2==skillnameYuanlingguixinshu) {
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
											if (nowPlayerTerm[index]._name!=player1._name) {
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
						} else if (nextStep == 3||nextStep==4) {
							if (skillButton_DropCardEffect) {
								if (player1._name==nameShenqishuang) {
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
										|| player1.usedAttackCard
										|| NPCEffect) {
									buttonManager(order1Button, false, false);
								} else {
									buttonManager(order1Button, true, true);
								}
							}
						}else if ((nextStep == 8 && dropCarding)) {
							buttonManager(order1Button, true, true);
						}	
					}
				}else{
					selectHandCard=null;
					tempHandCardImageView.setOpacity(200);
					tempHandCardImageView.y=90;
				}
			}
		}
	}, tempHandCardImageView);
	tempHandCardImageView.retain();
	return tempHandCardImageView;
}