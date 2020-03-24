import { CorporationCard } from "../corporation/CorporationCard";
import { Player } from "../../Player";
import { Tags } from "../Tags";
import { ResourceType } from '../../ResourceType';
import { CardName } from '../../CardName';
import { IResourceCard } from '../ICard';

export class Pristar implements CorporationCard, IResourceCard {
    public name: CardName = CardName.PRISTAR;
    public tags: Array<Tags> = [];
    public startingMegaCredits: number = 53;
    public resourceType: ResourceType = ResourceType.PRESERVATION;
    public resourceCount: number = 0;
    private lastGenerationTR: number = 0;

    public play(player: Player) {
        player.terraformRating -= 2;
        this.lastGenerationTR = player.terraformRating;
        return undefined;
    }

    public getVictoryPoints(): number {
        return Math.floor(this.resourceCount);
    }

    public onProductionPhase(player: Player) {
        if (this.lastGenerationTR >= player.terraformRating) {
            player.megaCredits += 6;
            this.resourceCount++;
        }
        this.lastGenerationTR = player.terraformRating;
        return undefined;
    }
}