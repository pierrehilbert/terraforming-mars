
import {ICard, IActionCard} from './ICard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {Game} from '../Game';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {SelectCard} from '../inputs/SelectCard';
import {IProjectCard} from './IProjectCard';
import { ResourceType } from '../ResourceType';
import { CardName } from '../CardName';

export class ExtremeColdFungus implements IActionCard, IProjectCard {
    public cost: number = 13;
    public tags: Array<Tags> = [Tags.MICROBES];
    public cardType: CardType = CardType.ACTIVE;
    public name: CardName = CardName.EXTREME_COLD_FUNGUS;
    public canPlay(player: Player, game: Game): boolean {
      return game.getTemperature() <= -10 + (
        2 * player.getRequirementsBonus(game)
      );
    }
    public play() {
      return undefined;
    }
    public canAct(): boolean {
      return true;
    }
    public action(player: Player) {
      const otherMicrobeCards = player.getResourceCards(ResourceType.MICROBE);
      if (otherMicrobeCards.length > 0) {
        return new OrOptions(
            new SelectOption('Gain 1 plant', () => {
              player.plants++; return undefined;
            }),
            new SelectCard(
                'Select card to add 2 microbes',
                otherMicrobeCards,
                (foundCards: Array<ICard>) => {
                  player.addResourceTo(foundCards[0], 2);
                  return undefined;
                }
            )
        );
      }
      player.plants++;
      return undefined;
    }
}
