import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './signup.css';

const Signup = () => {
	const [data, setData] = useState({
		Name: "",
		PhoneNumber: "",
		Gender: "",
		email: "",
		password: "",
		BirthDate: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:80/signup";
			const { data: res } = await axios.post(url, data);
			navigate("/search");
			console.log(res.message);
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
					<h3 className="title">Create Account</h3>
					<label>Gender</label>
					<br></br>
					<input
						type="text"
						placeholder="Gender"
						name="Gender"
						onChange={handleChange}
						value={data.Gender}
					/>
					<br></br>
					<label>Birth Date</label>
					<br></br>
					<input
						type="text"
						placeholder="BirthDate"
						name="BirthDate"
						onChange={handleChange}
						value={data.BirthDate}
					/>
					<br></br>
					<label>Name</label>
					<br></br>
					<input
						type="text"
						placeholder="Name"
						name="Name"
						onChange={handleChange}
						value={data.Name}
					/>
					<br></br>
					<label>Phone Number</label>
					<br></br>
					<input
						type="text"
						placeholder="PhoneNumber"
						name="PhoneNumber"
						onChange={handleChange}
						value={data.PhoneNumber}
					/>
					<br></br>
					<label>Email Address</label>
					<br></br>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					<br></br>
					<label>Password</label>
					<br></br>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					{error && <div>{error}</div>}
					<br></br>
					<br></br>
					<button type="submit" className="signup">
						Sign Up
					</button>
				<br></br>
				<Link to="/login">
						Sign in
				</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
