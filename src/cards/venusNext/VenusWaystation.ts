import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from '../../Game';
import { CardName } from '../../CardName';

export class VenusWaystation implements IProjectCard {
    public cost: number = 9;
    public tags: Array<Tags> = [Tags.VENUS, Tags.SPACE];
    public name: CardName = CardName.VENUS_WAYSTATION;
    public cardType: CardType = CardType.ACTIVE;

    public play() {
        return undefined;
    }
    public getCardDiscount(_player: Player, _game: Game, card: IProjectCard) {
        return card.tags.filter(tag => tag === Tags.VENUS).length * 2;
    }
    public getVictoryPoints() {
        return 1;
    }
}    