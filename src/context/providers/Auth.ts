import Axios from "axios";

class Auth {
	token: String = "";
	authPromise: Promise<boolean> | null = null;

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
			console.log(this.token);
			return true;
		} catch {
			this.logOut();
			console.log("not authenticated");
			return false;
		} finally {
			this.authPromise = null;
		}
	}

	isAuthenticated() {
		console.log(this.token);
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
	}
}

export default Auth;
