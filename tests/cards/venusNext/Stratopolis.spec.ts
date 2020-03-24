import { expect } from "chai";
import { Stratopolis } from "../../../src/cards/venusNext/Stratopolis";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";
import { Resources } from "../../../src/Resources";
import { AerialMappers } from '../../../src/cards/venusNext/AerialMappers';
import { SelectCard } from '../../../src/inputs/SelectCard';

describe("Stratopolis", function () {
    it("Should play", function () {
        const card = new Stratopolis();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player, false, false, false, true);
        expect(card.canPlay(player)).to.eq(false);
        const action = card.play(player,game);
        expect(action).to.eq(undefined);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
    });
    it("Should act", function () {
        const card = new Stratopolis();
        const card2 = new AerialMappers();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);
        player.playedCards.push(card2);
        const action = card.action(player);
        expect(action instanceof SelectCard).to.eq(true);
        action.cb([card2]);
        expect(player.getResourcesOnCard(card2)).to.eq(2);
    });
});