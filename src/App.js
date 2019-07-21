import React from "react";
import Main from "./components/Main";
import { MyProvider } from './context/MyProvider';

function App() {
	return (
		<MyProvider>
			<Main />;
		</MyProvider>
	)
}

export default App;
