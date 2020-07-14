import playerSearch from './models/PlayerSearch.js';
import playerDatabase from './models/playerDatabase.js';
import selectedPlayers from './models/SelectedPlayers.js';
import PlayerModel from './models/BuildPlayer.js';
// import '../css/style.css';

import axios from 'axios';


import { elements } from './base.js';

import * as playerSearchView from './views/playerSearchView';
import * as selectedPlayersView from './views/selectedPlayersView';

const state = {}


const controlSearch = async () => {
    // perform search
    let query = playerSearchView.getInput();
    
    
    state.playerSearch = new playerSearch(query);
    
    try {
        await state.playerSearch.searchIterator();
                
        playerSearchView.clearInput();
        playerSearchView.clearResults();
        
        playerSearchView.displayResults(state.playerSearch.results);
        
        //playerSearchView.renderSearchedPlayer(state.playerSearch.results)

    } catch (err) {
        alert("err");
    }
    
    
    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchPages.addEventListener('click', e=> {
   const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        playerSearchView.clearResults();

        playerSearchView.displayResults(state.playerSearch.results, goToPage);
    }
});


/*
/* EVENT LISTENER ON SEARCH RESULTS*/

elements.searchResults.addEventListener('click', e=> {
    if(e.target.matches('.player, .player *')){
        
        let playerId = e.target.closest('.player');
        //         const goToPage = parseInt(btn.dataset.goto, 10);
        playerId = parseInt(playerId.getAttribute('data-playerId'));
        console.log(`player id is ${playerId}`);
        state.playerSearch.results.forEach(el => {if(el.id == playerId) controlSelect(el)  });
    }
})

/* SELECTED PLAYERS LIST */

let controlSelect = async (player) => {
    // Its simpler to pass only the player id to this function, then pull the data from the search array
    // We check for list of selected players, if there is none, we create our own
    if(!state.selectedPlayers) state.selectedPlayers = new selectedPlayers();

    //We check is the player already selected
    
    if(!state.selectedPlayers.selected.includes(player)) {
    
    
        console.log("nije u listi, dodajemo");
        
        await state.selectedPlayers.addSelectedPlayer(player);

        console.log(state.selectedPlayers.selected);
        
        selectedPlayersView.displaySelectedPlayers(state.selectedPlayers.selected);
    }
}


/* Remove selected player */

elements.selectedList.addEventListener('click', e=> {
    if(e.target.matches(`.removePlayerIcon, .removePlayerIcon *`)) {
        let player = e.target.closest('.selectedPlayer');
        let playerId = parseInt(player.getAttribute('data-playerId'));
        console.log(playerId);
        state.selectedPlayers.removeSelectedPlayer(playerId);
        selectedPlayersView.displaySelectedPlayers(state.selectedPlayers.selected);

    }
});

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



/*PLAYER MODEL*/

// flag which we use to check if we are already building a player model, preventing double clicks to make unnecesarry  API calls
let isBuildingModel = false;

elements.buildModel.addEventListener('click', e=> {
   // we check if we have selected players and if we are already building a model
    if(state.selectedPlayers.selected && !isBuildingModel) {
        
            controlBuildModel();
        
    }
    
});


const controlBuildModel = async () => {
    
    isBuildingModel = true;

    //we check if there already is a list of player models, if not we create a new one
    if(!state.playerModel) {state.playerModel = []}
    
    //we iterate the list of selected players, checking if a certain player model already exists
    //ForEach loop does not work bcoz it does not return promise, we  use for...of
    for(const e of state.selectedPlayers.selected) {
        if(!state.playerModel[e.id]) {
            state.playerModel[e.id] = new PlayerModel(e.id);

                
                await state.playerModel[e.id].searchIterator(e.id);
                console.log(state.playerModel[e.id]);
                selectedPlayersView.displayPlayerCard(state.playerModel[e.id]);
        }
    }
    isBuildingModel = false;

}



