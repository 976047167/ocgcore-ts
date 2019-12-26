declare enum LOCATION {
    DECK = 0x01, //卡组
    HAND = 0x02, //手牌
    MZONE = 0x04, //怪兽区
    SZONE = 0x08, //魔陷区
    GRAVE = 0x10, //墓地
    REMOVED = 0x20, //除外区
    EXTRA = 0x40, //额外
    OVERLAY = 0x80, //超量素材
    ONFIELD = 0x0c, //场上（怪兽+魔陷）
    FZONE = 0x100, //场地区
    PZONE = 0x200, //灵摆区
}
declare enum PLAYER {
    NONE = 2,//2个玩家都不是,
    ALL = 3,//2个玩家都是
}
//对诱发型效果表示触发效果的事件/时点(EVENT开头)
declare enum EFFECT_CODE {
    /**效果免疫*/
    IMMUNE_EFFECT = 1,
    /**效果无效（技能抽取）*/
    DISABLE = 2,
    /**效果不能被无效*/
    CANNOT_DISABLE = 3,
    /**设置控制权*/
    SET_CONTROL = 4,
    /**不能改变控制权*/
    CANNOT_CHANGE_CONTROL = 5,
    /**玩家不能发动效果*/
    CANNOT_ACTIVATE = 6,
    /**卡不能发动效果*/
    CANNOT_TRIGGER = 7,
    /**效果无效（聖杯）*/
    DISABLE_EFFECT = 8,
    /**在連鎖串中無效(processor.cpp)*/
    DISABLE_CHAIN = 9,
    /**陷阱怪兽无效*/
    DISABLE_TRAPMONSTER = 10,
    /**发动不能被无效*/
    CANNOT_INACTIVATE = 12,
    /**效果處理時不能被无效*/
    CANNOT_DISEFFECT = 13,
    /**不能改变表示形式*/
    CANNOT_CHANGE_POSITION = 14,
    /**陷阱可以从手牌发动*/
    TRAP_ACT_IN_HAND = 15,
    /**陷阱可以在盖放的回合发动*/
    TRAP_ACT_IN_SET_TURN = 16,
    /**X回合内留在场上（光之护封剑等）*/
    REMAIN_FIELD = 17,
    /**怪兽可以在魔陷区放置*/
    MONSTER_SSET = 18,
    /**不能召唤怪兽*/
    CANNOT_SUMMON = 20,
    /**不能翻转召唤怪兽*/
    CANNOT_FLIP_SUMMON = 21,
    /**不能特殊召唤怪兽*/
    CANNOT_SPECIAL_SUMMON = 22,
    /**不能覆盖怪兽*/
    CANNOT_MSET = 23,
    /**不能覆盖魔陷*/
    CANNOT_SSET = 24,
    /**不能抽卡*/
    CANNOT_DRAW = 25,
    /**召唤不会无效*/
    CANNOT_DISABLE_SUMMON = 26,
    /**特殊召唤不会无效*/
    CANNOT_DISABLE_SPSUMMON = 27,
    /**限制每回合放置怪兽次数*/
    SET_SUMMON_COUNT_LIMIT = 28,
    /**增加召唤（通常召唤）次数*/
    EXTRA_SUMMON_COUNT = 29,
    /**特殊召唤条件*/
    SPSUMMON_CONDITION = 30,
    /**有苏生限制的怪獸*/
    REVIVE_LIMIT = 31,
    /**召唤规则效果*/
    SUMMON_PROC = 32,
    /**召唤规则限制*/
    LIMIT_SUMMON_PROC = 33,
    /**特殊召唤规则*/
    SPSUMMON_PROC = 34,
    /**增加盖放（通常召唤）次数*/
    EXTRA_SET_COUNT = 35,
    /**放置（通常召唤）规则*/
    SET_PROC = 36,
    /**放置（通常召唤）规则限制*/
    LIMIT_SET_PROC = 37,
    /**神圣光辉（魔术礼帽）*/
    DEVINE_LIGHT = 38,
    /**翻转召唤不会无效*/
    CANNOT_DISABLE_FLIP_SUMMON = 39,
    /**不会被破坏*/
    INDESTRUCTABLE = 40,
    /**不会被效果破坏*/
    INDESTRUCTABLE_EFFECT = 41,
    /**不会被战斗破坏*/
    INDESTRUCTABLE_BATTLE = 42,
    /**不能做上级召唤的祭品*/
    UNRELEASABLE_SUM = 43,
    /**不能做上级召唤以外的祭品*/
    UNRELEASABLE_NONSUM = 44,
    /**必選的代替破壞(此卡被破壞時用其他卡代替)*/
    DESTROY_SUBSTITUTE = 45,
    /**不能进行解放行为*/
    CANNOT_RELEASE = 46,
    /**一回合几次不会被破坏*/
    INDESTRUCTABLE_COUNT = 47,
    /**不能被解放*/
    UNRELEASABLE_EFFECT = 48,
    /**可選的代替破壞(將破壞改成其他動作)*/
    DESTROY_REPLACE = 50,
    /**代替解放*/
    RELEASE_REPLACE = 51,
    /**可以不送去XX而送去OO（甜点城堡等）*/
    SEND_REPLACE = 52,
    /**不能丢弃手牌*/
    CANNOT_DISCARD_HAND = 55,
    /**不能把卡组的卡送去墓地*/
    CANNOT_DISCARD_DECK = 56,
    /**不能作为COST使用*/
    CANNOT_USE_AS_COST = 57,
    /**不能放置counter*/
    CANNOT_PLACE_COUNTER = 58,
    /**不能作为COST送去墓地*/
    CANNOT_TO_GRAVE_AS_COST = 59,
    /**离场时重新指定去向*/
    LEAVE_FIELD_REDIRECT = 60,
    /**回手牌时重新指定去向*/
    TO_HAND_REDIRECT = 61,
    /**回卡组时重新指定去向*/
    TO_DECK_REDIRECT = 62,
    /**去墓地时重新指定去向*/
    TO_GRAVE_REDIRECT = 63,
    /**除外时重新指定去向*/
    REMOVE_REDIRECT = 64,
    /**不能加入手牌*/
    CANNOT_TO_HAND = 65,
    /**不能回卡组*/
    CANNOT_TO_DECK = 66,
    /**不能除外*/
    CANNOT_REMOVE = 67,
    /**不能去墓地*/
    CANNOT_TO_GRAVE = 68,
    /**不能变里侧*/
    CANNOT_TURN_SET = 69,
    /**不能成为攻击对象*/
    CANNOT_BE_BATTLE_TARGET = 70,
    /**不能成为效果对象*/
    CANNOT_BE_TARGET = 71,
    /**不能成为攻击对象-鶸型（传说的渔人）*/
    IGNORE_BATTLE_TARGET = 72,
    /**不能直接攻击*/
    CANNOT_DIRECT_ATTACK = 73,
    /**可以直接攻击*/
    DIRECT_ATTACK = 74,
    /**二重状态*/
    DUAL_STATUS = 75,
    /**装备对象限制*/
    EQUIP_LIMIT = 76,
    /**可以再度召唤*/
    DUAL_SUMMONABLE = 77,
    /**伤害变回复*/
    REVERSE_DAMAGE = 80,
    /**回复变伤害*/
    REVERSE_RECOVER = 81,
    /**改变伤害数值*/
    CHANGE_DAMAGE = 82,
    /**反射伤害*/
    REFLECT_DAMAGE = 83,
    /**不能攻击*/
    CANNOT_ATTACK = 85,
    /**不能攻击宣言*/
    CANNOT_ATTACK_ANNOUNCE = 86,
    /**不会被卡的效果变成守备表示（攻击性云魔物）*/
    CANNOT_CHANGE_POS_E = 87,
    /**发动代价（魔力之枷）*/
    ACTIVATE_COST = 90,
    /**召唤代价*/
    SUMMON_COST = 91,
    /**特殊召唤代价（暴君龙）*/
    SPSUMMON_COST = 92,
    /**翻转召唤代价*/
    FLIPSUMMON_COST = 93,
    /**怪兽放置代价*/
    MSET_COST = 94,
    /**魔陷放置代价*/
    SSET_COST = 95,
    /**攻击代价（霞之谷猎鹰）*/
    ATTACK_COST = 96,
    /**改变攻击力（攻击力增加/减少）*/
    UPDATE_ATTACK = 100,
    /**设置攻击力(永續型效果、攻擊力變成X特殊召喚)*/
    SET_ATTACK = 101,
    /**设置最终攻击力(所有入連鎖的改變攻擊力)*/
    SET_ATTACK_FINAL = 102,
    /**设置原本攻击力*/
    SET_BASE_ATTACK = 103,
    /**改变防御力*/
    UPDATE_DEFENSE = 104,
    /**设置防御力*/
    SET_DEFENSE = 105,
    /**设置最终防御力*/
    SET_DEFENSE_FINAL = 106,
    /**设置原本防御力*/
    SET_BASE_DEFENSE = 107,
    /**倒置改变攻击力、防御力（天邪鬼）*/
    REVERSE_UPDATE = 108,
    /**交换攻防(超級漏洞人)*/
    SWAP_AD = 109,
    /**交换原本攻防*/
    SWAP_BASE_AD = 110,
    /**設定最終攻擊力(用於交換攻防)*/
    SWAP_ATTACK_FINAL = 111,
    /**設定最終防禦力(用於交換攻防)*/
    SWAP_DEFENSE_FINAL = 112,
    /**增加卡名*/
    ADD_CODE = 113,
    /**改变卡名*/
    CHANGE_CODE = 114,
    /**增加卡片种类（types）*/
    ADD_TYPE = 115,
    /**删除卡片种类*/
    REMOVE_TYPE = 116,
    /**改变卡片种类*/
    CHANGE_TYPE = 117,
    /**增加种族*/
    ADD_RACE = 120,
    /**删除种族*/
    REMOVE_RACE = 121,
    /**改变种族*/
    CHANGE_RACE = 122,
    /**增加属性*/
    ADD_ATTRIBUTE = 125,
    /**删除属性*/
    REMOVE_ATTRIBUTE = 126,
    /**改变属性*/
    CHANGE_ATTRIBUTE = 127,
    /**改变等级*/
    UPDATE_LEVEL = 130,
    /**设置等级*/
    CHANGE_LEVEL = 131,
    /**改变阶级*/
    UPDATE_RANK = 132,
    /**设置阶级*/
    CHANGE_RANK = 133,
    /**改变左刻度*/
    UPDATE_LSCALE = 134,
    /**设置左刻度*/
    CHANGE_LSCALE = 135,
    /**改变右刻度*/
    UPDATE_RSCALE = 136, //
    /**设置右刻度*/
    CHANGE_RSCALE = 137, //
    /**設定表示形式*/
    SET_POSITION = 140, //
    /**不入連鎖的破壞（罪系列等）*/
    SELF_DESTROY = 141, //
    /**不入連鎖的送墓*/
    SELF_TOGRAVE = 142,
    /**可以作为2个祭品*/
    DOUBLE_TRIBUTE = 150,
    /**减少祭品*/
    DECREASE_TRIBUTE = 151,
    /**减少放置怪兽的祭品*/
    DECREASE_TRIBUTE_SET = 152,
    /**必須使用的代替解放（灵魂交错）*/
    EXTRA_RELEASE = 153,
    /**祭品限制*/
    TRIBUTE_LIMIT = 154,
    /**代替召唤解放（帝王的烈旋）*/
    EXTRA_RELEASE_SUM = 155,
    /**N/A*/
    // TRIPLE_TRIBUTE=156
    /**增加可使用的祭品（真龙）*/
    ADD_EXTRA_TRIBUTE = 157,
    /**代替效果COST的解放（闇黒世界）*/
    EXTRA_RELEASE_NONSUM = 158,
    /**公开手牌*/
    PUBLIC = 160,
    /**允许放置指示物类型*/
    COUNTER_PERMIT = 0x10000,
    /**允许放置指示物数量*/
    COUNTER_LIMIT = 0x20000,
    /**代替取除指示物*/
    RCOUNTER_REPLACE = 0x30000,
    /**改变生命值代价數值*/
    LPCOST_CHANGE = 170,
    /**以其他動作代替生命值代价*/
    LPCOST_REPLACE = 171,
    /**跳过抽卡阶段*/
    SKIP_DP = 180,
    /**跳过准备阶段*/
    SKIP_SP = 181,
    /**跳过主要阶段1*/
    SKIP_M1 = 182,
    /**跳过战斗阶段*/
    SKIP_BP = 183,
    /**跳过主要阶段2*/
    SKIP_M2 = 184,
    /**不能进入战斗阶段*/
    CANNOT_BP = 185,
    /**不能进入主要阶段2*/
    CANNOT_M2 = 186,
    /**不能进入结束阶段*/
    CANNOT_EP = 187,
    /**跳过整个回合*/
    SKIP_TURN = 188,
    /**跳过结束阶段*/
    SKIP_EP = 189,
    /**可以守备表示攻击*/
    DEFENSE_ATTACK = 190,
    /**必须攻击*/
    MUST_ATTACK = 191,
    /**必须第一个攻击*/
    FIRST_ATTACK = 192,
    /**可以攻击所有怪兽*/
    ATTACK_ALL = 193,
    /**增加攻击次数*/
    EXTRA_ATTACK = 194,
    /**必须攻击此卡*/
    // MUST_BE_ATTACKED=195
    /**只能攻击此卡*/
    ONLY_BE_ATTACKED = 196,
    /**攻击已被無效(Duel.NegateAttack()成功的標記)*/
    ATTACK_DISABLED = 197,
    /**不会给对方造成战斗伤害*/
    NO_BATTLE_DAMAGE = 200,
    /**不会对自己造成战斗伤害*/
    AVOID_BATTLE_DAMAGE = 201,
    /**反弹战斗伤害*/
    REFLECT_BATTLE_DAMAGE = 202,
    /**贯穿伤害*/
    PIERCE = 203,
    /**战斗破坏时重新指定去向*/
    BATTLE_DESTROY_REDIRECT = 204,
    /**战斗伤害视为效果伤害*/
    BATTLE_DAMAGE_TO_EFFECT = 205,
    /**重新抛硬币*/
    TOSS_COIN_REPLACE = 220,
    /**重新掷骰子*/
    TOSS_DICE_REPLACE = 221,
    /**指定融合素材的條件*/
    FUSION_MATERIAL = 230,
    /**玩家受到連鎖物質的效果影響*/
    CHAIN_MATERIAL = 231,
    /**可以当作同调素材*/
    SYNCHRO_MATERIAL = 232,
    /**可以当作超量素材*/
    XYZ_MATERIAL = 233,
    /**代替融合素材*/
    FUSION_SUBSTITUTE = 234,
    /**不能做融合素材*/
    CANNOT_BE_FUSION_MATERIAL = 235,
    /**不能做同调素材*/
    CANNOT_BE_SYNCHRO_MATERIAL = 236,
    /**自定义Tuner的同调过程*/
    SYNCHRO_MATERIAL_CUSTOM = 237,
    /**不能做超量素材*/
    CANNOT_BE_XYZ_MATERIAL = 238,
    /**不能做连接素材*/
    CANNOT_BE_LINK_MATERIAL = 239,
    /**做同调素材时的等级*/
    SYNCHRO_LEVEL = 240,
    /**做仪式祭品时的等级*/
    RITUAL_LEVEL = 241,
    /**做超量素材时的等级*/
    XYZ_LEVEL = 242,
    /**在墓地当做仪式祭品*/
    EXTRA_RITUAL_MATERIAL = 243,
    /**同时当作调整以外的怪兽（幻影王 幽骑）*/
    NONTUNER = 244,
    /**代替去除超量素材*/
    OVERLAY_REMOVE_REPLACE = 245,
    /**废铁奇美拉*/
    SCRAP_CHIMERA = 246,
    /**调弦之魔术师超量素材限制*/
    TUNE_MAGICIAN_X = 247,
    /**调弦之魔术师融合素材限制*/
    //TUNE_MAGICIAN_F	=248
    /**可存取怪獸的各項數值(Card.AddMonsterAttribute()專用)*/
    PRE_MONSTER = 250,
    /**检查素材*/
    MATERIAL_CHECK = 251,
    /**无效区域（扰乱王等）*/
    DISABLE_FIELD = 260,
    /**怪兽区域封锁*/
    USE_EXTRA_MZONE = 261,
    /**魔法区域封锁*/
    USE_EXTRA_SZONE = 262,
    /**怪獸区格數上限*/
    MAX_MZONE = 263,
    /**魔陷区格數上限*/
    MAX_SZONE = 264,
    /**必须使用怪兽区的格子*/
    MUST_USE_MZONE = 265,
    /**手牌数量限制*/
    HAND_LIMIT = 270,
    /**抽卡阶段的抽卡数*/
    DRAW_COUNT = 271,
    /**灵魂怪兽不返回手牌*/
    SPIRIT_DONOT_RETURN = 280,
    /**灵魂怪兽可以不返回手牌*/
    SPIRIT_MAYNOT_RETURN = 281,
    /**改变场地*/
    CHANGE_ENVIRONMENT = 290,
    /**王家长眠之谷*/
    NECRO_VALLEY = 291,
    /**不能Play(禁止令)*/
    FORBIDDEN = 292,
    /**不受「王家长眠之谷」的影响*/
    NECRO_VALLEY_IM = 293,
    /**翻转卡组*/
    REVERSE_DECK = 294,
    /**洗脑解除*/
    REMOVE_BRAINWASHING = 295,
    /**2次战斗阶段*/
    BP_TWICE = 296,
    /**場上只能存在1張(Card.SetUniqueOnField()專用)*/
    UNIQUE_CHECK = 297,
    /**Match胜利(胜利龙)*/
    MATCH_KILL = 300,
    /**基因组斗士*/
    SYNCHRO_CHECK = 310,
    /**对方回合从自己手卡发动（失乐的圣女）*/
    QP_ACT_IN_NTPHAND = 311,
    /**必须作为同调素材（波动龙 声子龙）*/
    MUST_BE_SMATERIAL = 312,
    /**重新指定去向(寶玉獸)*/
    TO_GRAVE_REDIRECT_CB = 313,
    /**設定最終等級(銀河女王之光)*/
    // CHANGE_LEVEL_FINAL		314
    /**設定最終階級*/
    // CHANGE_RANK_FINAL		315
    /**必须作为融合素材*/
    MUST_BE_FMATERIAL = 316,
    /**必须作为超量素材*/
    MUST_BE_XMATERIAL = 317,
    /**必须作为连接素材*/
    MUST_BE_LMATERIAL = 318,
    /**P召唤规则*/
    SPSUMMON_PROC_G = 320,
    /**特殊召唤次数限制*/
    SPSUMMON_COUNT_LIMIT = 330,
    /**剩餘召喚次數(召喚限制網)*/
    LEFT_SPSUMMON_COUNT = 331,
    /**對手不能選擇為攻擊對象*/
    CANNOT_SELECT_BATTLE_TARGET = 332,
    /**對手不能選擇為效果對象*/
    CANNOT_SELECT_TARGET = 333,
    /**视为「XX」字段的效果*/
    ADD_SETCODE = 334,
    /**玩家已受到"效果傷害變成0"的效果影響*/
    NO_DAMAGE = 335,
    /**不能通常召唤的怪獸*/
    // UNSUMMONABLE_CARD		336
    /**反制陷阱捨棄手牌的代價改變(解放之阿里阿德涅)*/
    DISCARD_COST_CHANGE = 338,
    /**用手牌的怪獸當作同步素材*/
    HAND_SYNCHRO = 339,
    /**作为融合素材时可以当作某一卡名(融合识别)*/
    ADD_FUSION_CODE = 340,
    /**作为融合素材时可以当作某一字段(魔玩具改造)*/
    ADD_FUSION_SETCODE = 341,
    /**只能攻擊X*/
    ONLY_ATTACK_MONSTER = 343,
    /**若攻擊則必須攻擊X*/
    MUST_ATTACK_MONSTER = 344,
    /**由對手選擇攻擊對象(黑暗貴族)*/
    PATRICIAN_OF_DARKNESS = 345,
    /**對怪獸攻擊X次*/
    EXTRA_ATTACK_MONSTER = 346,
    /**同盟状态*/
    UNION_STATUS = 347,
    /**旧同盟状态*/
    OLDUNION_STATUS = 348,
    /**reserve*/
    // ADD_FUSION_ATTRIBUTE		349
    /**reserve*/
    // REMOVE_FUSION_ATTRIBUTE	350,
    /**用作融合素材时的属性*/
    CHANGE_FUSION_ATTRIBUTE = 351,
    /**增加融合素材(万溶炼金师)*/
    EXTRA_FUSION_MATERIAL = 352,
    /**同调素材限制*/
    TUNER_MATERIAL_LIMIT = 353,
    /**用作连接素材时的卡名*/
    ADD_LINK_CODE = 354,
    /**reserve*/
    // ADD_LINK_SETCODE=355
    /**用作连接素材时的属性*/
    ADD_LINK_ATTRIBUTE = 356,
    /**用作连接素材时的种族*/
    ADD_LINK_RACE = 357,
    /**N/A*/
    EXTRA_LINK_MATERIAL = 358,
    /**N/A*/
    QP_ACT_IN_SET_TURN = 359,
    /**N/A*/
    EXTRA_PENDULUM_SUMMON = 360,
    /**素材检测*/
    MATERIAL_LIMIT = 361,
    /**游戏开始时*/
    EVENT_STARTUP = 1000,
    /**翻转时*/
    EVENT_FLIP = 1001,
    /**自由时点（强脱等，还有昴星团等诱发即时效果）*/
    EVENT_FREE_CHAIN = 1002,
    /**確定被破壞的卡片移動前*/
    EVENT_DESTROY = 1010,
    /**除外时*/
    EVENT_REMOVE = 1011,
    /**加入手牌时*/
    EVENT_TO_HAND = 1012,
    /**回卡组时*/
    EVENT_TO_DECK = 1013,
    /**送去墓地时(不含REASON_RETURN)*/
    EVENT_TO_GRAVE = 1014,
    /**离场时*/
    EVENT_LEAVE_FIELD = 1015,
    /**表示形式变更时*/
    EVENT_CHANGE_POS = 1016,
    /**解放时*/
    EVENT_RELEASE = 1017,
    /**丢弃手牌时*/
    EVENT_DISCARD = 1018,
    /**永久离场时*/
    EVENT_LEAVE_FIELD_P = 1019,
    /**连锁处理开始时（EVENT_CHAIN_ACTIVATING之後）*/
    EVENT_CHAIN_SOLVING = 1020,
    /**连锁处理准备中*/
    EVENT_CHAIN_ACTIVATING = 1021,
    /**连锁处理结束时*/
    EVENT_CHAIN_SOLVED = 1022,
    /**N/A*/
    // EVENT_CHAIN_ACTIVATED	1023
    /**连锁发动无效时（EVENT_CHAIN_ACTIVATING之後）*/
    EVENT_CHAIN_NEGATED = 1024,
    /**连锁效果无效时*/
    EVENT_CHAIN_DISABLED = 1025,
    /**连锁串结束时*/
    EVENT_CHAIN_END = 1026,
    /**效果发动时*/
    EVENT_CHAINING = 1027,
    /**成为效果对象时*/
    EVENT_BECOME_TARGET = 1028,
    /**被破坏时*/
    EVENT_DESTROYED = 1029,
    /***/
    EVENT_MOVE = 1030,
    /**adjust_all()调整後（御前试合）*/
    EVENT_ADJUST = 1040,
    /**通常召唤成功时*/
    EVENT_SUMMON_SUCCESS = 1100,
    /**翻转召唤成功时*/
    EVENT_FLIP_SUMMON_SUCCESS = 1101,
    /**特殊召唤成功时*/
    EVENT_SPSUMMON_SUCCESS = 1102,
    /**召唤之际（怪兽还没上场、神宣等时点）*/
    EVENT_SUMMON = 1103,
    /**翻转召唤之际*/
    EVENT_FLIP_SUMMON = 1104,
    /**特殊召唤之际*/
    EVENT_SPSUMMON = 1105,
    /**放置怪兽时*/
    EVENT_MSET = 1106,
    /**放置魔陷时*/
    EVENT_SSET = 1107,
    /**作为融合/仪式同调/超量素材时*/
    EVENT_BE_MATERIAL = 1108,
    /**将要作为融合/仪式同调/超量素材时*/
    EVENT_BE_PRE_MATERIAL = 1109,
    /**抽卡时*/
    EVENT_DRAW = 1110,
    /**造成战斗/效果伤害时*/
    EVENT_DAMAGE = 1111,
    /**回复生命值时*/
    EVENT_RECOVER = 1112,
    /**抽卡阶段通常抽卡前*/
    EVENT_PREDRAW = 1113,
    /**N/A*/
    EVENT_SUMMON_NEGATED = 1114,
    /**N/A*/
    EVENT_FLIP_SUMMON_NEGATED = 1115,
    /**N/A*/
    EVENT_SPSUMMON_NEGATED = 1116,
    /**控制权变更*/
    EVENT_CONTROL_CHANGED = 1120,
    /**装备卡装备时*/
    EVENT_EQUIP = 1121,
    /**攻击宣言时*/
    EVENT_ATTACK_ANNOUNCE = 1130,
    /**被选为攻击对象时*/
    EVENT_BE_BATTLE_TARGET = 1131,
    /**伤害步骤开始时（反转前）*/
    EVENT_BATTLE_START = 1132,
    /**伤害计算前（反转後）*/
    EVENT_BATTLE_CONFIRM = 1133,
    /**伤害计算时（羽斬）*/
    EVENT_PRE_DAMAGE_CALCULATE = 1134,
    /**N/A*/
    // EVENT_DAMAGE_CALCULATING	1135
    /**即将产生战斗伤害(只能使用EFFECT_TYPE_CONTINUOUS)*/
    EVENT_PRE_BATTLE_DAMAGE = 1136,
    /**N/A*/
    // EVENT_BATTLE_END=1137
    /**伤害计算后（异女、同反转效果时点）*/
    EVENT_BATTLED = 1138,
    /**以战斗破坏怪兽送去墓地时（BF-苍炎之修罗）*/
    EVENT_BATTLE_DESTROYING = 1139,
    /**被战斗破坏送去墓地时（杀人番茄等）*/
    EVENT_BATTLE_DESTROYED = 1140,
    /**伤害步骤结束时*/
    EVENT_DAMAGE_STEP_END = 1141,
    /**攻击无效时（翻倍机会）*/
    EVENT_ATTACK_DISABLED = 1142,
    /**造成战斗伤害时*/
    EVENT_BATTLE_DAMAGE = 1143,
    /**掷骰子的结果产生后*/
    EVENT_TOSS_DICE = 1150,
    /**抛硬币的结果产生后*/
    EVENT_TOSS_COIN = 1151,
    /**重新抛硬币*/
    EVENT_TOSS_COIN_NEGATE = 1152,
    /**重新掷骰子*/
    EVENT_TOSS_DICE_NEGATE = 1153,
    /**等级上升时*/
    EVENT_LEVEL_UP = 1200,
    /**支付生命值时*/
    EVENT_PAY_LPCOST = 1201,
    /**去除超量素材时*/
    EVENT_DETACH_MATERIAL = 1202,
    /**回到墓地时*/
    EVENT_RETURN_TO_GRAVE = 1203,
    /**回合结束时*/
    EVENT_TURN_END = 1210,
    /**阶段结束时*/
    EVENT_PHASE = 0x1000,
    /**阶段开始时*/
    EVENT_PHASE_START = 0x2000,
    /**增加指示物时*/
    EVENT_ADD_COUNTER = 0x10000,
    /**去除指示物时(A指示物)，Card.RemoveCounter()必須手動觸發此事件*/
    EVENT_REMOVE_COUNTER = 0x20000,
    /**自訂事件*/
    EVENT_CUSTOM = 0x10000000,

