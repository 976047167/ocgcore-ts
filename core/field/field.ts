import { Card } from "../card/card";
import Duel from "../duel";
import { field_effect, field_info, player_info, tevent } from "./interface";

export default class Field {
    public pduel: Duel;
    public player: player_info;
    public temp_card: Card;
    public infos: field_info;
    // lpcost cost[2];
    public effects: field_effect;
    public core: any;
    public returns;
    public nil_event: tevent;
    constructor(duel: Duel) {
        this.pduel = duel;
        this.infos = {
            field_id: 1,
            copy_id: 1,
            can_shuffle: true,
            turn_id: 0,
            turn_id_by_player: [0, 0],
            card_id: 1,
            phase: 0,
            turn_player: 0,
            priorities: [0, 0],
        };
        for (let i = 0; i < 2; ++i) {
            this.player[i] = {
                lp: 8000,
                start_count: 5,
                draw_count: 1,
                disabled_location: 0,
                used_location: 0,
                extra_p_count: 0,
                tag_extra_p_count: 0,
                list_mzone: [],
                list_szone: [],
                list_main: [],
                list_hand: [],
                list_grave: [],
                list_remove: [],
                list_extra: [],

            };
        }
    }
}
