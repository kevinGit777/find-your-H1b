import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		FirstName: "",
		LastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
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
		<div>
			<div>
				<h3>Back to login in</h3>
				<Link to="/login">
					<button type="button">
						Sign in
					</button>
				</Link>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<h3>Create Account</h3>
					<input
						type="text"
						placeholder="First Name"
						name="FirstName"
						onChange={handleChange}
						value={data.FirstName}
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="LastName"
						onChange={handleChange}
						value={data.LastName}
					/>
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
					<button type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
