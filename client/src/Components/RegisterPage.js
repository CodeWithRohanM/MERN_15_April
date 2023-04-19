import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();

    const userDetails = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    };

    const [userData, setUserData] = useState(userDetails);

    const updateUserInfo = (event) => {
        const getValue = event.target.value;
        const getName = event.target.name;

        setUserData((prevValue) => {
            return {
                ...prevValue,
                [getName]: getValue,
            }
        });
    };


    const storeUserInfo = async (event) => {
        try {
            event.preventDefault();

            const getFirstName = userData.firstName;
            const getLastName = userData.lastName;
            const getEmail = userData.email;
            const getPassword = userData.password;
            const getConfirmPassword = userData.confirmPassword;
            const getPhone = userData.phone;

            const getData = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: getFirstName,
                    lastName: getLastName,
                    email: getEmail,
                    password: getPassword,
                    confirmPassword: getConfirmPassword,
                    phone: getPhone,
                }),

            });

            const getResponse = await getData.json();

            console.log(getResponse);

            if (getResponse.status === 200) {
                window.alert(getResponse);
                navigate("/");
            }
            else {
                window.alert(getResponse);
            }

            setUserData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
            });
        }
        catch (err) {
            console.warn(err);
        }

    };



    return <>


        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                        style={{ "backgroundImage": "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')" }}></div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>

                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" method="POST" onSubmit={storeUserInfo}>

                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={userData.firstName}
                                        onChange={updateUserInfo} />
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={updateUserInfo} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={updateUserInfo}
                                    value={userData.email} />
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        name="password"
                                        onChange={updateUserInfo}
                                        value={userData.password} />
                                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                                </div>

                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirm_password">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="confirm_password"
                                        type="password"
                                        placeholder="******************"
                                        name="confirmPassword"
                                        onChange={updateUserInfo}
                                        value={userData.confirmPassword} />
                                    <p className="text-xs italic text-red-500">Please confirm your password.</p>
                                </div>

                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone_number">
                                        Phone Number
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="phone_number"
                                        type="number"
                                        placeholder="Phone Number.."
                                        name="phone"
                                        onChange={updateUserInfo}
                                        value={userData.phone} />
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Register Account
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="#">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="./index.html">
                                    Already have an account? Login!
                                </a>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>



    </>
};

export default RegisterPage;