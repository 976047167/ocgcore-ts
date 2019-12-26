import Duel from "../duel";
import { CardData } from "./CardData";
import CardState from "./cardState";
import { CardSet } from "./cardType";
export class Card {
    public q_cache: QueryCache|undefined|null;
    public current: CardState;
    public cardId: number;
    public ref_handle: number;
    public pduel: Duel;
    public owner: PLAYER;
	public data: CardData;
	public previous: CardState;
	public temp: CardState;
	public owner: number;
	public summon_player: number;
    public summon_info: number;
	public status: number;
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
	public assume_type: number;
	public assume_value: number;
    public equiping_target: Card|undefined|null;
    public pre_equip_target: Card|null|undefined;
    public overlay_target: Card|null|undefined;
	// // public relation_map; public relations;
	// public counter_map; public counters;
	// public effect_count; public indestructable_effects;
	// public attacker_map; public announced_cards;
	// public attacker_map; public attacked_cards;
	// public attacker_map; public battled_cards;
	public equiping_cards: CardSet|undefined|null;
	public material_cards: CardSet|undefined|null;
	public effect_target_owner: CardSet|undefined|null;
	public effect_target_cards: CardSet|undefined|null;
	// public card_vector; public xyz_materials;
	// public effect_container; public single_effect;
	// public effect_container; public field_effect;
	// public effect_container; public equip_effect;
	// public effect_container; public xmaterial_effect;
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
        this.unique_pos[0] = this. unique_pos[1] = 0;
        this.spsummon_counter[0] = this.spsummon_counter[1] = 0;
        this.spsummon_counter_rst[0] = this.spsummon_counter_rst[1] = 0;
        this.unique_code = 0;
        this.unique_fieldid = 0;
        this.assume_type = 0;
        this.assume_value = 0;
        this.spsummon_code = 0;
        this.current.controler = PLAYER.NONE;
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

