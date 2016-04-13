ADVGAMESCENEMODEL={
	LEFT:1,
	CENTER:2,
	RIGHT:3
}

/**
 * 流程类

开始阶段、技牌阶段、打怪阶段1（是否打怪）、打怪阶段2（是否混战）、打怪阶段3（结算）、打怪阶段4（结束）、补牌阶段、弃牌阶段、结束阶段

0	  		1		2						3					4					5					6		7		8	
 */
var MessageType={
		ROUND_START:0,
		ROUND_SKILLCARD:1,
		ROUND_ATTACK_1:2,
		ROUND_ATTACK_2:3,
		ROUND_ATTACK_3:4,
		ROUND_ATTACK_4:5,
		ROUND_ADDHANDCARD:6,
		ROUND_DROPCARD:7,
		ROUND_ENDING:8
};