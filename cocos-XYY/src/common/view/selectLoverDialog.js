var selectLoverDialogLayer=BaseDialogLayer.extend({
	resutList:null,
	playerNumberList:null,
	maxNum:0,
	confirmCallback:null,
	callback:null,
	ctor:function(maxNum,confirmCallback,callback){
		this._super();
		this.resutList=[];
		this.maxNum=maxNum;
		this.comfirmCallback=confirmCallback;
		this.callback=callback;
		this.playerNumberList=[];
		for(var i=1;i<25;i++){
			this.playerNumberList.push(i);
		}
		this.playerNumberList.push(27);
		this.playerNumberList.push(28);
		this.playerNumberList.push(29);
		this.playerNumberList.push(30);
		this.playerNumberList.push(31);
		this.playerNumberList.push(33);
		this.loadJson();
	},
	loadJson:function(){
		var _that=this;
		var _dialogNode=ccs.load(res.SelectLovarDialog_json).node;
		for(var i=0;i<this.playerNumberList.length;i++){
			var _baseSelectPanel=ccui.helper.seekWidgetByName(_dialogNode, "baseSelectPanel"+this.playerNumberList[i]);
			_baseSelectPanel.setBackGroundImageScale9Enabled(true);
			_baseSelectPanel.setOpacity(200);
			_baseSelectPanel.isClicked=false;
			_baseSelectPanel.setUserData(baseCharacterData[this.playerNumberList[i]]._name);
			_baseSelectPanel.addTouchEventListener(function(sender,type){
				if(type==2){
					if(!this.isClicked&&_that.resutList.length==_that.maxNum){
						return;
					}
					this.isClicked=!this.isClicked;
					if(this.isClicked){
						this.setOpacity(255);
						_that.resutList.push(this.getUserData());
					}else{
						this.setOpacity(200);
						_that.resutList.removeObject(this.getUserData());
					}
				}
			});
		}
		var _confirmBtn=ccui.helper.seekWidgetByName(_dialogNode, "confirmBtn");
		_confirmBtn.addClickEventListener(function(){
			_that.removeFromParent();
			_that.comfirmCallback(_that.resutList);
			if(_that.callback!=null){
				_that.callback();
			}
		});
		this.addChild(_dialogNode);
	}
});