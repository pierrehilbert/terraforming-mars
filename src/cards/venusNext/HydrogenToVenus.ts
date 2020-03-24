import {ICard} from '../ICard';
import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from '../../Game';
import { ResourceType } from '../../ResourceType';
import { SelectCard } from '../../inputs/SelectCard';
import { CardName } from '../../CardName';

export class HydrogenToVenus implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: CardName = CardName.HYDROGEN_TO_VENUS;
    public cardType: CardType = CardType.EVENT;

    public play(player: Player, game: Game) {
        const jovianTags: number = player.getTagCount(Tags.JOVIAN);
        const floatersCards = player.getResourceCards(ResourceType.FLOATER);
        if (jovianTags > 0 && floatersCards.length > 0) {
            return new SelectCard(
                'Select card to add ' + jovianTags + ' floater(s)',
                floatersCards,
                (foundCards: Array<ICard>) => {
                    player.addResourceTo(foundCards[0], jovianTags);
                game.increaseVenusScaleLevel(player,1);
                return undefined;
                }
            );
        }
        game.increaseVenusScaleLevel(player,1);
        return undefined;
    }
}