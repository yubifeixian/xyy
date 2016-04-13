// AI选择【天雷破】的目标
function cardEfectAITianleipo(mubiao1,mubiao2) {
	var selectPlayer = mubiao1;
	if ((mubiao1.hp == 0 && mubiao2.hp > 0)
			|| (mubiao1.defense==string_handCardNameQiankundaopao&&mubiao2.hp>0)
			|| (mubiao2.hp > 0 && mubiao2.hp < mubiao1.hp)) {
		selectPlayer = mubiao2;
	}
	return selectPlayer;
}

/**
 * AI决定【天玄五音】增加战力的一方
 * 
 * @param usePlayer
 * @return 增加战力的一方（“触发方”或者“怪物方“）
 */
function cardEffectAITianxuanwuyin(usePlayer) {
	return result=player1IsPlayer2Friend(usePlayer, nowPlayerTerm[nowPlayerNumber])?CAMP.CHUFAFANG:CAMP.GUAIWUFANG;
}