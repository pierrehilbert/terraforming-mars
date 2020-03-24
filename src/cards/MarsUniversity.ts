
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { OrOptions } from "../inputs/OrOptions";
import { SelectCard } from "../inputs/SelectCard";
import { SelectOption } from "../inputs/SelectOption";
import { CardName } from '../CardName';

export class MarsUniversity implements IProjectCard {
    public cost: number = 8;
    public tags: Array<Tags> = [Tags.SCIENCE, Tags.STEEL];
    public name: CardName = CardName.MARS_UNIVERSITY;
    public cardType: CardType = CardType.ACTIVE;

    public onCardPlayed(player: Player, game: Game, card: IProjectCard) {
        if (card.tags.indexOf(Tags.SCIENCE) !== -1) {
            return new OrOptions(
                new SelectCard("Select a card to discard", player.cardsInHand, (foundCards: Array<IProjectCard>) => {
                    player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
                    game.dealer.discard(foundCards[0]);
                    player.cardsInHand.push(game.dealer.dealCard());
                    return undefined;
                }),
                new SelectOption("Do nothing", () => {
                    return undefined;
                })
            );
        }
        return undefined;
    }
    public play() {
        return undefined;
    }
    public getVictoryPoints() {
        return 1;
    }
}
