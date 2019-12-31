import Duel from "../duel";
import { Effect } from "../effect/effect";
import CardState from "./cardState";
import { CardSet } from "./cardType";
export class Card {
    public q_cache: QueryCache;
    public current: CardState;
    public cardId: number;
    public ref_handle: number;
    public pduel: Duel;
    public owner: PLAYER;
    /**
     * 卡牌的基础信息
     */
    public data: CardData;
    public previous: CardState;
    public temp: CardState;
    public summon_player: number;
    public summon_info: number;
    public status: STATUS;
    public sendto_param: any; // sendto_param_t
    public release_param: number;
    public sum_param: number;
    public position_param: number;
    public spsummon_param: number;
    public to_field_param: number;
    public attack_announce_count: number;
    public direct_attackable: number;
    public announce_count: number;
    public attacked_count: number;
    public attack_all_target: number;
    public attack_controler: number;
    public cardid: number;
    public fieldid: number;
    public fieldid_r: number;
    public turnid: number;
    public turn_counter: number;
    public unique_pos: number[]; // 2
    public unique_fieldid: number;
    public unique_code: number;
    public unique_location: number;
    public unique_function: number;
    public unique_effect: any; // effect
    public spsummon_code: number;
    public spsummon_counter: number[];
    public spsummon_counter_rst: number[];
    /** 某种属性被视为什么时,这一个变量表示属性，assume_value表示被视为的值 */
    public assume_type: ASSUME;
    /** 某种属性被视为什么时,这一个变量表示被视为的值 */
    public assume_value: number;
    public equiping_target: Card | undefined;
    public pre_equip_target: Card | undefined;
    public overlay_target: Card;
    // // public relation_map; public relations;
    // public counter_map; public counters;
    // public effect_count; public indestructable_effects;
    // public attacker_map; public announced_cards;
    // public attacker_map; public attacked_cards;
    // public attacker_map; public battled_cards;
    public equiping_cards: Card[];
    public material_cards: Card[];
    public effect_target_owner: CardSet | undefined | null;
    public effect_target_cards: CardSet | undefined | null;
    public xyz_materials: Card[];
    public single_effect: Effect[];
    public field_effect: Effect[];
    public equip_effect: Effect[];
    public xmaterial_effect: Effect[];
    // public effect_indexer; public indexer;
    // public effect_relation; public relate_effect;
    // public effect_set_v; public immune_effect;

