export class Card {
    public q_cache: QueryCache;
    public current: CardState;

}

export class CardData {
    public code: number;
    public alias: number;
    public setcode: number;
    public type: number;
    public level: number;
    public attribute: number;
    public race: number;
    public attack: number;
    public defense: number;
    public lscale: number;
    public rscale: number;
    public linkMarker: number;
    public clear() {
    }
}
export class CardState {
    public code: number;
    public code2: number;
    public setcode: number;
    public type: number;
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
    public location: number;
    public sequence: number;
    public position: number;
    public reason: number;
    public pzone: number;
    public reasonCard: Card;
    public reasonPlayer: number;
    public reasonEffect: any;
    public isLocation(loc: number): boolean {
        return true;
    }
}

class QueryCache {
    public code: number;
    public alias: number;
    public type: number;
    public level: number;
    public rank: number;
    public link: number;
    public attribute: number;
    public race: number;
    public attack: number;
    public defense: number;
    public base_attack: number;
    public base_defense: number;
    public reason: number;
    public status: number;
    public lscale: number;
    public rscale: number;
    public link_marker: number;
}
