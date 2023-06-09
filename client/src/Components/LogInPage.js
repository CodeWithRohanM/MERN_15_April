import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {

    const navigate = useNavigate();

    const userLogInDetails = {
        email: "",
        password: "",
    };

    const [userData, setUserData] = useState(userLogInDetails);

    const updateLogInDetails = (event) => {
        const getValue = event.target.value;
        const getName = event.target.name;

        setUserData((prevValue) => {
            return {
                ...prevValue,
                [getName]: getValue,
            }
        });
    };

    const storeUserLogInDetails = async (event) => {
        try {
            event.preventDefault();

            const getEmail = userData.email;
            const getPassword = userData.password;

            const getData = await fetch("/logIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: getEmail,
                    password: getPassword,
                })
            });

            const getResponse = await getData.json();

            if (getResponse.status === 200) {
                window.alert(getResponse);
                navigate("/");
            }
            else {
                window.alert(getResponse);
            }

            setUserData({
                email: "",
                password: "",

            })

        } catch (err) {
            console.warn(err);
        }

    }

    return <>

        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

            <div className="w-full max-w-md space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free
                            trial</a>
                    </p>
                </div>

                <form className="mt-8 space-y-6" method="POST" onSubmit={storeUserLogInDetails}>

                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                onChange={updateLogInDetails}
                                value={userData.email} />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password"
                                name="password"
                                type="password" autocomplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                onChange={updateLogInDetails}
                                value={userData.password} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            <label for="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" alt="Rememeber">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </>
};

export default LogInPage;