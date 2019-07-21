import Axios from 'axios';

class Cache {

    tabsData: Array<any>;
    private tabsFetchedDate : Date;

    constructor( private dataSource : string, private renewTime: number){
        this.tabsData = [];
    }
    
    private checkRefresh = () : boolean => {
        if(this.tabsFetchedDate)
            return new Date().getTime() > this.tabsFetchedDate.getTime() + this.renewTime;
        return true;
    }

    isEmpty = () : boolean => {
        if (this.tabsData)
            return this.tabsData.length === 0;
        return true;
    }

    fetchData = () => {
        if(this.tabsData || this.checkRefresh()){
            return this.forceFetchData();
        }
        else return Promise.resolve(this.tabsData);
        
    }

    private forceFetchData = async () => {
        let res = await Axios.get(this.dataSource, {headers: {'Access-Control-Allow-Origin': '*'}});
        this.tabsData = res.data; 
        this.tabsFetchedDate = new Date(); 
        return this.tabsData;
    }

}

class TabsRepo {

    cache: Cache;

    constructor(url: string, refresh : number){
        this.cache = new Cache(url, refresh);
    }

    getTabs = async () => {
        return await this.cache.fetchData();
    }

    getItem = async (id) => {
        let data = await this.cache.fetchData();
        return data.filter(item => item._id === id).pop() ;
    }

}


export default TabsRepo;