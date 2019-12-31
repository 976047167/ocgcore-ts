import { Card } from "../card/card";
import Duel from "../duel";
import { Chain } from "../field/chain";
import { tevent } from "../field/interface";

export class Effect {
    public ref_handle: number;
    public pduel: Duel;
    public effect_owner: number;
    public description: number;
    public code: EFFECT_CODE;
    public flag: number[]; // 2
    public id: number;
    public type: number;
    public copy_id: number;
    public range: number;
    public s_range: number;
    public o_range: number;
    /**
     * 效果剩余发动次数
     */
    public count_limit: number;
    /**
     * 效果最多发动次数
     */
    public count_limit_max: number;
    /**
     * 效果重置的次数
     */
    public reset_count: number;
    public reset_flag: number;
    public count_code: number;
    public category: number;
    public hint_timing: number[]; // 2
    public card_type: number;
    public active_type: number;
    public active_location: number;
    public active_sequence: number;
    public active_handler: Card;
    public status: number;
    public label: number[];
    public label_object: number;
    /**
     * 发动的具体条件检测,原本是lua层的回调函数的指针，待重构
     */
    public condition: number;
    public cost: number;
    public target: number;
    /**
     * 发动的具体条件检测,原本是lua层的回调函数的指针，待重构
     */
    public value: number;
    public operation: number;
    private owner: Card;
    private handler!: Card;
    constructor(pd: Duel) {
        this.ref_handle = 0;
        this.pduel = pd;
        this.description = 0;
        this.effect_owner = PLAYER.NONE;
        this.card_type = 0;
        this.active_type = 0;
        this.active_location = 0;
        this.active_sequence = 0;
        this.id = 0;
        this.code = 0;
        this.type = 0;
        this.flag = [0, 0];
        this.copy_id = 0;
        this.range = 0;
        this.s_range = 0;
        this.o_range = 0;
        this.count_limit = 0;
        this.count_limit_max = 0;
        this.reset_count = 0;
        this.reset_flag = 0;
        this.count_code = 0;
        this.category = 0;
        this.label = [];
        this.label_object = 0;
        this.hint_timing = [0, 0];
        this.status = 0;
        this.condition = 0;
        this.cost = 0;
        this.target = 0;
        this.value = 0;
        this.operation = 0;
    }

