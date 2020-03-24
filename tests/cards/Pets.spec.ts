
import { expect } from "chai";
import { Pets } from "../../src/cards/Pets";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("Pets", function () {
    it("Should throw", function () {
        const card = new Pets();
        const player = new Player("test", Color.BLUE, false);
        const player2 = new Player("test2", Color.RED, false);
        const game = new Game("foobar", [player,player2], player);
        player.playedCards.push(card);
        expect(function () { player.removeAnimals(player, card, 5, game); }).to.throw("Animals may not be removed from pets");
    });
    it("Should play", function () {
        const card = new Pets();
        const player = new Player("test", Color.BLUE, false);
        const player2 = new Player("test2", Color.RED, false);
        player.playedCards.push(card);
        const game = new Game("foobar", [player,player2], player);
        const action = card.play();
        expect(action).to.eq(undefined);
        player.addResourceTo(card, 4);
        expect(card.getVictoryPoints()).to.eq(2);
        game.addCityTile(player, game.board.getAvailableSpacesOnLand(player)[0].id);
        expect(card.resourceCount).to.eq(6);
    });
});
