import { Container } from "@mui/material";
import { ipcRenderer } from "electron";

ipcRenderer.on("sysInfo", (event, sysInfo) => {
	console.log(event);

	const infoElement = document.getElementById("specs");
	
	if (infoElement) {
		infoElement.textContent = JSON.stringify(sysInfo, null, 2);
	}
});

const App = () => {
	return (
		<Container>
			<div id="specs"></div>
		</Container>
	);
}

export default App;
