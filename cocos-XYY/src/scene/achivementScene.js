function createCharacterAchivementItem(listView,achivement,item){
	var imageView=ccui.helper.seekWidgetByName(item, "ImageView1");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var textView=ccui.helper.seekWidgetByName(item, "TextView1");
	textView.setString(achivement.message);
	listView.pushBackCustomItem(item);
	return item;
}

function createCardAchivementItem(listView,achivement,item){
	var imageView=ccui.helper.seekWidgetByName(item, "ImageView2");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var loadingBar=ccui.helper.seekWidgetByName(item, "LoadingBar2");
	if(achivement.progress!=null){
		loadingBar.setPercent(parseInt(achivement.progress/achivement.maxProgress*100));
	}
	var textView=ccui.helper.seekWidgetByName(item, "TextView2");
	textView.setString(achivement.message);
	listView.pushBackCustomItem(item);
	return item;
}

function createSpecialAchivementItem(listView,achivement,item){
	var imageView=ccui.helper.seekWidgetByName(item, "ImageView3");
	if(achivement.progress==achivement.maxProgress){
		imageView.loadTexture(achivement.pic.replaceAll("2"));
	}else{
		imageView.loadTexture(achivement.pic);
	}
	var textView=ccui.helper.seekWidgetByName(item, "TextView3");
	textView.setString(achivement.message);
	listView.pushBackCustomItem(item);
	return item;
}

var AchivementLayer=cc.Layer.extend({
	root:null,
	ctor:function(){
		this._super();
		this.load();
	},
	load:function(){
		this.root=ccs.load(res.AchievementScene_json).node;
		var mark=ccui.helper.seekWidgetByName(this.root, "mark");
		var pageView=ccui.helper.seekWidgetByName(this.root, "PageView");
		pageView.setBackGroundImageScale9Enabled(true);
		var closeButton=ccui.helper.seekWidgetByName(this.root, "closeButton");
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
		
		var listView1=ccui.helper.seekWidgetByName(this.root, "ListView1");
		var item1=ccui.helper.seekWidgetByName(this.root, "item1");
		listView1.setItemModel(item1);
		listView1.removeAllItems();
		this.initPage1(listView1,item1);
		
		var listView2=ccui.helper.seekWidgetByName(this.root, "ListView2");
		var item2=ccui.helper.seekWidgetByName(this.root, "item2");
		listView2.setItemModel(item2);
		listView2.removeAllItems();
		this.initPageView2(listView2,item2);
		
		var title1=ccui.helper.seekWidgetByName(this.root, "Title1");
		title1.addClickEventListener(function(){
			pageView.scrollToPage(0);
			var action=cc.moveTo(0.1, cc.p(title1.x,mark.y));
			mark.runAction(action);
		});
		
		var title2=ccui.helper.seekWidgetByName(this.root, "Title2");
		title2.addClickEventListener(function(){
			pageView.scrollToPage(1);
			var action=cc.moveTo(0.1, cc.p(title2.x,mark.y));
			mark.runAction(action);
		});
		
		var title3=ccui.helper.seekWidgetByName(this.root, "Title3");
		title3.addClickEventListener(function(){
			pageView.scrollToPage(2);
			var action=cc.moveTo(0.1, cc.p(title3.x,mark.y));
			mark.runAction(action);
		});
		
		var listView3=ccui.helper.seekWidgetByName(this.root, "ListView3");
		var item3=ccui.helper.seekWidgetByName(this.root, "item3");
		listView3.setItemModel(item3);
		listView3.removeAllItems();
		this.initPageView3(listView3,item3);
		
		
		this.addChild(this.root);
		listView1.jumpToTop();
	},
	initPage1:function(listView,item){
		for(var achivement in initCharaceterAchivement){
			createCharacterAchivementItem(listView,initCharaceterAchivement[achivement],item.clone());
		}
	},
	initPageView2:function(listView,item){
		 for(var achivement in initCardAchivement){
			 createCardAchivementItem(listView,initCardAchivement[achivement],item.clone()); 
		 }
	},
	initPageView3:function(listView,item){
		 for(var achivement in initSpecialAchivement){
			 createSpecialAchivementItem(listView, initSpecialAchivement[achivement],item.clone()); 
		 }
	}
})

var AchivementScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new AchivementLayer();
		this.addChild(layer);
	}
})