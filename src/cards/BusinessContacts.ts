
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {Game} from '../Game';
import {SelectCard} from '../inputs/SelectCard';
import { CardName } from '../CardName';

export class BusinessContacts implements IProjectCard {
    public cost: number = 7;
    public tags: Array<Tags> = [Tags.EARTH];
    public name: CardName = CardName.BUSINESS_CONTACTS;
    public cardType: CardType = CardType.EVENT;

    public play(player: Player, game: Game) {
      const cards: Array<IProjectCard> = [
        game.dealer.dealCard(),
        game.dealer.dealCard(),
        game.dealer.dealCard(),
        game.dealer.dealCard()
      ];
      return new SelectCard(
          'Select cards to keep of top 4 cards from deck',
          cards,
          (found: Array<IProjectCard>) => {
            player.cardsInHand.push(found[0], found[1]);
            cards.forEach((card) => {
              if (found.find((f) => f.name === card.name) === undefined) {
                game.dealer.discard(card);
              }
            });
            return undefined;
          }, 2, 2
      );
    }
}
