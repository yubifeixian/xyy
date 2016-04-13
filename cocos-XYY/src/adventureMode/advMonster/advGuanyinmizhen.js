var AdvGuanyinmizhen=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameGuanyinmizhen;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.guanyinmizhenEffectText;//翻出效果
		this.winEffectText = this.openEffectText;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.guanyinmizhen_png;
		this.level = Text.crisis;
	},
	openEffect:function(callBack){
		askHuanmeihuazhou(player1, function(){
			addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, false,
					Text.chooseGuanyinmizhen, false, false,function(selectPlayer){
				guanyinmizhenList.push(selectPlayer);
				if(callBack!=null){
					callBack();
				}
			}));
		}, callBack);
	},
	winEffect:function(callBack){
		this.openEffect(callBack);
	}
})