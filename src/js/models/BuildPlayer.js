// uzeti igrača od kontrolera
import axios from 'axios';

export default class PlayerModel {
    constructor(id) {
        this.id = id;
        this.selected = [];
        this.data=[];
    }
    
    addSelectedPlayer(player) {
        this.selected.push(player);
    };

    
    async dataFormat() {
        let sorted = [];
        let keys = ["ast",
      "blk", "dreb","fg3_pct","fg3a","fg3m","fg_pct","fga","fgm","ft_pct","fta","ftm","min","oreb","pf","pts", "reb", "stl","turnover"]
        
        this.data.forEach(singleGame => {
            
           
            
            // ignoring those games which player sits out
            if(singleGame.min === null || singleGame.min === 0) { return}
            
            // index represents index of season in sorted array, if not found its 
            let index = -1;

            if(sorted.some(e=>  e.season === singleGame.game.season)) {
                index = sorted.findIndex(e => e.season === singleGame.game.season);
            } 
            if(index != -1)
                    {
                        //if we did find season in array, we need to push game data into postseason or regular season array 
                        if(singleGame.game.postseason) {
                        /*    if(!sorted[index].postseason){
                                sorted[index].postseason = [];
                                sorted[index].postseasonAvg = [];
                            } */
                            sorted[index].postseason.push(singleGame);    
                        } else {
                           /* if(!sorted[index].regularseason){
                                sorted[index].regularseason = [];
                                sorted[index].regularseasonAvg = [];
                            } */
                            sorted[index].regularseason.push(singleGame);
                        }
            } else {
            // if we didnt find season in array, we add an object to it
                if(singleGame.game.postseason) {
                    sorted.push({"season": singleGame.game.season, "regularseason": [], "regularseasonAvg": [], "postseason": [singleGame], "postseasonAvg": []})
                } else {
                    sorted.push({"season": singleGame.game.season, "regularseason": [singleGame], "regularseasonAvg": [], "postseason": [],  "postseasonAvg": []})
                }            
            }
        })
        sorted.forEach(season => {
            season.regularseason.reduce((acc, next) => {
                for (let prop in next) {
                    if (acc.hasOwnProperty(prop)) acc [prop] += n[prop];
                    else acc[prop] = n [prop];
                }
                console.log("prosjek u regularnoj sezoni");
                console.log(acc);
            })
                
            })
        
        this.data=sorted;
    }

    async getPlayerData (nextPage, id) {
        let player;
        

        try {
            player = await axios(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&page=${nextPage}`);
            
            this.data = this.data.concat(player.data.data);
            //if we get an error in axios request, next page remains same as in previous iteration, thus trying to repeat same request
            nextPage = player.data.meta.next_page;
            
            } catch (error) {
                
                //API allows only 60 calls per min, if exceeded it throws 429 error
                if(error.response.status==429) {
                    console.log("uhvaćen");
                    
                    
                    //  when we exceed call limit, we wait for 10 secs before continuing
                       // set timeout is wrapped in a promise because it doesnt return a promise 
                    
    
                    const sleep = () => new Promise(r=> setTimeout(r, 30000));
                    await sleep();
                    
                }
                console.log(Object.keys(error));
                console.log(error.response.status);
            } finally {
                            
                // return nextPage;
                
                return nextPage;
                
            }
        
    }
    async searchIterator (id) {
        let pageNumber = 1;
        let nextPage = 1;
        
        do{
            
            let currPage = nextPage;
            nextPage = await this.getPlayerData(nextPage, id);  
            
        } while (nextPage!=null);

        // before end we format the data
        this.dataFormat();
        console.log(this.data);

    }
    
}