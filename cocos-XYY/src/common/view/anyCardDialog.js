var cardBtnArray=[
                   {
                	   name:"kuicetianji",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardKuicetianji
                   },
                   {
                	   name:"shuerguo",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardShuerguo
                   },
                   {
                	   name:"tianleipo",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardTianleipo
                   },
                   {
                	   name:"tongqianbiao",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardTongqianbiao
                   },
                   {
                	   name:"toudao",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardToudao
                   },
                   {
                	   name:"wuqichaoyuan",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardWuqichaoyuan
                   },
                   {
                	   name:"jincanwang",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:2,
                	   card:handCardJincanwang
                   },
                   {
                	   name:"jinchantuoqiao",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:2,
                	   card:handCardJinchantuoqiao
                   },
                   {
                	   name:"tiangangzhanqi",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:2,
                	   card:handCardTiangangzhanqi
                   },
                   {
                	   name:"tianxuanwuyin",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:2,
                	   card:handCardTianxuanwuyin
                   },
                   {
                	   name:"linghuxiandan",
                	   // 1:技牌阶段 2：战牌阶段
                	   step:1,
                	   card:handCardLinghuxiandan
                   },
                   ];
var AnyCardDialog=BaseDialogLayer.extend({
	step:0,
	callback:null,
	usePlayer:null,
	effectPlayer:null,
	ctor:function(step,usePlayer,effectPlayer,callback){
		this._super();
		this.step=step;
		this.usePlayer=usePlayer,
		this.effectPlayer=effectPlayer;
		this.callback=callback;
		this.init();
	},
	init:function(){
		var _dialogNode=ccs.load(res.AnyCardDialog_json).node;
		var _temp=this;
		for(var i=0;i<cardBtnArray.length;i++){
			var _obj=cardBtnArray[i];
			var _btn=ccui.helper.seekWidgetByName(_dialogNode, "btn_"+cardBtnArray[i].name);
			if(this.step!=_obj.step){
				buttonManager(_btn, false, false);
			}
			_btn.setUserData(_obj.card);
			_btn.addClickEventListener(function(){
				this.getUserData().effect(_temp.usePlayer,_temp.effectPlayer,false,false,_temp.callBack);
				_temp.removeFromParent();
			});
		}
		this.addChild(_dialogNode);
	}
});