    constructor(pd: Duel) {
        this.ref_handle = 0;
        this.pduel = pd;
        this.owner = PLAYER.NONE;
        this.sendto_param = {};
        this.release_param = 0;
        this.sum_param = 0;
        this.position_param = 0;
        this.spsummon_param = 0;
        this.to_field_param = 0;
        this.direct_attackable = 0;
        this.summon_info = 0;
        this.status = 0;
        this.current = new CardState();
        this.previous = new CardState();
        this.temp = new CardState();
        this.unique_pos = [0, 0];
        this.spsummon_counter = [0, 0];
        this.spsummon_counter_rst = [0, 0];
        this.unique_code = 0;
        this.unique_fieldid = 0;
        this.assume_type = 0;
        this.assume_value = 0;
        this.spsummon_code = 0;
        this.current.controler = PLAYER.NONE;
    }
    public get_status(status: STATUS): STATUS {
        return this.status & status;
    }
    /**
     * 判断卡片是某一种显示状态（正面背面等）
     * @param pos 显示状态
     */
    public is_position(pos): boolean {
        return !!(this.current.position & pos);
    }
    /**
     * 判断卡片是否完全符合某一状态
     * @param status 所要判断的的状态
     */
    public is_status(status: STATUS): boolean {
        if ((this.status & status) === status) {
            return true;
        }
        return false;
    }
    /**
     * 判断卡片是否为某一种卡（怪兽，魔陷等）
     * @param type 判断类型
     */
    public is_type(type: TYPE) {
        return !!(this.data.type & type);
    }
    /**
     * 遍历出本卡所受效果中所有符合code的效果
     * @param code 符合的code
     * @param sort 结果排序方式
     */
    public filter_effect(code: EFFECT_CODE, sort?: (a: any, b: any) => number): Effect[] {
        const eset = new Set<Effect>();
        const g = this.create_affected_effect_iterator(code);
        for (const effect of g) {
            eset.add(effect);
        }
        const result  = Array.from<Effect>(eset);
        if (sort) {
            result.sort(sort);
        }
        return result;
    }
    public filter_single_effect(code: EFFECT_CODE, sort?: (a: any, b: any) => number) {
        const result = [];
        const rg = this.single_effect.filter((p) => p.code === code);
        rg.forEach((peffect) => {
            if (peffect.is_available() &&
                (!peffect.is_flag(EFFECT_FLAG.SINGLE_RANGE))) {
                result.push(peffect);
            }

        });
        if (sort) {
            result.sort(sort);
        }
        return result;
    }
    /**
     * 判断是否受这个效果影响
     * @param effect 被判断的效果
     */
    public is_affect_by_effect(effect?: Effect) {
        if (this.is_status(STATUS.SUMMONING) &&
            effect.code !== EFFECT_CODE.CANNOT_DISABLE_SUMMON &&
            effect.code !== EFFECT_CODE.CANNOT_DISABLE_SPSUMMON) {
            return false;
        }
        if (!effect || effect.is_flag(EFFECT_FLAG.IGNORE_IMMUNE)) {
            return false;
        }
        if (effect.is_immuned(this)) {
            return false;
        }
        return true;
    }
    /**
     * 判断是否已经遭受某一类code效果的影响
     * @param code effect_code
     */
    public is_affected_by_effect(code: EFFECT_CODE): Effect {
        const g = this.create_affected_effect_iterator(code);
        const effect = g.next().value;
        return effect || null;
    }
    /**
     * 获取当前卡片是什么卡
     * 因为存在灵摆,古遗物之类在不同区域视为不同种类的卡
     */
    public get_type(): TYPE {
        if (this.assume_type === ASSUME.TYPE) {
            return this.assume_value;
        }
        if (!(this.current.is_location(LOCATION.ONFIELD | LOCATION.HAND | LOCATION.GRAVE))) {
            return this.data.type;
        }
        if (this.current.is_location(LOCATION.PZONE)) {
            return TYPE.PENDULUM + TYPE.SPELL;
        }
        if (this.temp.type !== 0xffffffff) {
            return this.temp.type;
        }
        const effects: Effect[] = [];
        let type = this.data.type;
        this.temp.type = type;
        effects.push(...this.filter_effect(EFFECT_CODE.ADD_TYPE));
        effects.push(...this.filter_effect(EFFECT_CODE.REMOVE_TYPE));
        effects.push(...this.filter_effect(EFFECT_CODE.CHANGE_TYPE));
        for (const effect of effects) {
            if (effect.code === EFFECT_CODE.ADD_TYPE) {
                type |= effect.get_value(this);
            } else if (effect.code === EFFECT_CODE.REMOVE_TYPE) {
                type &= ~(effect.get_value(this));
            } else {
                type = effect.get_value(this);
            }
            this.temp.type = type;
        }
        this.temp.type = 0xffffffff;
        return type;
    }
    /**
     * 生成一个（遍历出本卡所受效果中所有符合code的效果 ）的迭代器
     * @param code code
     */
    private *create_affected_effect_iterator(code: EFFECT_CODE) {
        let rg = this.single_effect.filter((p) => p.code === code);
        for (const peffect of rg) {
            if (peffect.is_available() &&
                (!peffect.is_flag(EFFECT_FLAG.SINGLE_RANGE) || this.is_affect_by_effect(peffect))) {
                yield peffect;
            }
        }
        for (const card of this.equiping_cards) {
            rg = card.equip_effect.filter((p) => p.code === code);
            for (const peffect of rg) {
                if (peffect.is_available() && this.is_affect_by_effect(peffect)) {
                    yield peffect;
                }
            }

        }
        for (const card of this.xyz_materials) {
            rg = card.xmaterial_effect.filter((p) => p.code === code);
            for (const peffect of rg) {
                if (peffect.is_type(EFFECT_TYPE.FIELD)) {
                    return;
                }
                if (peffect.is_available() && this.is_affect_by_effect(peffect)) {
                    yield peffect;
                }
            }
        }
        rg = this.pduel.game_field.effects.aura_effect.filter((p) => p.code === code);
        for (const peffect of rg) {
            if (peffect.is_flag(EFFECT_FLAG.PLAYER_TARGET) &&
                peffect.is_available() &&
                peffect.is_target(this) &&
                this.is_affect_by_effect(peffect)) {
                yield peffect;
            }
        }
    }
}

interface QueryCache {
    code: number;
    alias: number;
    type: number;
    level: number;
    rank: number;
    link: number;
    attribute: number;
    race: number;
    attack: number;
    defense: number;
    base_attack: number;
    base_defense: number;
    reason: number;
    status: number;
    lscale: number;
    rscale: number;
    link_marker: number;
}

interface CardData {
    code: number;
    alias: number;
    setcode: number;
    type: TYPE;
    level: number;
    attribute: number;
    race: number;
    attack: number;
    defense: number;
    lscale: number;
    rscale: number;
    linkMarker: number;
}
