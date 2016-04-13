function createCharacterAchivementItem(listView,achivement){
	var root=ccs.load(res.AchievementScene_json).node;
	var imageView=ccui.helper.seekWidgetByName(root, "ImageView1");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var textView=ccui.helper.seekWidgetByName(root, "TextView1");
	textView.setString(achivement.message);
	var item=ccui.helper.seekWidgetByName(root, "item1").clone();;
	listView.pushBackCustomItem(item);
	return item;
}

function createCardAchivementItem(listView,achivement){
	var root=ccs.load(res.AchievementScene_json).node;
	var imageView=ccui.helper.seekWidgetByName(root, "ImageView2");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var loadingBar=ccui.helper.seekWidgetByName(root, "LoadingBar2");
	if(achivement.progress!=null){
		loadingBar.setPercent(parseInt(achivement.progress/achivement.maxProgress*100));
	}
	var textView=ccui.helper.seekWidgetByName(root, "TextView2");
	textView.setString(achivement.message);
	var item=ccui.helper.seekWidgetByName(root, "item2").clone();;
	listView.pushBackCustomItem(item);
	return item;
}

function createSpecialAchivementItem(listView,achivement){
	var root=ccs.load(res.AchievementScene_json).node;
	var imageView=ccui.helper.seekWidgetByName(root, "ImageView3");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var textView=ccui.helper.seekWidgetByName(root, "TextView3");
	textView.setString(achivement.message);
	var item=ccui.helper.seekWidgetByName(root, "item3").clone();;
	listView.pushBackCustomItem(item);
	return item;
}

var LoadAchivementLayer=cc.LayerColor.extend({
	ctor:function(){
		this._super(cc.Color(0, 0, 0, 100));
		var root=ccs.load(res.LoadAchivement_json).node;
		this.addChild(root);
	}
})


