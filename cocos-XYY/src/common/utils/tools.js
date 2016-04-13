/**
 * 将传入的数字num修正成指定的位数length
 * 比如：fix(3,2),则将3修正成2位数：03
 * @param num
 * @param length
 * @returns
 */
function fix(num, length) {
	return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

function myAudioPlayer(array){
	if(musicSwitch=="true"){
		audioEngine.playEffect(array[parseInt(Math.random()*array.length, 10)], false);
	}
}

function playButtonClickedAudio(){
	if(musicSwitch=="true"){
		audioEngine.playEffect("res/audio/buttonEffect.mp3", false);
	}
}