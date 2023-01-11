import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
	const [data, setData] = useState({ 
		email: "", 
		password: "" 
	});

	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:80/login";
			const { data: res } = await axios.post(url, data);
			if (res.length != 0) {
				localStorage.setItem('UserKey',res[0].UserId);
				let data = localStorage.getItem('UserKey');
				console.log(data);
				navigate("/search");
			} else {

				
				alert("wrong password");
			}
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
		<div className="loginBox">
			<div>
				<form className="loginForm" onSubmit={handleSubmit}>
					<h3 className="title">Login In</h3>
					<div className="loginInfo">
					<label>Email Address</label>
					<br></br>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					</div>
					<div className="loginInfo">
					<label>Password</label>
					<br></br>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					</div>
					{error && <div>{error}</div>}
					<button type="submit" onClick = {Login} className="submitbutton">
						Sign In
					</button>
				<Link to="/signup" className="signup">
				<h3>sign up</h3>
				</Link>

				</form >
			</div>
		</div>
	);
};

export default Login;