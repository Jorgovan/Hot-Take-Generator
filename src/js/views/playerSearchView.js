import {elements} from '../base.js';

export const getInput = () => elements.searchField.value;

export const clearInput = () => elements.searchField.value = '';

export const clearResults = () => { 
    elements.searchPages.innerHTML = '';
    elements.searchResults.innerHTML = '';
}

export const displayResults = (results, page=1, resPerPage=7) => {
    
    // we sort results by height parameter, since more popular players have height value 
    results.sort((a, b) =>{
        
        if (a.height_feet == null) {
            return 1;
        }
        return -1;
    });
    
    console.log(results);
    
    
    const start = (page-1)*resPerPage;
    const end = page * resPerPage;
    results.slice(start, end).forEach(renderSearchedPlayer);
    renderButtons(page, results.length, resPerPage);
    
}

const renderSearchedPlayer = (player) => {

    const markup = ` <div class="player" data-playerId="${player.id}">
                <p class="player__position">${player.position}</p>
                <p class="player__name">${player.first_name} ${player.last_name}</p>
                <p class="player__team">${player.team.full_name}</p>
                <br>
            </div>`;
    
    elements.searchResults.insertAdjacentHTML('beforeend', markup);

}

//***
//Search buttons for next and previous page
//***

const renderButtons = (page, numResults, resPerPage) => {
    //calculate the total number of pages
    const pages = Math.ceil(numResults/resPerPage);
    if(page == 1 && pages > 1) {
        createButton(1,'next');
    } else if(page>1) {
        createButton(page, 'prev');
        if(page<pages) {
            createButton(page, 'next');
        }
    }
}


const createButton = (page, type) => {
    console.log("loaded");
    const markup = `<button class="btn-inline search__btn--${type}'" data-goto = ${type == 'prev' ? page-1 : page+1 }>
        <div> ${ type =='prev' ? "<": ""} Page ${type == 'prev' ?  + page-1 : page+1 + ' >' }</div>
        
    </button>
    `;
    elements.searchPages.insertAdjacentHTML('beforeend', markup);
}


