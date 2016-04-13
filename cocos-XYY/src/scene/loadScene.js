var LoadLayer=cc.Layer.extend({
	_progressBar:null,
	_percent:0,
	_message:null,
	ctor:function(player){
		this._super();
		player1=player;
		this._percent=0;
		this.init();
		this.scheduleOnce(this.loadAnimation);
		this.scheduleUpdate();
	},
	init:function(){
		var updateLayer=ccs.load(res.UpdateLayer_json);
		this._progressBar=ccui.helper.seekWidgetByName(updateLayer.node, "LoadingBar");
		this._message=ccui.helper.seekWidgetByName(updateLayer.node, "message");
		//this._message.setTextAreaSize(cc.size(400, 10));
		this._message.ignoreContentAdaptWithSize(false);
		this._message.setString("正在加载资源(0/4)");
		this.addChild(updateLayer.node);
	},
	loadAnimation:function(){
		loadCharacterSkillAnimation(player1);
		this._message.setString("正在加载资源(1/4)");
		this._progressBar.setPercent(this._percent+=25);
		loadCharacterSkillAnimation(player2);
		this._message.setString("正在加载资源(2/4)");
		this._progressBar.setPercent(this._percent+=25);
		loadCharacterSkillAnimation(player3);
		this._message.setString("正在加载资源(3/4)");
		this._progressBar.setPercent(this._percent+=25);
		loadCharacterSkillAnimation(player4);
		this._message.setString("正在加载资源(4/4)");
		this._progressBar.setPercent(this._percent+=25);
	},
	update:function(){
		if(this._percent==100){
			cc.director.runScene(new GameScene());
		}
	}
});

var LoadScene=cc.Scene.extend({
	tmepPlayer:null,
	ctor:function(player){
		this._super();
		this.tmepPlayer=player;
	},
	onEnter:function(){
		this._super();
		var layer=new LoadLayer(this.tmepPlayer);
		this.addChild(layer);
	}
});