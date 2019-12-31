import { Card } from "../card/card";
import { Effect } from "../effect/effect";

export interface tevent {
    trigger_card: Card;
    event_cards: any;
    reason_effect: Effect;
    event_code: number;
    event_value: number;
    reason: number;
    event_player: number;
    reason_player: number;
}
export interface player_info {
    /** 生命值 */
    lp: number;
    /** 初始手牌数 */
    start_count: number;
    /** 每回合抽卡数 */
    draw_count: number;
    /** 已用场地 */
    used_location: number;
    /** 已不可用用场地 */
    disabled_location: number;
    extra_p_count: number;
    tag_extra_p_count: number;
    list_mzone: Card[];
    list_szone: Card[];
    list_main: Card[];
    list_grave: Card[];
    list_hand: Card[];
    list_remove: Card[];
    list_extra: Card[];
    tag_list_main: Card[];
    tag_list_hand: Card[];
    tag_list_extra: Card[];
}
export interface field_effect {
    aura_effect: Effect[];
    ignition_effect: Effect[];
    activate_effect: Effect[];
    trigger_o_effect: Effect[];
    trigger_f_effect: Effect[];
    quick_o_effect: Effect[];
    quick_f_effect: Effect[];
    continuous_effect: Effect[];
    /** 原本代码中是effct的反查表，此处作为以上所有effect的集合使用 */
    indexer: Effect[];
    oath: Map<Effect, Effect>;
    pheff: Set<Effect>;
    cheff: Set<Effect>;
    rechargeable: Set<Effect>;
    spsummon_count_eff: Set<Effect>;
    disable_check_list: Card[];
    grant_effect: Map<Effect, Map<Card, Effect>>;
}
export interface field_info {
    field_id: number;
    copy_id: number;
    turn_id: number;
    turn_id_by_player: number[]; // 2
    card_id: number;
    phase: number;
    turn_player: number;
    priorities: number[]; // 2
    can_shuffle: boolean;
}
