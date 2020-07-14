import {elements} from '../base.js';

export const displaySelectedPlayers = (playerList) => {
    
    elements.selectedList.innerHTML = "";

    console.log(playerList);
    playerList.forEach(player => {
    const markup = `<div class="selectedPlayer player-${player.id}" data-playerId="${player.id}">
                            <span>${player.first_name} ${player.last_name}</span>
                            <span class="removePlayerIcon"> <i class="material-icons">highlight_off</i></span>
                        </div>`;

        elements.selectedList.insertAdjacentHTML('beforeend', markup);
    })
}

export const displayPlayerCard = (data) => {
    
    console.log(data);
    const player = data.data;
    
    const markup = `<div class="card">
                        <div class="stat">
                            <div class="stat label">GP</div>
                            <div class="stat value">${player.gp}</div>
                        </div>

                        <div class="stat">
                            <div class="stat label">MIN</div>
                            <div class="stat value">${player.min}</div>
                        </div>

                        <div class="stat">
                            <div class="stat label">FGM</div>
                            <div class="stat value">${player.fgm} </div>
                        </div>

                        <div class="stat">
                                <div class="stat label">FGA</div>
                                <div class="stat value">${player.fga}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">FGPCT</div>
                                <div class="stat value">${player.fgpct}</div>
                            </div>

                        <div class="stat">
                                <div class="stat label">FG3M</div>
                                <div class="stat value">${player.fg3m}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">fg3a</div>
                                <div class="stat value">${player.fg3a}</div>
                            </div>

                        <div class="stat">
                                <div class="stat label">fg3pct</div>
                                <div class="stat value">${player.fg3pct}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">ftm</div>
                                <div class="stat value">${player.ftm}</div>
                            </div>

                    
                            <div class="stat">
                                <div class="stat label">fta</div>
                                <div class="stat value">${player.fta}</div>
                            </div>

                        <div class="stat">
                            <div class="stat label">ftpct</div>
                            <div class="stat value">${player.ftpct}</div>
                        </div>

                        <div class="stat">
                            <div class="stat label">oreb</div>
                            <div class="stat value">${player.oreb}</div>
                        </div>

                        <div class="stat">
                            <div class="stat label">dreb</div>
                            <div class="stat value">${player.dreb}</div>
                        </div>

                        <div class="stat">
                                <div class="stat label">reb</div>
                                <div class="stat value">${player.reb}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">ast</div>
                                <div class="stat value">${player.ast}</div>
                            </div>

                        <div class="stat">
                                <div class="stat label">stl</div>
                                <div class="stat value">${player.stl}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">blk</div>
                                <div class="stat value">${player.blk}</div>
                            </div>

                        <div class="stat">
                                <div class="stat label">to</div>
                                <div class="stat value">${player.to}</div>
                            </div>

                            <div class="stat">
                                <div class="stat label">pf</div>
                                <div class="stat value">${player.pf}</div>
                            </div>

                    
                            <div class="stat">
                                <div class="stat label">pts</div>
                                <div class="stat value">${player.pts}</div>
                            </div>

                    </div>`;
        
        elements.playerStats.insertAdjacentHTML('beforeend', markup);
        
    
}