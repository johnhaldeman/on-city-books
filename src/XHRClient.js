import axios from 'axios';


export class XHRClient {

    constructor(){
        this.httpClient = axios.create({
            baseURL: '/munis/v1',
            timeout: 10000
        });
    }

    get(url){
        return this.httpClient.get(url);
    }
    
}

