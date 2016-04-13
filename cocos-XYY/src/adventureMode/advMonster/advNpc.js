var AdvNpc=AdvBaseMonster.extend({
	ctor:function(name,id,combat,winEffectText,loseEffectText,lover1,lover2,lover3,lover4,monsterPicSrc,uid){
		this._super(uid);
		this.name=name;
		this.ID=id;
		this.combat=combat;
		this.dodge=0;
		this.winEffectText=winEffectText;
		this.loseEffectText=loseEffectText;
		this.lover1=lover1;
		this.lover2=lover2;
		this.lover3=lover3;
		this.lover4=lover4;
		this.monsterPicSrc=monsterPicSrc;
	}
})