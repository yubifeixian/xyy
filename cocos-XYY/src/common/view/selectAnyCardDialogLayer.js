var SELECTANYCARD_TYPE={
		HANDCARD:1,
		ARM_1:2,
		ARM_2:3,
		DEFENSE:4,
		ORNAMENT:5
}

var selectAnyCardDialogLayer=BaseDialogLayer.extend({
	message:null,
	maxSelectNum:0,
	canCancel:false,
	player:null,
	resultList:null,
	itemExample:null,
	confirmCallback:null,
	callback:null,
	releaseList:null,
	confirmBtn:null,
	ctor:function(message,maxSelectNum,canCancel,player,confirmCallback,callback){
		this._super();
		this.resultList=[];
		this.releaseList=[];
		this.message=message;
		this.maxSelectNum=maxSelectNum;
		this.canCancel=canCancel;
		this.player=player;
		this.confirmCallback=confirmCallback;
		this.callback=callback;
		this.load();
		this.checkConfirmEnable();
	},
	load:function(){
		var _that=this;
		var _dialogNode=ccs.load(res.SelectAnyCardDialog_json).node;
		var _messageLabel=ccui.helper.seekWidgetByName(_dialogNode,"message");
		_messageLabel.setString(this.message);
		var _closeBtn=ccui.helper.seekWidgetByName(_dialogNode, "closeBtn");
		_closeBtn.setVisible(this.canCancel);
		_closeBtn.addClickEventListener(function(){
			_that.removeFromParent();
			if(_that.callback!=null){
				_that.callback();
			}
			_that.releaseCardImage();
		});
		
		var _handCardListView=ccui.helper.seekWidgetByName(_dialogNode, "handCardListView");
		this.itemExample=ccui.helper.seekWidgetByName(_dialogNode, "itemExample").clone();
		_handCardListView.removeAllChildren();
		for(var i=0;i<this.player.handCard.length;i++){
			var _tmpCard=this.player.handCard[i];
			var _tmpItem=this.createItemClone(_tmpCard.name,_tmpCard.cardID,_tmpCard.cardSrcID,
					SELECTANYCARD_TYPE.HANDCARD,_tmpCard.cardMessage,_tmpCard);
			_handCardListView.pushBackCustomItem(_tmpItem);
		}
		var _equmentListView=ccui.helper.seekWidgetByName(_dialogNode, "equmentListView");
		if(this.player.arms1!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.arms1);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, SELECTANYCARD_TYPE.ARM_1, _cardInfo.cardMessage);
			_equmentListView.pushBackCustomItem(_tmpItem);
		}
		if(this.player.arms2!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.arms2);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, SELECTANYCARD_TYPE.ARM_2, _cardInfo.cardMessage);
			_equmentListView.pushBackCustomItem(_tmpItem);
		}
		if(this.player.defense!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.defense);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, SELECTANYCARD_TYPE.DEFENSE, _cardInfo.cardMessage);
			_equmentListView.pushBackCustomItem(_tmpItem);
		}
		var _ornamentListView=ccui.helper.seekWidgetByName(_dialogNode, "ornamentListView");
		if(this.player.skillNameList.containsObject(skillnameHechengshipin)&&this.player.skillTempList.length>0){
			for(var i=0;i<this.player.skillTempList.length;i++){
				var _tmpCard=this.player.skillTempList[i];
				var _tmpItem=this.createItemClone(_tmpCard.name,_tmpCard.cardID,
						_tmpCard.cardSrcID,SELECTANYCARD_TYPE.ORNAMENT,_tmpCard.cardMessage);
				_ornamentListView.pushBackCustomItem(_tmpItem);
			}
		}else{
			_ornamentListView.setVisible(false);
		}
		
		this.confirmBtn=ccui.helper.seekWidgetByName(_dialogNode, "confirmBtn");
		this.confirmBtn.addClickEventListener(function(){
			if(_that.resultList.length!=_that.maxSelectNum){
				return;
			}
			_that.removeFromParent();
			_that.confirmCallback(_that.resultList);
			_that.releaseCardImage();
		});
		this.addChild(_dialogNode);
	},
	createItemClone:function(name,cardID,cardSrcID,
			cardType, cardMessage,extraData){
		var _that=this;
		var _tempHandCardImageView=this.itemExample.clone();
		_tempHandCardImageView.name=name;
		_tempHandCardImageView.clicked=false;
		_tempHandCardImageView.cardID=cardID;
		_tempHandCardImageView.cardSrcID=cardSrcID;
		_tempHandCardImageView.cardType=cardType;
		_tempHandCardImageView.cardMessage=cardMessage;
		_tempHandCardImageView.extraData=extraData;
		if(cardSrcID!=null){
			_tempHandCardImageView.loadTexture(cardSrcID);
		}
		_tempHandCardImageView.setOpacity(200);
		var _longClickFunction=function(){
			mainScene.addChild(new messageDialogLayer(cardMessage));
		};
		_tempHandCardImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				_that.scheduleOnce(_longClickFunction,1);
			}else if(type==2){
				_that.unscheduleAllCallbacks();
				if(!_tempHandCardImageView.clicked&&_that.resultList.length==_that.maxSelectNum){
					_that.checkConfirmEnable();
					return;
				}
				_tempHandCardImageView.clicked=!_tempHandCardImageView.clicked;
				if(_tempHandCardImageView.clicked){
					_tempHandCardImageView.y+=30;
					_that.resultList.push(_tempHandCardImageView);
					_tempHandCardImageView.setOpacity(255);
				}else{
					_tempHandCardImageView.y-=30;
					_that.resultList.removeObject(_tempHandCardImageView);
					_tempHandCardImageView.setOpacity(200);
				}
				_that.checkConfirmEnable();
				
			}else if(type==ccui.Widget.TOUCH_MOVED){
				_that.unscheduleAllCallbacks();
			}
		}, _tempHandCardImageView);
		_tempHandCardImageView.retain();
		this.releaseList.push(_tempHandCardImageView);
		return _tempHandCardImageView; 
	},
	releaseCardImage:function(){
		for(var i=0;i<this.releaseList.length;i++){
			this.releaseList[i].release();
		}
	},
	checkConfirmEnable:function(){
		var _stats=this.resultList.length==this.maxSelectNum;
		buttonManager(this.confirmBtn, _stats, _stats);
	}
});