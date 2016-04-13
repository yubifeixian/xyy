var AdvBaseMonster=cc.Class.extend({
	name:null,
	uid:null,//在怪物牌堆中对应的编号
	ID:null,
	combat : null,
	dodge : null,
	finalMark : null,
	openEffectText : null,
	winEffectText: null,
	loseEffectText : null,
	petEffectText : null,
	nature :null,
	lover1 : null,
	lover2 : null,
	lover3 :null,
	lover4 : null,
	monsterPicSrc :null,
	level :null,
	ctor:function(uid){
		this.uid=uid;
	},
	//怪物本身的出场效果
	realOpenEffect:function(callBack){
		textAreaAddMessage(Text.monsterNoOpenEffect, myText, listView,callBack);
	},
	//怪物本身的胜利结算
	realWinEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterWinEffect.format(this.name,this.winEffectText), myText, listView,callBack);
	},
	//怪物本身的失败结算
	realLoseEffect:function(callBack){
		textAreaAddMessage(Text.activeMonsterLoseEffect.format(this.name,this.loseEffectText), myText, listView,callBack);
	},
	//实际进行的出场效果：可能因魔主【镇狱明王】的技能而先执行一个额外的出场效果，再执行
	//怪物原版的出场效果
	openEffect:function(callBack){
		var temp=this;
		if(boss._name==bossNameZhenyumingwang){
			zhenyumingwangSkill(this,function(){
				temp.realOpenEffect(callBack);
			});
		}else{
			temp.realOpenEffect(callBack);
		}
	},
	winEffect:function(callBack){
		var temp=this;
		if(boss._name!=bossNameBaiyuejiaozhu){
			textAreaAddMessage(Text.activeMonsterWinEffect.format(this.name,this.winEffectText), myText, listView,function(){
				temp.realWinEffect(callBack);
			});
		}else{
			textAreaAddMessage(Text.activeMonsterBossBaiyuejiaozhuWinEffect.format(this.loseEffectText), myText, listView, function(){
				temp.realLoseEffect(callBack);
			});
		}
	},
	loseEffect:function(callBack){
		var temp=this;
		if(boss._name!=bossNameBaiyuejiaozhu){
			textAreaAddMessage(Text.activeMonsterLoseEffect.format(this.name,this.loseEffectText), myText, listView);
			textAreaAddMessage(this.loseEffectText, myText, listView,function(){
				temp.realLoseEffect(callBack);
			});
		}else{
			textAreaAddMessage(Text.activeMonsterBossBaiyuejiaozhuLoseEffect.format(this.winEffectText), myText, listView, function(){
				temp.realWinEffect(callBack);
			});
		}
	},
	petEffect:function(player){

	},
	updatePetEffect:function(player){

	}
})