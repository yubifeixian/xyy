var AdvHuayaoshui=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameHuayaoshui;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.huayaoshuiEffectText;//翻出效果
		this.winEffectText = Text.huayaoshuiEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.huayaoshui_png;
		this.level = Text.crisis;
	},
	chooseEffect:function(restCombat,callBack){
		var temp=this;
		restCombat=restCombat<0?0:restCombat;
		var canCancel=restCombat<=0?true:false;
		if(baseEffectCountPets(player1)+baseEffectCountPets(player2)+baseEffectCountPets(player3)>0){
			var player1Shown=baseEffectCountPets(player1)>0?true:false;
			var player2Shown=baseEffectCountPets(player2)>0?true:false;
			var player3Shown=baseEffectCountPets(player3)>0?true:false;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, false,
					Text.chooseHuayaoshuiPet.format(restCombat), canCancel, false,function(resultPlayer){
				var selectPlayer=resultPlayer;
				addDialog(mainScene, new selectPetsDialogLayer(Text.chooseHuayaoshuiPet.format(restCombat),selectPlayer,function(pet){
					textAreaAddMessage(Text.perishPet.format(temp.name,selectPlayer._name,pet.name), myText, listView);
					perishPet(pet.nature,selectPlayer);
					restCombat-=pet.combat;
					temp.chooseEffect(restCombat, callBack);
				}));
				
			}));
		}else if(callBack!=null){
			callBack();
		}
	},
	openEffect:function(callBack){
		var temp=this;
		askHuanmeihuazhou(player1,function(){
			textAreaAddMessage(temp.openEffectText, myText, listView,function(){
				temp.chooseEffect(8,callBack);
			});
		},callBack);
	},
	winEffect:function(callBack){
		huayaoshuiMark=true;
		textAreaAddMessage(this.winEffectText, myText, listView,callBack);
	}
})