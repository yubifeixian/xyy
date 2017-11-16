var selectAnyCardDialogLayer=BaseDialogLayer.extend({
	message:null,
	minSelectNum:0,
	maxSelectNum:0,
	canCancel:false,
	player:null,
	resultList:[],
	itemExample:null,
	ctor:function(message,minSelectNum,maxSelectNum,canCancel,player){
		this._super();
		this.message=message;
		this.minSelectNum=minSelectNum;
		this.maxSelectNum=maxSelectNum;
		this.canCancel=canCancel;
		this.player=player;
		this.load();
	},
	load:function(){
		var _dialogNode=ccs.load(res.SelectAnyCardDialog_json).node;
		var _messageLabel=ccui.helper.seekWidgetByName(_dialogNode,"message");
		_messageLabel.setString(this.message);
		var _closeBtn=ccui.helper.seekWidgetByName(_dialogNode, "closeBtn");
		_closeBtn.setVisible(this.canCancel);
		var _handCardListView=ccui.helper.seekWidgetByName(_dialogNode, "handCardListView");
		this.itemExample=ccui.helper.seekWidgetByName(_dialogNode, "itemExample").clone();
		_handCardListView.removeAllChildren();
		for(var i=0;i<player.handCard.length;i++){
			var _tmpCard=player.handCard[i];
			var _tmpItem=this.createItemClone(_tmpCard.name,_tmpCard.cardID,_tmpCard.cardSrcID,_tmpCard.cardType,_tmpCard.cardMessage);
			_handCardListView.insertCustomItem(_tmpItem);
		}
		var _equmentListView=ccui.helper.seekWidgetByName(_dialogNode, "equmentListView");
		if(this.player.arms1!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.arms1);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, _cardInfo.cardType, _cardInfo.cardMessage);
			_equmentListView.insertCustomItem(_cardInfo);
		}
		if(this.player.arms2!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.arms2);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, _cardInfo.cardType, _cardInfo.cardMessage);
			_equmentListView.insertCustomItem(_cardInfo);
		}
		if(this.player.defense!=Text.nil){
			var _cardInfo=equmentNameMappingCardInfo(this.player.defense);
			var _tmpItem=this.createItemClone(_cardInfo.name, _cardInfo.cardID, 
					_cardInfo.cardSrcID, _cardInfo.cardType, _cardInfo.cardMessage);
			_equmentListView.insertCustomItem(_cardInfo);
		}
		var _ornamentListView=ccui.helper.seekWidgetByName(_dialogNode, "ornamentListView");
		if(this.player.skillNameList.containsObject(skillnameHechengshipin)&&this.player.skillTempList.length>0){
			for(var i=0;i<this.player.skillTempList.length;i++){
				var _tmpCard=this.player.skillTempList[i];
				var _tmpItem=this.createItemClone(_tmpCard.name,_tmpCard.cardID,_tmpCard.cardSrcID,_tmpCard.cardType,_tmpCard.cardMessage);
				_ornamentListView.insertCustomItem(_tmpItem);
			}
		}else{
			_ornamentListView.setVisible(false);
		}
	},
	createItemClone:function(name,cardID,cardSrcID,
			cardType, cardMessage){
		var _that=this;
		var _tempHandCardImageView=this.itemExample.clone();
		_tempHandCardImageView.name=name;
		_tempHandCardImageView.clicked=false;
		_tempHandCardImageView.cardID=cardID;
		_tempHandCardImageView.cardSrcID=cardSrcID;
		_tempHandCardImageView.cardType=cardType;
		_tempHandCardImageView.cardMessage=cardMessage;
		if(cardSrcID!=null){
			_tempHandCardImageView.loadTexture(cardSrcID);
		}
		_tempHandCardImageView.setOpacity(200);
		var _longClickFunction=function(){
			mainScene.addChild(new messageDialogLayer(cardMessage));
		};
		_tempHandCardImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClickFunction,1);
			}else if(type==2){
				this.unscheduleAllCallbacks();
				if(_that.resultList.length==_that.maxSelectNum){
					return;
				}
				_tempHandCardImageView.clicked=!_tempHandCardImageView.clicked;
				if(_tempHandCardImageView.clicked){
					_that.resultList.push(_tempHandCardImageView);
					_tempHandCardImageView.setOpacity(255);
				}else{
					_that.resultList.remvoeObject(_tempHandCardImageView);
					_tempHandCardImageView.setOpacity(200);
				}
				
				
			}else if(type==ccui.Widget.TOUCH_MOVED){
				this.unscheduleAllCallbacks();
			}
		}, _tempHandCardImageView);
		return _tempHandCardImageView; 
	}
});