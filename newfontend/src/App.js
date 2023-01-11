
import { Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CompanyInfo from "./components/CompanyInfo";


function App() {
	return (
		<Routes>
			//const v = localStorage.getItem("token");
			<Route exact path="/" element={<><Login/></>}/>
			<Route exact path="/login" element={<><Login/></>}/>
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/search" exact element={<CompanyInfo />} />
		</Routes>
	);
}

export default App;