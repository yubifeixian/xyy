function skillXiejianxian_HasXiejianxian(player){
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0) {
			if (!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
				if (nowPlayerTerm[i].pet_LeiMonster != null
						&& nowPlayerTerm[i].pet_LeiMonster.name==nameXiejianxian) {
					return true;
				}
			}
		}
	}
	return false;
}

function skillXiejianxianXiejianxianPetEffect(player) {
	textAreaAddMessage(Text.xiejianxianPetEffect.format(player._name), myText, listView);
	if (player.arms1!=Text.nil) {
		player.xiejianxian_Arms1Name = player.arms1;
		player.xiejianxian_Arms1Combat = player.arms1Combat;
		player.xiejianxian_Arms1Extent = player.arms1Extent;
		player.arms1 +="(扣置)"; 
		player.arms1Combat = 0;
		player.arms1Extent = 0;
		player.tempZhuangbeiSkillCombat+=player._name==nameLinyueru?1:0;
		player.tempZhuangbeiSkillExtent += player._name==nameJiujianxian?1:0;
	}
	if (player.arms2!=Text.nil) {
		player.xiejianxian_Arms2Name = player.arms2;
		player.xiejianxian_Arms2Combat = player.arms2Combat;
		player.xiejianxian_Arms2Extent = player.arms2Extent;
		player.arms2+="(扣置)";
		player.arms2Combat = 0;
		player.arms2Extent = 0;
	}
}