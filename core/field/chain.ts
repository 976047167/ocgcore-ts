import { Card } from "../card/card";
import { LOCATION } from "../common";
export class Chain {
    public static chainOperationSort(c1: Chain, c2: Chain): boolean {
        return c1.triggeringEffect.id < c2.triggeringEffect.id;
    }
    public chainId: number;
    public chainCount: number;
    public triggeringPlayer: number;
    public triggeringLocation: number;
    public triggeringControler: number;
    public triggeringSequence: number;
    public triggeringPosition: number;
    public triggeringState: any;
    public triggeringEffect: any;
    public targetCards: any;
    public replaceOp: number;
    public targetPlyaer;
    public targetParam;
    public disableReason;
    public disablePlayer;
    public evt: any;
    public opinfos;
    public flag: number;
    public setTriggeringState(pcard: Card) {
        this.triggeringControler = pcard.current.controler;
        if (pcard.current.isLocation(LOCATION.FZONE)) {
            this.triggeringLocation = LOCATION.SZONE | LOCATION.FZONE;
        } else if (pcard.current.isLocation(LOCATION.PZONE)) {
            this.triggeringLocation = LOCATION.SZONE | LOCATION.PZONE;
        } else {
            this.triggeringLocation = pcard.current.location;
        }
        this.triggeringSequence = pcard.current.sequence;
        this.triggeringPosition = pcard.current.position;
        this.triggeringState.code = pcard.get_code();
        this.triggeringState.code2 = pcard.get_another_code();
        this.triggeringState.level = pcard.get_level();
        this.triggeringState.rank = pcard.get_rank();
        this.triggeringState.attribute = pcard.get_attribute();
        this.triggeringState.race = pcard.get_race();
        this.triggeringState.attack = pcard.get_attack();
        this.triggeringState.defense = pcard.get_defense();
    }
}
