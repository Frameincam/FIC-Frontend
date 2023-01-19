import axios from "axios";
import router from "next/router";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const CustomerLoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		trigger,
	} = useForm();
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showResetPassword, setShowResetPassword] = useState(false);
	const [displayForget, setDisplayForgot] = useState(false);
	const [displayOtpPopup, setDisplayOtpPopup] = useState(false);
	const [displayConfirm, setDisplayConfirm] = useState(false);
	const [forgotPassword, setForgotPassword] = useState();
	const [otp, setOtp] = useState();
	const [rPassword, setRPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [passwordDidntMatch, setPasswordDidntMatch] = useState(false);
	const [passwordLength, setPasswordLength] = useState(false);

	const forgotPasswordPopup = () => {
		setDisplayForgot(!displayForget);
	};
	const forgotClose = () => {
		setDisplayForgot(!displayForget);
	};

	// const closeOtpPopup = () => {
	//   setDisplayOtpPopup(!displayOtpPopup);
	// };

	const closeConfirmPasswordPopup = () => {
		setDisplayConfirm(!displayConfirm);
	};

	const resetPasswordChange = (e) => {
		setRPassword(e.target.value);
		setPasswordDidntMatch(false);
		setPasswordLength(false);
	};

	const confirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
		setPasswordDidntMatch(false);
		setPasswordLength(false);
	};
	// Forgot Password Submit API

	const forgotPasswordSubmit = async (e) => {
		e.preventDefault();
		console.log(forgotPassword);
		const d = {
			type: "customer",
		};

		const { data } = await axios.post(
			`${process.env.DOMAIN_NAME}/api/forget-password/otp/${forgotPassword}`,
			d
		);
		console.log(data);
		if (data.success) {
			swal({
				title: "Success",
				text: data.msg,
				icon: "success",
				button: "OK",
			});
			setDisplayForgot(!displayForget);
			setDisplayOtpPopup(!displayOtpPopup);
		} else {
			swal({
				title: "Error",
				text: data.msg,
				icon: "error",
				button: "OK",
			});
		}
	};

	// OTP Submit API
	const otpSubmit = async (e) => {
		e.preventDefault();
		console.log(otp);
		const d = {
			mobile: forgotPassword,
		};

		const { data } = await axios.post(
			`${process.env.DOMAIN_NAME}/api/verify/otp/${otp}`,
			d
		);
		console.log(data);
		if (data.success) {
			swal({
				title: "Success",
				text: data.msg,
				icon: "success",
				button: "OK",
			});
			setDisplayOtpPopup(!displayOtpPopup);
			setDisplayConfirm(!displayConfirm);
		} else {
			swal({
				title: "Error",
				text: data.msg,
				icon: "error",
				button: "OK",
			});
		}
	};

	// Reset Password API

	const resetPasswordSubmit = async (e) => {
		e.preventDefault();
		const d = {
			password: rPassword,
			type: "customer",
		};
		if (rPassword === confirmPassword) {
			if (rPassword.length >= 8) {
				const { data } = await axios.post(
					`${process.env.DOMAIN_NAME}/api/reset-password/otp/${forgotPassword}`,
					d
				);
				console.log(data);
				if (data.success) {
					swal({
						title: "Success",
						text: data.msg,
						icon: "success",
						button: "OK",
					});
					setDisplayConfirm(!displayConfirm);
				} else {
					swal({
						title: "Error",
						text: data.msg,
						icon: "error",
						button: "OK",
					});
				}
			} else {
				setPasswordLength(true);
			}
		} else {
			setPasswordDidntMatch(true);
		}
	};

	const loginPasswordVisibilityClick = () => {
		setShowLoginPassword(!showLoginPassword);
	};

	const resetPasswordVisibilityClick = () => {
		setShowResetPassword(!showResetPassword);
	};

	const customerLoginSubmit = async (e) => {
		const d = {
			mobile: e.mobile,
			password: e.password,
		};

		try {
			const { data } = await axios.post(
				`${process.env.DOMAIN_NAME}/api/account/customer/login`,
				d
			);
			console.log(data);
			const token = data.token;
			const user = JSON.stringify(data.user);
			console.log(user);

			if (!data.success) {
				swal({
					title: "Error",
					text: data.msg,
					icon: "error",
					button: "OK! ",
				});
			}
			if (data.success) {
				swal({
					title: "Success",
					text: data.msg,
					icon: "success",
					button: "OK! ",
				});
				localStorage.setItem("token", token);
				localStorage.setItem("user", user);
				router.push("/dashboard/customerprofile");
			}
		} catch (error) {}
	};
	// Google Login Start
	const googleCustomerLoginSuccess = async (res) => {
		console.log(res.profileObj);
		const da = {
			tokenId: res.tokenId,
			email: res.profileObj.email,
			name: res.profileObj.name,
		};
		try {
			const google = await axios.post(
				`${process.env.DOMAIN_NAME}/api/account/Customer/google-login`,
				da
			);
			const token = google.data.token;
			const user = JSON.stringify(google.data.user);
			console.log(user);
			if (!google.data.success) {
				console.log("swal");
				console.log(google.data.msg);
				swal({
					title: "Error",
					text: google.data.msg,
					icon: "error",
					button: "OK! ",
				});
			}
			if (google.data.success) {
				console.log("succeaa");
				swal({
					title: "Success",
					text: "Login Success",
					icon: "success",
					button: "OK! ",
				});
				localStorage.setItem("token", token);
				localStorage.setItem("user", user);
				router.push("/dashboard/customerprofile");
			}
			console.log(google);
		} catch (error) {
			console.log(error);
		}
	};

	const googleLoginFailure = (data) => {
		console.log(data, "failure");
	};

	// Google Login End

	//Facebook Login Start

	const responseFacebook = async (response) => {
		// response.preventDefault();
		console.log(response);
		console.log(response.accessToken);
		const data = {
			userId: response.userID,
			accessToken: response.accessToken,
		};
		try {
			const faceBookLoginApi = await axios.post(
				`${process.env.DOMAIN_NAME}/api/account/customer/facebook-login`,
				data
			);
			console.log(faceBookLoginApi);
			const token = faceBookLoginApi.data.token;
			const user = faceBookLoginApi.data.user._id;
			if (!faceBookLoginApi.data.success) {
				swal({
					title: "Error",
					text: faceBookLoginApi.data.msg,
					icon: "error",
					button: "OK! ",
				});
			}
			if (faceBookLoginApi.data.success) {
				console.log("success");
				swal({
					title: "Success",
					text: faceBookLoginApi.data.msg,
					icon: "success",
					button: "OK! ",
				});
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				router.push("/dashboard/customerprofile");
			}
		} catch (error) {
			console.log(error);
		}
	};
	// Facebook Login End

	return (
		<>
			<div
				className={displayForget ? "body_overlay open" : "body_overlay"}
			></div>
			<div
				className={displayOtpPopup ? "body_overlay open" : "body_overlay"}
			></div>
			<div
				className={displayConfirm ? "body_overlay open" : "body_overlay"}
			></div>
			<div className="tab-pane fade show active" id="login">
				<div className="miran-login">
					<div className="login-with-account">
						<span>Login with</span>
						<ul>
							<div className="row" style={{ textAlign: " -webkit-center" }}>
								<div className="col-lg-6 col-md-12">
									<li>
										<FacebookLogin
											appId="651404169340394"
											autoLoad={false}
											callback={responseFacebook}
										/>
									</li>
								</div>
								<div className="col-lg-6 col-md-12">
									<li>
										<GoogleLogin
											clientId="1044646467235-3qsh4khsql66k1v9p6nuh6h5476gd09j.apps.googleusercontent.com"
											render={(renderProps) => (
												<a
													href="#"
													className="twitter"
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
													style={{ display: "flex", justifyContent: "center" }}
												>
													<img src="/images/google.png" width={25} />{" "}
													<span style={{ color: "#4686f7" }}>G</span>
													<span style={{ color: "#e74137" }}>o</span>
													<span style={{ color: "#f2bb13" }}>o</span>
													<span style={{ color: "#4686f7" }}>g</span>
													<span style={{ color: "#50a856" }}>l</span>
													<span style={{ color: "#e74f40" }}>e</span>
													{/* <i class="bx bxl-google" aria-hidden="true"></i> Google*/}
												</a>
											)}
											buttonText="Login With Google"
											onSuccess={googleCustomerLoginSuccess}
											onFailure={googleLoginFailure}
											cookiePolicy={"single_host_origin"}
										/>
									</li>
								</div>
							</div>
						</ul>
					</div>
					<span className="sub-title">
						<span>Or login with</span>
					</span>
					<form onSubmit={handleSubmit(customerLoginSubmit)}>
						<div className="form-group">
							<input
								type="text"
								placeholder="Mobile"
								className={`form-control ${errors.mobile && "invalid"}`}
								{...register("mobile", {
									required: "Please enter your Mobile Number",
								})}
								onKeyUp={() => {
									trigger("mobile");
								}}
							/>
							{errors.mobile && (
								<small className="text-danger">{errors.mobile.message}</small>
							)}
						</div>

						<div className="form-group reset">
							<input
								type={showLoginPassword ? "text" : "password"}
								placeholder="Password"
								className={`form-control ${errors.password && "invalid"}`}
								{...register("password", {
									required: "Please enter your password",
								})}
								onKeyDown={() => {
									trigger("password");
								}}
							/>
							{showLoginPassword ? (
								<AiOutlineEye
									className="password-icon"
									onClick={loginPasswordVisibilityClick}
								/>
							) : (
								<AiOutlineEyeInvisible
									fill="grey"
									className="password-icon"
									onClick={loginPasswordVisibilityClick}
								/>
							)}
							{errors.password && (
								<small className="text-danger">{errors.password.message}</small>
							)}
						</div>
						<div className="forgot-pass">
							<p onClick={forgotPasswordPopup}>Forgot Password</p>
						</div>

						<button type="submit">Login Now</button>
					</form>
				</div>
			</div>
			{/* ------------ Forgot password sectoin ------- */}
			<div
				className={
					displayForget
						? "modal loginRegisterModal show scroll-popup"
						: "modal loginRegisterModal"
				}
				id="loginRegisterModal"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<button type="button" className="close" onClick={forgotClose}>
							<i className="bx bx-x"></i>
						</button>
						<h2 className="vendor-register-head">Forgot Password</h2>

						<form onSubmit={forgotPasswordSubmit}>
							<div className="form-group">
								<input
									type="text"
									placeholder="Mobile No."
									className="form-control"
									onChange={(e) => setForgotPassword(e.target.value)}
								/>
							</div>

							<button className="forgot-btn" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* ------------ OTP section ------- */}
			<div
				className={
					displayOtpPopup
						? "modal loginRegisterModal show scroll-popup"
						: "modal loginRegisterModal"
				}
				id="loginRegisterModal"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						{/* <button type="button" className="close" onClick={closeOtpPopup}>
              <i className="bx bx-x"></i>
            </button> */}
						<h2 className="vendor-register-head">Enter a OTP </h2>

						<form onSubmit={otpSubmit}>
							<div className="form-group">
								<input
									type="text"
									placeholder="OTP"
									className="form-control"
									onChange={(e) => {
										setOtp(e.target.value);
									}}
								/>
							</div>

							<button className="forgot-btn" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* ------------ Confirm password section ------- */}
			<div
				className={
					displayConfirm
						? "modal loginRegisterModal show scroll-popup"
						: "modal loginRegisterModal"
				}
				id="loginRegisterModal"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<button
							type="button"
							className="close"
							onClick={closeConfirmPasswordPopup}
						>
							<i className="bx bx-x"></i>
						</button>
						<h2 className="vendor-register-head">Enter a New Password </h2>

						<form onSubmit={resetPasswordSubmit}>
							<div className="form-group reset">
								<input
									type={showResetPassword ? "text" : "password"}
									placeholder="Password"
									className="form-control"
									onChange={resetPasswordChange}
								/>
								{showResetPassword ? (
									<AiOutlineEye
										className="password-icon"
										onClick={resetPasswordVisibilityClick}
									/>
								) : (
									<AiOutlineEyeInvisible
										fill="grey"
										className="password-icon"
										onClick={resetPasswordVisibilityClick}
									/>
								)}
							</div>
							<div className="form-group reset">
								<input
									type={showResetPassword ? "text" : "password"}
									placeholder="Confirm password"
									className="form-control"
									onChange={confirmPasswordChange}
								/>
								{showResetPassword ? (
									<AiOutlineEye
										className="password-icon"
										onClick={resetPasswordVisibilityClick}
									/>
								) : (
									<AiOutlineEyeInvisible
										fill="grey"
										className="password-icon"
										onClick={resetPasswordVisibilityClick}
									/>
								)}
							</div>
							{passwordDidntMatch && (
								<p style={{ color: "red" }}>Passwords did not match</p>
							)}
							{passwordLength && (
								<p style={{ color: "red" }}>
									Length of the password should be 8.
								</p>
							)}
							<button className="forgot-btn" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomerLoginForm;
