import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { CardName } from '../../CardName';

export class WaterToVenus implements IProjectCard {
    public cost: number = 9;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: CardName = CardName.WATER_TO_VENUS;
    public cardType: CardType = CardType.EVENT;

    public play(player: Player, game: Game) {
        game.increaseVenusScaleLevel(player,1);
        return undefined;
    }

}