    /**
     * 判断是否与无效效果类相关
     */
    public is_disable_related(): boolean {
        if (this.code === EFFECT_CODE.IMMUNE_EFFECT ||
            this.code === EFFECT_CODE.DISABLE ||
            this.code === EFFECT_CODE.CANNOT_DISABLE ||
            this.code === EFFECT_CODE.FORBIDDEN) {
            return true;
        }
        return false;
    }
    /**
     * 判断是否与自毁类相关
     * 如装备符合条件检查，将自己送入墓地等
     */
    public is_self_destroy_related(): boolean {
        if (this.code === EFFECT_CODE.UNIQUE_CHECK ||
            this.code === EFFECT_CODE.SELF_DESTROY ||
            this.code === EFFECT_CODE.SELF_TOGRAVE) {
            return true;
        }
        return false;
    }
    /**
     * 效果是否可以被禁发
     */
    public is_can_be_forbidden(): boolean {
        const ctr = this.code & 0xf0000;
        if (this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
            !this.is_flag(EFFECT_FLAG.CANNOT_NEGATE)) {
            return false;
        }
        if (this.code === EFFECT_CODE.CHANGE_CODE ||
            ctr === EFFECT_CODE.COUNTER_PERMIT ||
            ctr === EFFECT_CODE.COUNTER_LIMIT) {
            return false;
        }
        return true;
    }
    /**
     * 检测当前是否可以主动发动效果
     * 一般是包括主动效果，环境卡，装备卡
     * 通过时点，场地，是否被禁用，等因素判断
     */
    public is_available(): boolean {
        // 检测是否为诱发类型效果
        if (this.is_type(EFFECT_TYPE.ACTIONS)) {
            return false;
        }
        //
        if ((this.is_type(EFFECT_TYPE.SINGLE | EFFECT_TYPE.XMATERIAL)) &&
            !this.is_type(EFFECT_TYPE.FIELD)) {
            const phandler = this.get_handler();
            const powner = this.get_owner();
            if (phandler.current.controler === PLAYER.NONE) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.SINGLE_RANGE) && !this.in_range(phandler)) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.SINGLE_RANGE) &&
                !phandler.get_status(STATUS.EFFECT_ENABLED) &&
                !this.is_flag(EFFECT_FLAG.IMMEDIATELY_APPLY)) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.SINGLE_RANGE) &&
                (phandler.current.location & LOCATION.ONFIELD) &&
                !phandler.is_position(POS.FACEUP)) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                this.is_can_be_forbidden() &&
                powner.is_status(STATUS.FORBIDDEN)) {
                return false;
            }
            if (powner === phandler &&
                this.is_can_be_forbidden() &&
                phandler.get_status(STATUS.FORBIDDEN)) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                powner.is_status(STATUS.DISABLED)) {
                return false;
            }
            if (powner === phandler &&
                !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                phandler.get_status(STATUS.DISABLED)) {
                return false;
            }
        }
        //
        if (this.is_type(EFFECT_TYPE.EQUIP)) {
            if (this.handler.current.controler === PLAYER.NONE) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                this.is_can_be_forbidden() &&
                this.owner.is_status(STATUS.FORBIDDEN)) {
                return false;
            }
            if (this.owner === this.handler &&
                this.is_can_be_forbidden() &&
                this.handler.get_status(STATUS.FORBIDDEN)) {
                return false;
            }
            if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                this.owner.is_status(STATUS.DISABLED)) {
                return false;
            }
            if (this.owner === this.handler &&
                !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                this.handler.get_status(STATUS.DISABLED)) {
                return false;
            }
            if (!this.is_flag(EFFECT_FLAG.SET_AVAILABLE)) {
                if (!(this.handler.get_status(STATUS.EFFECT_ENABLED))) {
                    return false;
                }
                if (!this.handler.is_position(POS.FACEUP)) {
                    return false;
                }
            }
        }
        //
        if (this.is_type(EFFECT_TYPE.FIELD)) {
            const phandler = this.get_handler();
            const powner = this.get_owner();
            if (!this.is_flag(EFFECT_FLAG.FIELD_ONLY)) {
                if (phandler.current.controler === PLAYER.NONE) {
                    return false;
                }
                if (!this.in_range(phandler)) {
                    return false;
                }
                if (!phandler.get_status(STATUS.EFFECT_ENABLED) &&
                    !this.is_flag(EFFECT_FLAG.IMMEDIATELY_APPLY)) {
                    return false;
                }
                if ((phandler.current.location & LOCATION.ONFIELD) &&
                    !phandler.is_position(POS.FACEUP)) {
                    return false;
                }
                if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                    this.is_can_be_forbidden() &&
                    powner.is_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (powner === phandler && this.is_can_be_forbidden() &&
                    phandler.get_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) &&
                    !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                    powner.is_status(STATUS.DISABLED)) {
                    return false;
                }
                if (powner === phandler &&
                    !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) &&
                    phandler.get_status(STATUS.DISABLED)) {
                    return false;
                }
                if (phandler.is_status(STATUS.BATTLE_DESTROYED)) {
                    return false;
                }
            }
        }
        if (!this.condition) {
            return true;
        }
        // pduel->lua->add_param(this, PARAM_TYPE_EFFECT);
        // int32 res = pduel->lua->check_condition(condition, 1);
        // if(res) {
        //     if(!(status & EFFECT_STATUS_AVAILABLE))
        //         id = pduel->game_field->infos.field_id++;
        //     status |= EFFECT_STATUS_AVAILABLE;
        // } else
        //     status &= ~EFFECT_STATUS_AVAILABLE;
        // return res;
    }
    /**
     * 检查效果发动次数限制
     * @param playerid 玩家id
     */
    public check_count_limit(playerid: number): boolean {
        if (this.is_flag(EFFECT_FLAG.COUNT_LIMIT)) {
            if (this.count_limit === 0) {
                return false;
            }
            if (this.count_code) {
                const code = this.count_code & 0xfffffff;
                const count = this.count_limit_max;
                if (code === 1) {
                    if (this.pduel.game_field.get_effect_code((this.count_code & 0xf0000000) |
                        this.get_handler().fieldid, PLAYER.NONE) >= count) {
                        return false;
                    }
                } else {
                    if (this.pduel.game_field.get_effect_code(this.count_code, playerid) >= count) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    /**
     * 用来检测诱发型效果是否可以启动
     * 比如通过flag来检测是否为伤害阶段，是否可以启动
     * @param playerid 玩家id
     * @param e
     * @param neglect_cond
     * @param neglect_cost
     * @param neglect_target
     * @param neglect_loc
     * @param neglect_faceup
     */
    public is_activateable(playerid: number,
                           e: tevent,
                           neglect_cond: number = 0,
                           neglect_cost: number = 0,
                           neglect_target: number = 0,
                           neglect_loc: number = 0,
                           neglect_faceup: number = 0,
    ): boolean {
        if (!this.is_type(EFFECT_TYPE.ACTIONS)) {
            return false;
        }
        if (!this.check_count_limit(playerid)) {
            return false;
        }
        if (!this.is_flag(EFFECT_FLAG.FIELD_ONLY)) {
            if (this.is_type(EFFECT_TYPE.ACTIVATE)) {
                if (this.handler.current.controler !== playerid) {
                    return false;
                }
                if (this.pduel.game_field.check_unique_onfield(this.handler, playerid, LOCATION.SZONE)) {
                    return false;
                }
                // 如果不是反击陷阱，那么战阶等时点是不能发动的
                if (!(this.handler.is_type(TYPE.COUNTER))) {
                    if ((this.code <= EFFECT_CODE.EVENT_BE_BATTLE_TARGET || this.code >= EFFECT_CODE.EVENT_TOSS_DICE) &&
                        this.pduel.game_field.infos.phase == PHASE.DAMAGE &&
                        !this.is_flag(EFFECT_FLAG.DAMAGE_STEP) &&
                        !this.pduel.game_field.get_cteffect(this, playerid, false)) {
                        return false;
                    }
                    if ((this.code < EFFECT_CODE.EVENT_PRE_DAMAGE_CALCULATE || this.code > EFFECT_CODE.EVENT_PRE_BATTLE_DAMAGE) &&
                        this.pduel.game_field.infos.phase == PHASE.DAMAGE_CAL &&
                        !this.is_flag(EFFECT_FLAG.DAMAGE_CAL)
                        && !this.pduel.game_field.get_cteffect(this, playerid, false)) {
                        return false;
                    }
                }
                let zone = 0xff;
                // 如果不是场地卡或者灵摆卡，但是效果本身要校验场地，那么value一般会有一个lua层的回调用来检测场地
                // 结果会以一个int形式返回，用按位与的方式记录那些场地被占用
                if (!(this.handler.is_type(TYPE.FIELD | TYPE.PENDULUM)) && this.is_flag(EFFECT_FLAG.LIMIT_ZONE)) {
                    // lua层调用，待重构
                    // pduel->lua->add_param(playerid, PARAM_TYPE_INT);
                    // pduel->lua->add_param(e.event_cards , PARAM_TYPE_GROUP);
                    // pduel->lua->add_param(e.event_player, PARAM_TYPE_INT);
                    // pduel->lua->add_param(e.event_value, PARAM_TYPE_INT);
                    // pduel->lua->add_param(e.reason_effect , PARAM_TYPE_EFFECT);
                    // pduel->lua->add_param(e.reason, PARAM_TYPE_INT);
                    // pduel->lua->add_param(e.reason_player, PARAM_TYPE_INT);
                    // zone = get_value(7);
                    if (!zone) {
                        zone = 0xff;
                    }
                }

                if (this.handler.current.location === LOCATION.SZONE) {
                    if (this.handler.is_position(POS.FACEUP)) {
                        return false;
                    }
                    if (this.handler.equiping_target) {
                        return false;
                    }
                    if (!(this.handler.is_type(TYPE.FIELD | TYPE.PENDULUM)) &&
                        this.is_flag(EFFECT_FLAG.LIMIT_ZONE) &&
                        !(zone & (1 << this.handler.current.sequence))) {
                        return false;
                    }
                } else {
                    if (this.handler.is_type(TYPE.MONSTER)) {
                        if (!this.handler.is_type(TYPE.PENDULUM)) {
                            return false;
                        }
                        if (!this.pduel.game_field.is_location_useable(playerid, LOCATION.PZONE, 0)
                            && !this.pduel.game_field.is_location_useable(playerid, LOCATION.PZONE, 1)) {
                            return false;
                        }
                    } else if (!this.handler.is_type(TYPE.FIELD)
                        && this.pduel.game_field.get_useable_count(this.handler, playerid, LOCATION.SZONE, playerid, LOCATION_REASON.TOFIELD, zone) <= 0) {
                        return false;
                    }
                }
                // 检测是否从手牌中发动或者从盖卡状态下发动
                let ecode: EFFECT_CODE = 0;
                if (this.handler.current.location == LOCATION.HAND && !neglect_loc) {
                    if (this.handler.is_type(TYPE.TRAP)) {
                        ecode = EFFECT_CODE.TRAP_ACT_IN_HAND;
                    } else if (this.handler.is_type(TYPE.SPELL) && this.pduel.game_field.infos.turn_player != playerid) {
                        if (this.handler.is_type(TYPE.QUICKPLAY)) {
                            ecode = EFFECT_CODE.QP_ACT_IN_NTPHAND;
                        } else {
                            return false;
                        }
                    }
                } else if (this.handler.current.location === LOCATION.SZONE) {
                    if (this.handler.is_type(TYPE.TRAP) && this.handler.get_status(STATUS.SET_TURN)) {
                        ecode = EFFECT_CODE.TRAP_ACT_IN_SET_TURN;
                    }
                    if (this.handler.is_type(TYPE.SPELL) &&
                        this.handler.is_type(TYPE.QUICKPLAY) &&
                        this.handler.get_status(STATUS.SET_TURN)) {
                        ecode = EFFECT_CODE.QP_ACT_IN_SET_TURN;
                    }
                }
                if (ecode) {
                    let available = false;
                    const eset = this.handler.filter_effect(ecode);
                    for (let i = 0; i < eset.length; ++i) {
                        if (eset[i].check_count_limit(playerid)) {
                            available = true;
                            break;
                        }
                    }
                    if (!available) {
                        return false;
                    }
                }
                if (this.handler.is_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (this.handler.is_affected_by_effect(EFFECT_CODE.CANNOT_TRIGGER)) {
                    return false;
                }
            } else if (!this.is_type(EFFECT_TYPE.CONTINUOUS)) {
                const phandler = this.get_handler();
                if (!(phandler.get_type() & TYPE.MONSTER) && (this.get_active_type() & TYPE.MONSTER)) {
                    return false;
                }
                if (!neglect_faceup && (phandler.current.location & (LOCATION.ONFIELD | LOCATION.REMOVED))) {
                    // effects which can be activated while face-down:
                    // 1. effects with EFFECT_FLAG_SET_AVAILABLE
                    // 2. events with FLIP_SET_AVAILABLE
                    if (!phandler.is_position(POS.FACEUP) &&
                        !this.is_flag(EFFECT_FLAG.SET_AVAILABLE) &&
                        (this.code !== EFFECT_CODE.EVENT_FLIP || !(e.event_value & (FLIP_SET_AVAILABLE >> 16)))) {
                        return false;
                    }
                    if (phandler.is_position(POS.FACEUP) && !phandler.is_status(STATUS.EFFECT_ENABLED)) {
                        return false;
                    }
                }
                if (!this.is_type(EFFECT_TYPE.FLIP | EFFECT_TYPE.TRIGGER_F)
                    && !(this.is_type(EFFECT_TYPE.SINGLE) &&
                        (this.code === EFFECT_CODE.EVENT_TO_GRAVE ||
                            this.code === EFFECT_CODE.EVENT_DESTROYED ||
                            this.code === EFFECT_CODE.EVENT_SPSUMMON_SUCCESS ||
                            this.code === EFFECT_CODE.EVENT_TO_HAND ||
                            this.code === EFFECT_CODE.EVENT_REMOVE ||
                            this.code === EFFECT_CODE.EVENT_FLIP))) {
                    if ((this.code < 1132 || this.code > 1149) &&
                        this.pduel.game_field.infos.phase === PHASE.DAMAGE &&
                        !this.is_flag(EFFECT_FLAG.DAMAGE_STEP)) {
                        return false;
                    }
                    if ((this.code < 1134 || this.code > 1136) &&
                        this.pduel.game_field.infos.phase === PHASE.DAMAGE_CAL &&
                        !this.is_flag(EFFECT_FLAG.DAMAGE_CAL)) {
                        return false;
                    }
                }
                if (phandler.current.location === LOCATION.OVERLAY) {
                    return false;
                }
                if (this.is_type(EFFECT_TYPE.FIELD) &&
                    (phandler.current.controler !== playerid) &&
                    !this.is_flag(EFFECT_FLAG.BOTH_SIDE | EFFECT_FLAG.EVENT_PLAYER)) {
                    return false;
                }
                if (phandler.is_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (phandler.is_affected_by_effect(EFFECT_CODE.CANNOT_TRIGGER)) {
                    return false;
                }
            } else {
                const phandler = this.get_handler();
                if (this.is_type(EFFECT_TYPE.FIELD) && phandler.is_status(STATUS.BATTLE_DESTROYED)) {
                    return false;
                }
                if ((this.is_type(EFFECT_TYPE.FIELD) || (this.is_type(EFFECT_TYPE.SINGLE) && this.is_flag(EFFECT_FLAG.SINGLE_RANGE))) &&
                 (phandler.current.is_location(LOCATION.ONFIELD))
                    && (!phandler.is_position(POS.FACEUP) || !phandler.is_status(STATUS.EFFECT_ENABLED))
                ) {
                    return false;
                }
                if (this.is_type(EFFECT_TYPE.SINGLE) &&
                this.is_flag(EFFECT_FLAG.SINGLE_RANGE) &&
                 !this.in_range(phandler)) {
                    return false;
                }
                if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) && this.is_can_be_forbidden() && this.owner.is_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (phandler === this.owner && this.is_can_be_forbidden() && phandler.is_status(STATUS.FORBIDDEN)) {
                    return false;
                }
                if (this.is_flag(EFFECT_FLAG.OWNER_RELATE) && !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) && this.owner.is_status(STATUS.DISABLED)) {
                    return false;
                }
                if (phandler === this.owner && !this.is_flag(EFFECT_FLAG.CANNOT_DISABLE) && phandler.is_status(STATUS.DISABLED)) {
                    return false;
                }
            }
        } else {
            if ((this.get_owner_player() !== playerid) && !this.is_flag(EFFECT_FLAG.BOTH_SIDE)) {
                return false;
            }
        }
        this.pduel.game_field.save_lp_cost();
        const oreason: Effect = this.pduel.game_field.core.reason_effect;
        const op = this.pduel.game_field.core.reason_player;
        this.pduel.game_field.core.reason_effect = this;
        this.pduel.game_field.core.reason_player = playerid;
        let result = true;
        if (!this.is_type(EFFECT_TYPE.CONTINUOUS)) {
            result = !!this.is_action_check(playerid);
        }
        if (result) {
            result = !!this.is_activate_ready(playerid, e, neglect_cond, neglect_cost, neglect_target);
        }
        this.pduel.game_field.core.reason_effect = oreason;
        this.pduel.game_field.core.reason_player = op;
        this.pduel.game_field.restore_lp_cost();
        return result;

    }
    public is_action_check(playerid: number): number {
        return 0;
    }
    public is_activate_ready(playerid: number, e: tevent, neglect_cond: number = 0, neglect_cost: number = 0, neglect_target: number = 0) {
        return 0;
    }
    public is_condition_check(playerid: number, e: tevent): number {
        return 0;
    }
    public is_activate_check(playerid: number, e: tevent, neglect_cond: number = 0, neglect_cost: number = 0, neglect_target: number = 0) {
        return 0;
    }
    public is_target(pcard: Card): number {
        return 0;
    }
    public is_fit_target_function(pcard: Card): number {
        return 0;
    }
    public is_target_player(playerid: number): number {
        return 0;
    }
    public is_player_effect_target(pcard: Card): number {
        return 0;

    }
    public is_immuned(pcard: Card): number {
        return 0;
    }
    public is_chainable(tp: number) {
        return 0;
    }
    public reset(reset_level: number, reset_type: number): number {
        return 0;
    }
    public dec_count(playerid: number = 2) {

    }
    public recharge() {

    }
    public get_value(extra_args: any = 0): number {
        return 0;
    }
    // get_value(pcard:Card, extraargs:number = 0):number{
    //     return 0
    // };
    // get_value(peffect:Effect, extraargs:number = 0):number{

    // }
    // void get_value(uint32 extraargs, std::vector<int32>* result);
    // void get_value(card* pcard, uint32 extraargs, std::vector<int32>* result);
    // void get_value(effect* peffect, uint32 extraargs, std::vector<int32>* result);
    public check_value_condition(extraargs: number = 0): number {
        return 0;

    }
    public get_label_object() {

    }
    public get_speed(): number {
        return 1;
    }
    public clone(): Effect {
        return this;
    }
    public get_owner(): Card {
        if (this.active_handler) {
            return this.active_handler;
        }
        if (this.is_type(EFFECT_TYPE.XMATERIAL)) {
            return this.handler.overlay_target;
        }
        return this.owner;
    }
    public get_owner_player(): number {
        return 0;
    }
    public get_handler(): Card {
        if (this.active_handler) {
            return this.active_handler;
        }
        if (this.is_type(EFFECT_TYPE.XMATERIAL)) {
            return this.handler.overlay_target;
        }
        return this.handler;

    }
    public get_handler_player(): number {
        return 0;
    }
    public in_range(p: Card | Chain): boolean {
        if (this.is_type(EFFECT_TYPE.XMATERIAL)) {
            return !!this.handler.overlay_target;
        }
        if (p instanceof Card) {
            return p.current.is_location(this.range);

        } else {
            return !!(this.range & p.triggeringLocation);
        }
    }
    public set_activate_location() { }
    public set_active_type() { }
    public get_active_type() {
        return 0;
    }
    /**
     * 校验本效果是否符合某个性质
     * @param flag 性质flag
     */
    public is_flag(flag: EFFECT_FLAG): boolean {
        return !!(this.flag[0] & flag);
    }
    /**
     * 校验本效果是否符合某个性质
     * @param flag 性质flag
     */
    public is_flag2(flag: EFFECT_FLAG2): boolean {
        return !!(this.flag[1] & flag);
    }
    /**
     * 检测效果是否符合一类效果（选发，诱发等）
     * @param type 效果类型
     */
    public is_type(type: EFFECT_TYPE): boolean {
        return !!(this.type & type);
    }
}
