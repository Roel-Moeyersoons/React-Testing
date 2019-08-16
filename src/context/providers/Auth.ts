import Axios from "axios";

class Auth {
	token: string = "";
	authPromise: Promise<boolean> | null = null;

	subscribers: Array<any> = [];

	get Token(): string {
		return this.token;
	}

	constructor(private url: string) {
		let user = localStorage.getItem("user");
		if (user && user !== "") {
			let pwd = localStorage.getItem("pwd");
			this.logIn(user, pwd + "");
		}
	}
	private async authenticate(user: string, pwd: string) {
		try {
			let res = await Axios.post(this.url + "/login", {
				username: user,
				password: pwd
			});

			localStorage.setItem("user", user);
			localStorage.setItem("pwd", pwd);

			this.token = res.data.token;
			//console.log(this.token);
			return true;
		} catch {
			this.logOut();
			console.log("not authenticated");
			return false;
		} finally {
			this.authPromise = null;
			this.warn();
		}
	}

	isAuthenticated() {
		//console.log(this.token);
		return this.token !== "";
	}

	logIn(user: string, pwd: string) {
		this.authPromise = this.authenticate(user, pwd);
		return this.authPromise;
	}

	logOut() {
		localStorage.setItem("user", "");
		localStorage.setItem("pwd", "");
		this.token = "";
		this.warn();
	}

	subscribe(item: any) {
		this.subscribers.forEach(it => {
			if (it === item) return;
		});
		this.subscribers.push(item);
	}

	unsubscribe(item: any) {
		this.subscribers = this.subscribers.filter(i => item !== i);
	}

	private warn() {
		this.subscribers.forEach(it => {
			it.update();
		});
	}
}

export default Auth;
