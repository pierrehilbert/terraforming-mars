
import { CorporationCard } from "./CorporationCard";
import { Tags } from "../Tags";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { SelectSpace } from "../../inputs/SelectSpace";
import { SpaceType } from "../../SpaceType";
import { ISpace } from "../../ISpace";
import { TileType } from "../../TileType";
import { Resources } from '../../Resources';
import { CardName } from '../../CardName';

export class TharsisRepublic implements CorporationCard {
    public name: CardName = CardName.THARSIS_REPUBLIC;
    public tags: Array<Tags> = [Tags.STEEL];
    public startingMegaCredits: number = 40;
    public initialAction(player: Player, game: Game) {
        return new SelectSpace("Select space on mars for city tile", game.board.getAvailableSpacesForCity(player), (space: ISpace) => {
            game.addCityTile(player, space.id);
            return undefined;
        });
    }
    public onTilePlaced(player: Player, space: ISpace) {
        if (space.tile !== undefined && space.tile.tileType === TileType.CITY) {
            if (space.player === player) {
                player.megaCredits += 3;
            }
            if (space.spaceType !== SpaceType.COLONY) {
                player.setProduction(Resources.MEGACREDITS);
            }
        }
    }
    public play(player: Player, game: Game) {
        if (game.getPlayers().length == 1) {
            // Get bonus for 2 neutral cities
            player.setProduction(Resources.MEGACREDITS,2);
        }
        return undefined;
    }
}
