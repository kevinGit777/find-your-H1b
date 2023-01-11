import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ 
		email: "", 
		password: "" 
	});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<h3>Please Login In first</h3>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					{error && <div>{error}</div>}
					<Link to="/search">
					<button type="submit">
						Sign In
					</button>
					</Link>
				</form>
			</div>
			<div>
				<h3>Please sign up here</h3>
				<Link to="/signup">
					<button type="button">
						Sign Up
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;