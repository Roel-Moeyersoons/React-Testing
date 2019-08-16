import Axios from "axios";

interface DetailWrapper {
	data: any;
	timeout: Date;
}

class Cache {
	tabsData: Array<any>;
	private tabsFetchedDate: Date;

	detailedTabsData: Map<string, DetailWrapper>;

	constructor(private dataSource: string, private renewTime: number) {
		//console.log(this.dataSource);
		this.tabsData = [];
		this.tabsFetchedDate = new Date();
		this.tabsFetchedDate.setTime(0);

		this.detailedTabsData = new Map();
	}

	private checkRefresh = (time: Date): boolean => {
		if (time) return new Date().getTime() > time.getTime() + this.renewTime;
		return true;
	};

	isEmpty = (): boolean => {
		if (this.tabsData) return this.tabsData.length === 0;
		return true;
	};

	fetchData = (): Promise<any> => {
		if (this.isEmpty() || this.checkRefresh(this.tabsFetchedDate)) {
			return this.forceFetchData();
		} else return Promise.resolve(this.tabsData);
	};

	fetchDetails = (id: string): Promise<any> => {
		let obj = this.detailedTabsData.get(id);
		if (!obj || this.checkRefresh(obj.timeout)) {
			return this.forceFetchDetails(id);
		} else return Promise.resolve(obj.data);
	};

	private forceFetchData = async (): Promise<any> => {
		let res = await Axios.get(this.dataSource, {
			headers: { "Access-Control-Allow-Origin": "*" }
		});
		this.tabsData = res.data;
		this.tabsFetchedDate = new Date();
		//console.log(res.data);
		return this.tabsData;
	};

	private forceFetchDetails = async (id: string): Promise<any> => {
		try {
			let res = await Axios.get(`${this.dataSource}/${id}`, {
				headers: { "Access-Control-Allow-Origin": "*" }
			});
			let wrapper = {
				data: res.data,
				timeout: new Date()
			};
			this.detailedTabsData.set(id, wrapper);
			return wrapper.data;
		} catch {
			return {
				error: `song met id ${id} niet gevonden`
			};
		}
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

	/*getItem = async (id: string) => {
		let data = await this.cache.fetchData();
		return data.filter((item: { _id: string }) => item._id === id).pop();
	};*/

	getDetails = async (id: string) => {
		let data = await this.cache.fetchDetails(id);
		//console.log(data);
		return data;
	};
}

export default TabsRepo;