    DOUBLE_DAMAGE = 0x80000000,
    HALF_DAMAGE = 0x80000001,
}

declare enum EFFECT_STATUS {
    AVAILABLE = 0x1,
    SPSELF = 0x4,
}

declare enum EFFECT_COUNT_CODE {
    OATH = 0x10000000,
    DUEL = 0x20000000,
}
declare enum RESET {
    SELF_TURN = 0x10000000,
    OPPO_TURN = 0x20000000,
    PHASE = 0x40000000,
    CHAIN = 0x80000000,
    EVENT = 0x1000,
    CARD = 0x2000,
    CODE = 0x4000,
    COPY = 0x8000,

    DISABLE = 0x00010000,
    TURN_SET = 0x00020000,
    TOGRAVE = 0x00040000,
    REMOVE = 0x00080000,
    TEMP_REMOVE = 0x00100000,
    TOHAND = 0x00200000,
    TODECK = 0x00400000,
    LEAVE = 0x00800000,
    TOFIELD = 0x01000000,
    CONTROL = 0x02000000,
    OVERLAY = 0x04000000,
    MSCHANGE = 0x08000000,

}
declare enum EFFECT_TYPE {
    SINGLE = 0x0001, //一般效果
    FIELD = 0x0002, //环境卡类效果
    EQUIP = 0x0004, //装备卡类效果
    ACTIONS = 0x0008, //通过某种行为触发的诱发类效果
    ACTIVATE = 0x0010, //
    FLIP = 0x0020, //
    IGNITION = 0x0040, //
    TRIGGER_O = 0x0080, //
    QUICK_O = 0x0100, //
    TRIGGER_F = 0x0200, //
    QUICK_F = 0x0400, //
    CONTINUOUS = 0x0800, //
    XMATERIAL = 0x1000, //
    GRANT = 0x2000, //
}

