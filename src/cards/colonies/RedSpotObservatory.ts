import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from '../CardType';
import { Player } from "../../Player";
import { CardName } from '../../CardName';
import { ResourceType } from '../../ResourceType';
import { SelectOption } from "../../inputs/SelectOption";
import { OrOptions } from "../../inputs/OrOptions";
import { Game } from '../../Game';
import { IResourceCard } from '../ICard';

export class RedSpotObservatory implements IProjectCard, IResourceCard {
    public cost: number = 17;
    public tags: Array<Tags> = [Tags.JOVIAN, Tags.SCIENCE];
    public name: CardName = CardName.RED_SPOT_OBSERVATORY;
    public cardType: CardType = CardType.ACTIVE;
    public resourceType: ResourceType = ResourceType.FLOATER;
    public resourceCount: number = 0;

    public canAct(): boolean {
        return true;
    }

    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 3;
    }

    public action(player: Player, game: Game) {
        var opts: Array<SelectOption> = [];
        const addResource = new SelectOption("Add 1 floater on this card", () => {
            this.resourceCount++;
            return undefined;
        });

        const spendResource = new SelectOption("Remove 1 floater on this card to draw a card", () => {
            this.resourceCount--;
            player.cardsInHand.push(game.dealer.dealCard());
            return undefined;
        });

        opts.push(addResource);

        if (this.resourceCount > 0 ) {
            opts.push(spendResource);
        } else {
            return addResource;
        }

        return new OrOptions(...opts);
    }

    public play(player: Player, game: Game) {
        player.cardsInHand.push(game.dealer.dealCard());
        player.cardsInHand.push(game.dealer.dealCard());  
        return undefined;
    }

    public getVictoryPoints(): number {
        return 2;
    }
}