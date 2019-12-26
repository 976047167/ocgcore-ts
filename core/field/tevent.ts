import { Card } from "../card/card";
import { Effect } from "../effect/effect";

export class TEvent {
    public trigger_card: Card | undefined;
    public event_cards: any;
    public reason_effect: Effect | undefined;
    public event_code: number | undefined;
    public event_value: number | undefined;
    public reason: number | undefined;
    public event_player: number | undefined;
    public reason_player: number | undefined;
}
