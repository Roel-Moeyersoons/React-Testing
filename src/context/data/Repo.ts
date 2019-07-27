import Axios from "axios";

class Cache {
	tabsData: Array<any>;
	//detailedTabsData: Map<string, Object>;
	private tabsFetchedDate: Date;

	constructor(private dataSource: string, private renewTime: number) {
		this.tabsData = [];
		//this.detailedTabsData = new Map();
		this.tabsFetchedDate = new Date();
		this.tabsFetchedDate.setTime(0);
	}

	private checkRefresh = (): boolean => {
		if (this.tabsFetchedDate)
			return (
				new Date().getTime() >
				this.tabsFetchedDate.getTime() + this.renewTime
			);
		return true;
	};

	isEmpty = (): boolean => {
		if (this.tabsData) return this.tabsData.length === 0;
		return true;
	};

	fetchData = () => {
		if (this.isEmpty() || this.checkRefresh()) {
			return this.forceFetchData();
		} else return Promise.resolve(this.tabsData);
	};

	private forceFetchData = async () => {
		console.log("aaaaa");
		let res = await Axios.get(this.dataSource, {
			headers: { "Access-Control-Allow-Origin": "*" }
		});
		this.tabsData = res.data;
		this.tabsFetchedDate = new Date();
		console.log(res.data);
		return this.tabsData;
	};
}

class TabsRepo {
	cache: Cache;

	constructor(url: string, refresh: number) {
		this.cache = new Cache(url, refresh);
	}

	getTabs = async () => {
		return await this.cache.fetchData();
	};

	getItem = async (id: string) => {
		let data = await this.cache.fetchData();
		return data.filter(item => item._id === id).pop();
	};
}

export default TabsRepo;
