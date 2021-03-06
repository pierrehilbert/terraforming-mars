import {ICard} from './ICard';

import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {Game} from '../Game';
import {SelectCard} from '../inputs/SelectCard';
import { Resources } from '../Resources';
import { CardName } from '../CardName';

export class EosChasmaNationalPark implements IProjectCard {
  public cost: number = 16;
  public nonNegativeVPIcon: boolean = true;
  public tags: Array<Tags> = [Tags.PLANT, Tags.STEEL];
  public name: CardName = CardName.EOS_CHASMA_NATIONAL_PARK;
  public cardType: CardType = CardType.AUTOMATED;

  public canPlay(player: Player, game: Game): boolean {
    return game.getTemperature() >= -12 - (
      2 * player.getRequirementsBonus(game)
    );
  }

  public play(player: Player, game: Game) {   
    const availableCards = game.getPlayedCardsWithAnimals();
    if (availableCards.length < 1) {
      player.plants += 3;
      player.setProduction(Resources.MEGACREDITS,2);
      return undefined;
    }

    if (availableCards.length === 1) {
      game.getCardPlayer(availableCards[0].name).addResourceTo(availableCards[0]);
      player.plants += 3;
      player.setProduction(Resources.MEGACREDITS,2);
      return undefined;
    }

    return new SelectCard(
        'Select card to add 1 animal',
        availableCards,
        (foundCards: Array<ICard>) => {
          game.getCardPlayer(foundCards[0].name).addResourceTo(foundCards[0]);
          player.plants += 3;
          player.setProduction(Resources.MEGACREDITS,2);
          return undefined;
        }
    );
  }

  public getVictoryPoints() {
    return 1;
  }

}