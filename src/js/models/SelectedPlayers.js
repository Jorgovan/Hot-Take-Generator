import axios from 'axios';

export default class SelectedPlayers {
    constructor() {
        this.selected = [];
        this.data=[];
    }
    
    async addSelectedPlayer(player) {
        console.log(`adding selected player`);
        console.log(player);
        let data = await axios(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player.id}`);
        player.data = data.data.data[0];
        this.selected.push(player);
        console.log("this.selected");
        console.log(this.selected);
    }
    
    removeSelectedPlayer(id) {
        const indexOfPlayer = (element) => element.id === id;
        let index = this.selected.findIndex(indexOfPlayer);
        this.selected.splice(index, 1);
        console.log(this.selected);
    }
}