import { Card } from "../card/card";
import Duel from "../duel";
import { Chain } from "../field/chain";
import { TEvent } from "../field/tevent";

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
    public condition: number;
    public cost: number;
    public target: number;
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
        if (this.is_type(EFFECT_TYPE.ACTIONS) ) {
            return false;
        }
        //
        if ((this.is_type(EFFECT_TYPE.SINGLE | EFFECT_TYPE.XMATERIAL)) &&
            !this.is_type ( EFFECT_TYPE.FIELD)) {
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
                           e: TEvent,
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
                if (!(this.handler.is_type ( TYPE.COUNTER))) {
                    if ((this.code < 1132 || this.code > 1149) && pduel - > game_field - > infos.phase == PHASE_DAMAGE && !is_flag(EFFECT_FLAG_DAMAGE_STEP)
                        && !pduel - > game_field - > get_cteffect(this, playerid, FALSE)) {
                        return FALSE;
                    }
                    if ((code < 1134 || code > 1136) && pduel - > game_field - > infos.phase == PHASE_DAMAGE_CAL && !is_flag(EFFECT_FLAG_DAMAGE_CAL)
                        && !pduel - > game_field - > get_cteffect(this, playerid, FALSE)) {
                        return FALSE;
                    }
                }
            }

        }
    }
    public is_action_check(playerid: number): number {
        return 0;
    }
    public is_activate_ready(playerid: number, e: TEvent, neglect_cond: number = 0, neglect_cost: number = 0, neglect_target: number = 0) {
        return 0;
    }
    public is_condition_check(playerid: number, e: TEvent): number {
        return 0;
    }
    public is_activate_check(playerid: number, e: TEvent, neglect_cond: number = 0, neglect_cost: number = 0, neglect_target: number = 0) {
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
    public get_value(extraargs: number = 0): number {
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
        if (this.is_type( EFFECT_TYPE.XMATERIAL)) {
            return this.handler.overlay_target;
        }
        return this.handler;

    }
    public get_handler_player(): number {
        return 0;
    }
    public in_range(p: Card | Chain): boolean {
        if (this.is_type( EFFECT_TYPE.XMATERIAL)) {
            return !!this.handler.overlay_target;
        }
        if (p instanceof Card) {
            return p.current.isLocation(this.range);

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