declare enum EFFECT_FLAG {
    INITIAL = 0x0001,
    FUNC_VALUE = 0x0002,
    COUNT_LIMIT = 0x0004,
    FIELD_ONLY = 0x0008,
    CARD_TARGET = 0x0010,
    IGNORE_RANGE = 0x0020,
    ABSOLUTE_TARGET = 0x0040,
    IGNORE_IMMUNE = 0x0080,
    SET_AVAILABLE = 0x0100,
    CANNOT_NEGATE = 0x0200,
    CANNOT_DISABLE = 0x0400,
    PLAYER_TARGET = 0x0800,
    BOTH_SIDE = 0x1000,
    COPY_INHERIT = 0x2000,
    DAMAGE_STEP = 0x4000,
    DAMAGE_CAL = 0x8000,
    DELAY = 0x10000,
    SINGLE_RANGE = 0x20000,
    UNCOPYABLE = 0x40000,
    OATH = 0x80000,
    SPSUM_PARAM = 0x100000,
    REPEAT = 0x200000,
    NO_TURN_RESET = 0x400000,
    EVENT_PLAYER = 0x800000,
    OWNER_RELATE = 0x1000000,
    CANNOT_INACTIVATE = 0x2000000,
    CLIENT_HINT = 0x4000000,
    CONTINUOUS_TARGET = 0x8000000,
    LIMIT_ZONE = 0x10000000,
    // 	COF					= 0x20000000,
    // 	CVAL_CHECK			= 0x40000000,
    IMMEDIATELY_APPLY = 0x80000000,
}
declare enum EFFECT_FLAG2 {
    // 	NAGA				= 0x0001,
    COF = 0x0002,
}


