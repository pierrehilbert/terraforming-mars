import { IProjectCard } from "../IProjectCard";
import { ICard, IActionCard, IResourceCard } from '../ICard';
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { ResourceType } from "../../ResourceType";
import { SelectCard } from '../../inputs/SelectCard';
import { CardName } from '../../CardName';

export class Extremophiles implements IActionCard,IProjectCard, IResourceCard {
    public cost: number = 3;
    public tags: Array<Tags> = [Tags.VENUS, Tags.MICROBES];
    public name: CardName = CardName.EXTREMOPHILES;
    public cardType: CardType = CardType.ACTIVE;
    public resourceType: ResourceType = ResourceType.MICROBE;
    public resourceCount: number = 0;
    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 2 ;
    }
    public play() {
        return undefined;
    }
    public canAct(): boolean {
        return true;
    }  

    public getVictoryPoints(): number {
        return Math.floor(this.resourceCount / 3);
    }
    
    public action(player: Player) {
        const microbeCards = player.getResourceCards(ResourceType.MICROBE);
        if (microbeCards.length === 1) {
            this.resourceCount++;
            return undefined;
        }

        return new SelectCard(
            'Select card to add 1 microbe',
            microbeCards,
            (foundCards: Array<ICard>) => {
                player.addResourceTo(foundCards[0], 1);
                return undefined;
            }
        );
    }
}