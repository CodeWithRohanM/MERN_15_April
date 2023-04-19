import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

    return <>

        <div className="w-screen h-20 bg-cyan-300">

            <div className="flex flex-row w-full h-full justify-between container mx-auto items-center bg-red-400">
                <img src="/Images/hotel.png" className="w-12 h-12" alt="hotel"></img>

                <div className="flex flex-row justify-between bg-yellow-300 w-1/2">
                    <div className="flex flex-row bg-pink-400 w-1/2 justify-evenly items-center">
                        <NavLink to="/"><h1>Home</h1></NavLink>
                        <NavLink to="/secret"><h1>Secret Page</h1></NavLink>

                    </div>

                    <div className="flex flex-row justify-end bg-red-600 w-1/2 gap-x-6">
                        <NavLink to="/register"><button type="button" className="bg-blue-600 px-5 py-2 rounded-md text-white font-bold hover:cursor-pointer">
                            Register
                        </button></NavLink>

                        <NavLink to="/logIn"><button type="button" className="bg-blue-600 px-5 py-2 rounded-md text-white font-bold hover:cursor-pointer">
                            LogIn
                        </button></NavLink>
                    </div>




                </div>
            </div>

        </div>

    </>
};

export default Header;