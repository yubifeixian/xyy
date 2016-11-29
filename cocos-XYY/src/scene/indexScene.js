musicSwitch=cc.sys.localStorage.getItem("musicSwitch")||"true";
autoNextStepSwitch=cc.sys.localStorage.getItem("autoNextStepSwitch")||"false";
showFirstDialog=true;
isLongClick=false;
spSwitch=cc.sys.localStorage.getItem("spSwtich");
audioEngine=cc.AudioEngine.getInstance();

baseCharacterData=null;
// 当前是否已经按下返回键(防止重复add退出layer)
onExit=false;

var IndexLayer=cc.Layer.extend({
	osBackGroundImageView:null,
	startButton:null,
	freeSelectButton:null,
	achivementButton:null,
	adventureButton:null,
	exitButton:null,
	spButton:null,
	settingBtn:null,
	ctor:function(){
		this._super();
		this.init();
		this.spButtonManager();
	},
	loadAchivement:function(){
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLixiaoyao, 0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementZhaolinger, 0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementZhaolingerMengshe,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLinyueru,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementAnu,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementJiujianxian,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementBaiyuejiaozhu,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementWangxiaohu,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementShenqishuang,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementSumei,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementKonlin,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementMozun,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementTangxuejian,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementChonglou,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementZixuan,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementNangonghuang,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementXingxuan,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementWenhui,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementWangpengxu,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementYuntianhe,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementHanlingsha,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLiumengli,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementMurongziying,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementXuanxiao,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLongyou,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementXiaoman,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementJiangyunfan,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementTangyurou,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementOuyanghui,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementMoyi,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementYanshiqiongbing,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLongkui,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLongkuigui,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementJiangshili,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementJingtianSp,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementBingxinjue,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementDongmingbaojing,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementYingu,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLinghuxiandan,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementShuerguo,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementKuicetianji,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementToudao,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementTongqianbiao,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementTianleipo,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementWuqichaoyuan,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementLunhui,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementXianquRumengdiao,0);
		AchivementProgress.setCurrentAchivemengtProgress(initAchivement.achivementHuiyiZhaoqin, 0);
	},
	init:function(){
		var temp=this;
		var indexRoot=ccs.load(res.IndexScenc_josn);
		this.osBackGroundImageView=ccui.helper.seekWidgetByName(indexRoot.node, "bg");
		var versionLabel=ccui.helper.seekWidgetByName(indexRoot.node, "versionLabel");
		versionLabel.setString("版本："+version);
		this.startButton=ccui.helper.seekWidgetByName(indexRoot.node, "startButton");
		this.startButton.addTouchEventListener(function(sender,type){
			if(type==2){
				if(baseCharacterData==null){
					cc.loader.loadJson("res/data/character", function(err,data){
						if(err){
							temp.addChild(new messageDialogLayer("数据加载失败，请重试"));
						}else{
							baseCharacterData=data;
							cc.director.runScene(new ChooseScene());
						}
					});
				}else{
					cc.director.runScene(new ChooseScene());
				}
			}
		}, this.startButton);
		this.freeSelectButton=ccui.helper.seekWidgetByName(indexRoot.node, "fresSelectButton");
		this.freeSelectButton.addTouchEventListener(function(sender,type){
			if(type==2){
				if(baseCharacterData==null){
					cc.loader.loadJson("res/data/character", function(err,data){
						if(err){
							temp.addChild(new messageDialogLayer("数据加载失败，请重试"));
						}else{
							baseCharacterData=data;
							cc.director.runScene(new FreeSelectScene());
						}
					});
				}else{
					cc.director.runScene(new FreeSelectScene());
				}
			}
		}, this);
		this.adventureButton=ccui.helper.seekWidgetByName(indexRoot.node, "adventureButton");
		this.adventureButton.addTouchEventListener(function(sender,type){
			if(type==2){
				if(baseCharacterData==null){
					cc.loader.loadJson("res/data/character", function(err,data){
						if(err){
							temp.addChild(new messageDialogLayer("数据加载失败，请重试"));
						}else{
							baseCharacterData=data;
							// cc.director.runScene(new FreeSelectScene());
							cc.director.runScene(new AdvIndexScene());
						}
					});
				}else{
					// cc.director.runScene(new FreeSelectScene());
					cc.director.runScene(new AdvIndexScene());
				}
			}
		}, this);
		this.addChild(indexRoot.node);
		if(showFirstDialog){
			showFirstDialog=false;
			this.addChild(new messageDialogLayer("本游戏所采用一切资源（包括但不限于图片、声音）均来自网络，版权归原作者、原公司所有"));
		}
		this.osBackGroundImageView.loadTexture("res/drawable-hdpi/homeBg.png");
		this.achivementButton=ccui.helper.seekWidgetByName(indexRoot.node, "AchivementButton");
		this.achivementButton.addClickEventListener(function(){
			cc.director.pushScene(new AchivementScene());
		});
		// this.achivementButton.setVisible(false);
		
		this.spButton=ccui.helper.seekWidgetByName(indexRoot.node, "spButton");
		this.spButton.addClickEventListener(function(){
			spSwitch=(spSwitch=="true")?"false":"true";
			cc.sys.localStorage.setItem("spSwtich",spSwitch);
			this.spButtonManager();
		}.bind(this));
		this.settingBtn=ccui.helper.seekWidgetByName(indexRoot.node, "settingBtn");
		this.settingBtn.addClickEventListener(function(){
			temp.addChild(new SettingLayer());
		}.bind(this));
	},
	spButtonManager:function(){
		if(spSwitch=="true"){
			this.spButton.loadTexture("res/drawable-hdpi/spbutton_clicked.png");
		}else{
			this.spButton.loadTexture("res/drawable-hdpi/spbutton_unclicked.png");
		}
	}
});


var IndexScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var indexLayer=new IndexLayer();
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyReleased: function(keyCode, event){
				if(keyCode == cc.KEY.back){// ...........
					if(onExit){
						return;
					}
					onExit=true;
					addDialog(indexLayer, new yesOrNoDialogLayer("退出游戏?",function(result){
						if(result){
							cc.director.popScene();
						}
						onExit=false;
					}))
				}
			}
		}, this);
		this.addChild(indexLayer);
		
		var touchLayer=new TouchLayer();
		this.addChild(touchLayer);
	}
});