
import { Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";
import LoginForm from "./components/Login";
import CompanyInfo from "./components/CompanyInfo";
import Main from "./components/Main";
// import { FavoriteTab } from "./components/FavoriteTable/FavoriteTable";



function App() {
	return (
		<Routes>
			<Route path="/main" exact element={<Main/>} />
			<Route exact path="/" element={<><LoginForm/></>}/>
			<Route exact path="/login" element={<><LoginForm/></>}/>
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/search" exact element={<CompanyInfo />} />
			{/* <Route path="/favTab" exact element={<FavoriteTab />} /> */}

		</Routes>
	);
}

export default App;