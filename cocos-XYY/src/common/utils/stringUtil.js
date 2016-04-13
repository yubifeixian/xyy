String.prototype.replaceAll = function(s1,s2){ 
	if(s2==null||s2==undefined){
		s2="";
	}
	return this.replace(new RegExp(s1,"gm"),s2); 
}

String.prototype.endsWith = function(searchString, position) {
	var subjectString = this.toString();
	if (position === undefined || position > subjectString.length) {
		position = subjectString.length;
	}
	position -= searchString.length;
	var lastIndex = subjectString.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};

var GetLength = function (str) {
	// /<summary>获得字符串实际长度，中文2，英文1</summary>
	// /<param name="str">要获得长度的字符串</param>
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
};

function cutstr(str, len) {
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for (var i = 0; i < str_len; i++) {
		a = str.charAt(i);
		str_length++;
		if (escape(a).length > 4) {
			// 中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if (str_length >= len) {
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	// 如果给定字符串小于指定长度，则返回源字符串；
	if (str_length < len) {
		return str;
	}
}

var sub=function(str,n){
	var r=/[^\x00-\xff]/g;
	if(str.replace(r,"mm").length<=n){return str;}
	var m=Math.floor(n/2);
	for(var i=m;i<str.length;i++){
		if(str.substr(0,i).replace(r,"mm").length>=n){
			return str.substr(0,i)+"...";
		}
	}
	return str;
}

String.prototype.handle=function(message,length){
	var beginPos = 0;  // 字符串的初始位置
	var resultStr="";		// 返回的字符串
	var str_vec=new Array();  // 创建一个字符串类型的顺序容器
	do   
	{  
		str_vec.push(message.substr(beginPos,length)); // substr函数的作用类似剪刀，将str中从beginPos到length之间的字符串剪下来，单独放入容器中
		if (beginPos+length >message.length)  
		{  
			break;  // 当要裁剪的长度超出str的长度，则退出循环
		}  
		else  
		{  
			beginPos += length; 
		}  

	} while (true);  

	for (var i = 0;i<str_vec.length;i++)  
	{  
		if(i==str_vec.length-1){
			resultStr+=str_vec[i];
		}else{
			resultStr+=str_vec[i]+"\n"; // 从容器逐一取出之前裁剪好的一段段字符串，分别在字符串后面加上换行符。append()类似胶水，将\n粘到字符串后面
		}
	}  
	cc.log(resultStr);
	return resultStr; 
}


String.prototype.format=function(args){
	var result = this;
	if (arguments.length > 0) {    
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				if(args[key]!=undefined){
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}