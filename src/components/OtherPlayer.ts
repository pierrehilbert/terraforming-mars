
import Vue from "vue";

import { PlayerResources } from "./PlayerResources";
import { CardType } from '../cards/CardType';
import { StackedCards } from './StackedCards';
import { CardModel } from '../models/CardModel';

import { StackedCards } from './StackedCards';
import { PlayerMixin } from "./PlayerMixin";
import { TagCount } from './TagCount';


export const OtherPlayer = Vue.component("other-player", {
    props: ["player"],
    components: {
        "player-resources": PlayerResources,
<<<<<<< HEAD
        "stacked-cards": StackedCards
=======
        "stacked-cards": StackedCards,
        "tag-count": TagCount

>>>>>>> 89c85cb4c986b4206ed729dad44655797dfae69c
    },
    mixins: [PlayerMixin],
    methods: {
        hideMe: function () {
            (this.$root as any).setOtherPlayerVisibility(this.player.id, false);
        },
        isVisible: function () {
            return (this.$root as any).getOtherPlayerVisibility(this.player.id);
        },
        getEventCount: function() {
            let count: number = 0;
            for (let index = 0; index < this.player.playedCards.length; index++) {
                if (this.player.playedCards[index].cardType === CardType.EVENT) {
                    count++;
                } 
            }
            return count;
        },
        getActiveCards: function() {
            let cards: Array<CardModel> = [];
            for (let index = 0; index < this.player.playedCards.length; index++) {
                if (this.player.playedCards[index].cardType === CardType.ACTIVE) {
                    cards.push(this.player.playedCards[index]);
                } 
            }
            return cards;
        }
    },
    template: `
        <div> 
            <div v-show="isVisible()" class="other_player_cont menu">
                <button class="btn btn-sm btn-error other_player_close" v-on:click="hideMe()"><i class="icon icon-cross"></i></button>
                
                <h4>Player «{{ player.name }}» details</h4>
                
                <div class="player_home_block">
                    Cards In Hand: {{player.cardsInHandNbr}} - Event cards: {{ getEventCount() }}
                </div>

                <div class="player_home_block">
                    <player-resources :player="player"></player-resources>
                </div>

<<<<<<< HEAD
=======
                <div class="tag-display tags_item_cont" v-if="player.tags.length > 0">
                    <div v-for="tag in player.tags">
                        <tag-count v-if="tag.count > 0" :tag="tag.tag" :count="tag.count"> </tag-count>
                    </div>
                </div>

>>>>>>> 89c85cb4c986b4206ed729dad44655797dfae69c
                <div v-if="player.playedCards.length > 0 || player.corporationCard !== undefined" class="player_home_block">
                    <h4>Played Cards</h4>
                    <div>
                        <div v-if="player.corporationCard !== undefined" class="cardbox">
                            <card :card="player.corporationCard" :resources="player.corporationCardResources"></card>
                        </div>
<<<<<<< HEAD
                        <div v-for="card in player.playedCards" v-if="card.cardType === 'blue'" :key="card.name" class="cardbox">
                            <card :card="card.name" :resources="card.resources"></card>
                        </div>

                        <stacked-cards :cards="player.playedCards" ></stacked-cards>
=======
                        <div v-for="card in getCardsByType(player.playedCards, [getActiveCardType()])" :key="card.name" class="cardbox">
                            <card :card="card.name" :resources="card.resources"></card>
                        </div>

                        <stacked-cards :cards="getCardsByType(player.playedCards, [getAutomatedCardType(), getPreludeCardType()])" ></stacked-cards>

>>>>>>> 89c85cb4c986b4206ed729dad44655797dfae69c

                    </div>
                </div> 


            </div>
        </div>
    `
});
