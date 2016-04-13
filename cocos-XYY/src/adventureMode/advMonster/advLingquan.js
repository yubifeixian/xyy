var AdvLingquan=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameLingquan;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = Text.lingquanEffectText;//翻出效果
		this.winEffectText = Text.lingquanEffect2Text;//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.lingquan_png;
		this.level = Text.crisis;
	},
	openEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			boss.lingquanList.push(this);
			boss.maxCombat+=2;
			monsterCombat += 2;
			if(callBack!=null){
				callBack();
			}
		},callBack);
	},
	winEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			var number=parseInt(Math.random()*6, 10)+1;
			textAreaAddMessage(Text.bossDice.format(number,number), myText, listView, function(){
				monsterCombat+=number;
				if(callBack!=null){
					callBack();
				}
			});
		},callBack);
	}
})