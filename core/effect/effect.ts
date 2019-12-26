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
    public count_limit: number;
    public count_limit_max: number;
    public reset_count: number;
    public reset_flag: number;
    public count_code: number;
    public category: number;
    public hint_timing: number[]; // 2
    public card_type: number;
    public active_type: number;
    public active_location: number;
    public active_sequence: number;
    public active_handler: Card | undefined;
    public status: number;
    public label: number[];
    public label_object: number;
    public condition: number;
    public cost: number;
    public target: number;
    public value: number;
    public operation: number;
    private owner: Card | undefined;
    private handler: Card | undefined;
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
        if (this.type & EFFECT_TYPE.ACTIONS) {
            return false;
        }
        if ((this.type & (EFFECT_TYPE.SINGLE | EFFECT_TYPE.XMATERIAL)) &&
            !(this.type & EFFECT_TYPE.FIELD)) {

        }
        return false;
    }
    public check_count_limit(playerid: number): number {

        return 0;
    }
    public is_activateable(playerid: number, e: TEvent, neglect_cond: number = 0, neglect_cost: number = 0, neglect_target: number = 0, neglect_loc: number = 0, neglect_faceup: number = 0): number {

        return 0;
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
    public get_owner(): Card | undefined {
        return this.owner;
    }
    public get_owner_player(): number {
        return 0;
    }
    public get_handler(): Card | undefined {
        return this.handler;

    }
    public get_handler_player(): number {
        return 0;
    }
    // in_range( pcard:Card):number{

    //     return 0
    // };
    // in_range( ch:Chain):number{

    //     return 0
    // };
    public set_activate_location() { }
    public set_active_type() { }
    public get_active_type() {
        return 0;
    }
    public is_flag(flag: EFFECT_FLAG): boolean {
        return !!(this.flag[0] & flag);
    }
    public is_flag2(flag: EFFECT_FLAG2): boolean {
        return !!(this.flag[1] & flag);
    }
}