var AchivementLayer=cc.Layer.extend({
	loadAchivementLayer:null,
	ctor:function(){
		this._super();
		this.load();
	},
	load:function(){
		var root=ccs.load(res.AchievementScene_json).node;
		var mark=ccui.helper.seekWidgetByName(root, "mark");
		var pageView=ccui.helper.seekWidgetByName(root, "PageView");
		pageView.setBackGroundImageScale9Enabled(true);
		var closeButton=ccui.helper.seekWidgetByName(root, "closeButton");
		closeButton.addClickEventListener(function(){
			cc.director.popScene();
		});
		pageView.setBackGroundColor(cc.color(247, 196, 113));
		
		pageView.addEventListener(function(sender,type){
			switch(type){
			case ccui.PageView.EVENT_TURNING:
				var index=pageView.getCurPageIndex();
				switch(index){
				case 0:
					var action=cc.moveTo(0.1, cc.p(title1.x,mark.y));
					mark.runAction(action);
					break;
				case 1:
					var action=cc.moveTo(0.1, cc.p(title2.x,mark.y));
					mark.runAction(action);
					break;
				case 2:
					var action=cc.moveTo(0.1, cc.p(title3.x,mark.y));
					mark.runAction(action);
					break;
				}
			}
		});
		
		var listView1=ccui.helper.seekWidgetByName(root, "ListView1");
		var item=ccui.helper.seekWidgetByName(root, "item1");
		listView1.setItemModel(item);
		listView1.removeAllItems();
		this.scheduleOnce(function(){
			this.initPage1(listView1);
			this.loadAchivementLayer.removeFromParent(true);
		}.bind(this));
		
		var listView2=ccui.helper.seekWidgetByName(root, "ListView2");
		var item=ccui.helper.seekWidgetByName(root, "item2");
		listView2.setItemModel(item);
		listView2.removeAllItems();
		this.initPageView2(listView2);
		
		var title1=ccui.helper.seekWidgetByName(root, "Title1");
		title1.addClickEventListener(function(){
			pageView.scrollToPage(0);
			var action=cc.moveTo(0.1, cc.p(title1.x,mark.y));
			mark.runAction(action);
		});
		
		var title2=ccui.helper.seekWidgetByName(root, "Title2");
		title2.addClickEventListener(function(){
			pageView.scrollToPage(1);
			var action=cc.moveTo(0.1, cc.p(title2.x,mark.y));
			mark.runAction(action);
		});
		
		var title3=ccui.helper.seekWidgetByName(root, "Title3");
		title3.addClickEventListener(function(){
			pageView.scrollToPage(2);
			var action=cc.moveTo(0.1, cc.p(title3.x,mark.y));
			mark.runAction(action);
		});
		
		//var textView3=ccui.helper.seekWidgetByName(root, "TextView3");
		//textView3.setString("本成就暂未开放");
		var listView3=ccui.helper.seekWidgetByName(root, "ListView3");
		var item=ccui.helper.seekWidgetByName(root, "item3");
		listView3.setItemModel(item);
		listView3.removeAllItems();
		this.initPageView3(listView3);
		
		
		this.addChild(root);
		this.loadAchivementLayer=new LoadAchivementLayer();
		this.addChild(this.loadAchivementLayer);
		listView1.jumpToTop();
	},
	initPage1:function(listView){
		createCharacterAchivementItem(listView,initAchivement.achivementLixiaoyao);
		createCharacterAchivementItem(listView,initAchivement.achivementZhaolinger);
		createCharacterAchivementItem(listView,initAchivement.achivementZhaolingerMengshe);
		createCharacterAchivementItem(listView,initAchivement.achivementLinyueru);
		createCharacterAchivementItem(listView,initAchivement.achivementAnu);
		createCharacterAchivementItem(listView,initAchivement.achivementJiujianxian);
		createCharacterAchivementItem(listView,initAchivement.achivementBaiyuejiaozhu);
		createCharacterAchivementItem(listView,initAchivement.achivementWangxiaohu);
		createCharacterAchivementItem(listView,initAchivement.achivementShenqishuang);
		createCharacterAchivementItem(listView,initAchivement.achivementSumei);
		createCharacterAchivementItem(listView,initAchivement.achivementKonlin);
		createCharacterAchivementItem(listView,initAchivement.achivementMozun);
		createCharacterAchivementItem(listView,initAchivement.achivementTangxuejian);
		createCharacterAchivementItem(listView,initAchivement.achivementChonglou);
		createCharacterAchivementItem(listView,initAchivement.achivementZixuan);
		createCharacterAchivementItem(listView,initAchivement.achivementNangonghuang);
		createCharacterAchivementItem(listView,initAchivement.achivementXingxuan);
		createCharacterAchivementItem(listView,initAchivement.achivementWenhui);
		createCharacterAchivementItem(listView,initAchivement.achivementWangpengxu);
		createCharacterAchivementItem(listView,initAchivement.achivementYuntianhe);
		createCharacterAchivementItem(listView,initAchivement.achivementHanlingsha);
		createCharacterAchivementItem(listView,initAchivement.achivementLiumengli);
		createCharacterAchivementItem(listView,initAchivement.achivementMurongziying);
		createCharacterAchivementItem(listView,initAchivement.achivementXuanxiao);
		createCharacterAchivementItem(listView,initAchivement.achivementLongyou);
		createCharacterAchivementItem(listView,initAchivement.achivementXiaoman);
		createCharacterAchivementItem(listView,initAchivement.achivementJiangyunfan);
		createCharacterAchivementItem(listView,initAchivement.achivementTangyurou);
		createCharacterAchivementItem(listView,initAchivement.achivementOuyanghui);
		createCharacterAchivementItem(listView,initAchivement.achivementMoyi);
		createCharacterAchivementItem(listView,initAchivement.achivementYanshiqiongbing);
		createCharacterAchivementItem(listView,initAchivement.achivementLongkui);
		createCharacterAchivementItem(listView,initAchivement.achivementLongkuigui);
		createCharacterAchivementItem(listView,initAchivement.achivementJiangshili);
		createCharacterAchivementItem(listView,initAchivement.achivementJingtianSp);
	},
	initPageView2:function(listView){
		createCardAchivementItem(listView, initAchivement.achivementBingxinjue);
		createCardAchivementItem(listView, initAchivement.achivementDongmingbaojing);
		createCardAchivementItem(listView, initAchivement.achivementYingu);
		createCardAchivementItem(listView, initAchivement.achivementLinghuxiandan);
		createCardAchivementItem(listView, initAchivement.achivementShuerguo);
		createCardAchivementItem(listView, initAchivement.achivementKuicetianji);
		createCardAchivementItem(listView, initAchivement.achivementToudao);
		createCardAchivementItem(listView, initAchivement.achivementTongqianbiao);
		createCardAchivementItem(listView, initAchivement.achivementTianleipo);
		createCardAchivementItem(listView, initAchivement.achivementWuqichaoyuan);
	},
	initPageView3:function(listView){
		createSpecialAchivementItem(listView, initAchivement.achivementLunhui);
		createSpecialAchivementItem(listView, initAchivement.achivementXianquRumengdiao);
		createSpecialAchivementItem(listView, initAchivement.achivementHuiyiZhaoqin);
	}
})

var AchivementScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new AchivementLayer();
		this.addChild(layer);
	}
})