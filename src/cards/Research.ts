
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { CardName } from '../CardName';

export class Research implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SCIENCE, Tags.SCIENCE];
    public name: CardName = CardName.RESEARCH;
    public cardType: CardType = CardType.AUTOMATED;

    public play(player: Player, game: Game) {
        for (let i = 0; i < 2; i++) {
            player.cardsInHand.push(game.dealer.dealCard());
        }
        return undefined;
    }
    public getVictoryPoints() {
        return 1;
    }
}
