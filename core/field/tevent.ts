import { Card } from "../card/card";
import { Effect } from "../effect/effect";

export class TEvent {
    public trigger_card: Card ;
    public event_cards: any;
    public reason_effect: Effect ;
    public event_code: number ;
    public event_value: number ;
    public reason: number ;
    public event_player: number ;
    public reason_player: number;
}
