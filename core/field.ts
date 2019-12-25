import { Card } from "./card/card";

export class Chain {
    public static chainOperationSort( c1: Chain, c2: Chain): boolean {
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
    public setTriggeringState(card: Card) {
        this.triggeringControler = card.current.controler;

    }

}
