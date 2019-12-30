import { Card } from "./card";
export default class CardState {
    public code: number;
    public code2: number;
    public setcode: number;
    public type: TYPE;
    public level: number;
    public rank: number;
    public link: number;
    public lscale: number;
    public rscale: number;
    public attribute: number;
    public race: number;
    public attack: number;
    public defence: number;
    public baseAttack: number;
    public baseDefense: number;
    public controler: number;
    public location: LOCATION;
    public sequence: number;
    public position: number;
    public reason: number;
    public pzone: boolean;
    public reasonCard: Card;
    public reasonPlayer: number;
    public reasonEffect: any;
    /** 判断当前状态是否位于某个区域 */
    public is_location(loc: LOCATION): boolean {
        if ((loc & LOCATION.FZONE) && this.location === LOCATION.SZONE && this.sequence === 5) {
            return true;
        }
        if ((loc  & LOCATION.PZONE) && this.location === LOCATION.SZONE && this.pzone) {
            return true;
        }
        if (this.location & loc) {
            return true;
        }
        return false;
    }
}
