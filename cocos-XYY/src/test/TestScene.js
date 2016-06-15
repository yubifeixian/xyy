var TestLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		cc.log("test");
		var testNumber=100000;
		for(var i=0;i<testNumber;i++){
			this.getMonster();
			fight_FirstMonster=topMonsterCard(game_MonsterDeck[0]);
			//cc.log(fight_FirstMonster.name);
			game_MonsterDropDeck=[];
			game_MonsterDropDeck.push(game_MonsterDeck[0]);
			game_MonsterDeck.shift();
			monsterLabel=new ccui.ImageView();
			monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc,ccui.Widget.LOCAL_TEXTURE);
		}
		cc.log("over");
	},
	getMonster:function(){
		game_MonsterDeck = new Array();
		game_MonsterDeck = initMonsterDeck();
		//game_MonsterDeck=addCrisisCard(game_MonsterDeck,[46,47]);
	}
})


var TestScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		this.addChild(new TestLayer());
	}
})