import axios from 'axios';

export default class playerSearch {
    constructor (query) {
        this.query = query;
        this.results = [];
    }
    
    async getResults (nextPage) {
        try {
            const newResults = await axios(`https://www.balldontlie.io/api/v1/players?search=${this.query}&page=${nextPage}`);
                        
            this.results = this.results.concat(newResults.data.data);
                        
            return newResults.data.meta.next_page;
            
        } catch (error) {
            console.log("error");
        }
    }
    // since api returns results in page form, each page containing a set number of results, we need to iterate pages
    async searchIterator () {
        let pageNumber = 1;
        let nextPage = 1;
        
        do{
            nextPage = await this.getResults(nextPage);
            console.log(nextPage);
            
            
        } while (nextPage!=null);
        
        
    }
    
    
}