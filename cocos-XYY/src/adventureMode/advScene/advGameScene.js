var AdvGameScene=cc.Scene.extend({
	layer:null,
	ctor:function(){
		this._super();
		canUseCharacterList=new Array();
	},
	onEnter:function(){
		this._super();
		var model=parseInt(Math.random()*3, 10);
		//model=0;
		switch(model){
		case 0:
			nowGameModel=ADVGAMESCENEMODEL.LEFT;
			break;
		case 1:
			nowGameModel=ADVGAMESCENEMODEL.CENTER;
			break;
		case 2:
			nowGameModel=ADVGAMESCENEMODEL.RIGHT;
			break;
		}
		//nowGameModel=ADVGAMESCENEMODEL.LEFT;
		loadGameSave();
		//nowStage=getStage2_5Instance();
		this.layer=new AdvGameSceneLayer(nowGameModel,nowStage);
		this.addChild(this.layer);
		var touchLayer=new TouchLayer();
		this.addChild(touchLayer);
	},
	onExitTransitionDidStart:function(){
		this._super();
		this.layer.unscheduleAllCallbacks();
		mainScene=null;
		cc.textureCache.removeAllTextures();
		try{
			for(var i=0;i<nowPlayerTerm.length;i++){
				for(var t=0;t<nowPlayerTerm[i].handCard.length;t++){
					nowPlayerTerm[i].handCard[t].release();
				}
				if(nowPlayerTerm[i].skillUrl!=null){
					cc.spriteFrameCache.removeSpriteFramesFromFile(nowPlayerTerm[i].skillUrl);
				}
				if(nowPlayerTerm[i].animation!=null){
					nowPlayerTerm[i].animation.release();
				}
				cc.sys.garbageCollect();
			}
		}catch(e){
			cc.error(e);
		}
	}
})