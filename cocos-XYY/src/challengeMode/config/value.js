/**
 * 流程类

开始阶段、事件牌阶段、技牌阶段、打怪阶段1（是否打怪）、打怪阶段2（是否混战）、打怪阶段3（结算）、打怪阶段4（结束）、补牌阶段、弃牌阶段、结束阶段

0	  		1			2		3						4					5					6				7		8			9


对话框类

选是否、选手牌、选人物、选牌的类型、选宠物、选数量、选择npc效果、选阵营、选怪物（例：占卜、窥测天机等）
10(√)	11(√)	12(√)	13(√)		14(√)	15(√)	16(√)		17(√)		18(√)
 */
var MessageType={
		ROUND_START:0,
		ROUND_EVENT:1,
		ROUND_SKILLCARD:2,
		ROUND_ATTACK_1:3,
		ROUND_ATTACK_2:4,
		ROUND_ATTACK_3:5,
		ROUND_ATTACK_4:6,
		ROUND_ADDHANDCARD:7,
		ROUND_DROPCARD:8,
		ROUND_ENDING:9,
		SELECT_CONFIRMORCANELTYPE:10,
		SELECT_HANDCARD:11,
		SELECT_PLAYER:12,
		SELSECT_CARDTYPE:13,
		SELECT_PET:14,
		SELECT_NUMBER:15,
		SELECT_NPCEFFECT:16,
		SELECT_CAMP:17,
		SELECT_MONSTER:18
};
