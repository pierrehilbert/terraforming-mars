import { IColony } from './Colony';
import { Europa } from './Europa';
import { Ganymede } from './Ganymede';
import { Titan } from './Titan';
import { Callisto } from './Callisto';
import { Triton } from './Triton';
import { Ceres } from './Ceres';
import { Luna } from './Luna';
import { Io } from './Io';
import { Miranda } from './Miranda';
import { Pluto } from './Pluto';
import { Enceladus } from './Enceladus';

export class ColonyDealer {
    //private seed: number = 0;
    public coloniesDeck: Array<IColony> = [];
    public discardedColonies: Array<IColony> = [];
    private ALL_COLONIES_TILES: Array<IColony> = [
        new Ceres(),
        new Enceladus(),
        new Europa(),
        new Ganymede(),
        new Io(),
        new Luna(),
        new Miranda(),
        new Titan(),
        new Callisto(),
        new Pluto(),
        new Triton()
    ];
    /*
    constructor(seed?: number) {
        if (seed !== undefined) {
            this.seed = seed;
        } else {
            this.seed = Math.random();
        }
    }
    */

    public shuffle(cards: Array<any>): Array<any> {
        const deck: Array<any> = [];
        const copy = cards.slice();
        while (copy.length) {
            // not working, disable for now
            //deck.push(copy.splice(Math.floor(this.seed * copy.length), 1)[0]);
            deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
        }
        return deck;
    }
    public discard(card: IColony): void {
        this.discardedColonies.push(card);
    }
    public drawColonies(players: number): Array<IColony> {
        let count: number = players + 2;
        if (players === 1) {
            count = 4;
        } else if (players === 2) {
            count = 5;
        }
        let tempDeck = this.shuffle(this.ALL_COLONIES_TILES);
        for (let i = 0; i < count; i++) {
            this.coloniesDeck.push(tempDeck.pop());
        }    
        this.discardedColonies.push(...tempDeck);
        this.discardedColonies.sort((a,b) => (a.name > b.name) ? 1 : -1);
        this.coloniesDeck.sort((a,b) => (a.name > b.name) ? 1 : -1);

        return this.coloniesDeck;
    }

}    