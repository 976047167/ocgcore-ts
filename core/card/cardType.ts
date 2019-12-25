import { Card } from "./card";
export class CardSet extends Map<number, Card> {
    public add(card: Card) {
        this.set(card.cardId, card);
    }
    public include(card: Card) {
        return this.get(card.cardId) === card;
    }
    public remove(card: Card) {
        this.delete(card.cardId);
    }
}
