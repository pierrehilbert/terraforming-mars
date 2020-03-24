import { CorporationCard } from "../corporation/CorporationCard";
import { Player } from "../../Player";
import { Tags } from "../Tags";
import { Game } from '../../Game';
import { SelectOption } from '../../inputs/SelectOption';
import { OrOptions } from '../../inputs/OrOptions';
import { CardName } from '../../CardName';

export class Poseidon implements CorporationCard {
    public name: CardName =  CardName.POSEIDON;
    public tags: Array<Tags> = [];
    public startingMegaCredits: number = 45;

    public initialAction(player: Player, game: Game) {
        let openColonies = game.colonies.filter(colony => colony.isActive && colony.visitor === undefined);
        let buildColony = new OrOptions();
        buildColony.title = "Poseidon first action - Select where to build colony";
        openColonies.forEach(colony => {
          const colonySelect =  new SelectOption(
            colony.name + " - (" + colony.description + ")", 
            () => {
                colony.onColonyPlaced(player, game);
                return undefined;
            }
          );
          buildColony.options.push(colonySelect);
        });
        return buildColony;
    }

    public play() {
        return undefined;
    }


}
