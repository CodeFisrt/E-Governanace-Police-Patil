import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ user, language = "en" }) {
  const [phone, setPhone] = useState("");
  const [password_hash, setPasswordHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowErro] = useState("");

  const navigation = useNavigate();

  const handleLogin = async () => {
    console.log(user);

    try {
      const apiResult = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          phone,
          password_hash,
        }
      );

      if (apiResult.data.role == user) {
        console.log("Patil login");
        localStorage.setItem("token", apiResult.data.token);
        console.log(apiResult);
        navigation("/policepatildashboard");
      }
    } catch (error) {
      console.log(error);
      setShowErro("Invalid Phone or Password");
    }
  };

  const t = {
    en: {
      signInTitle: "Sign in to your account",
      phoneLabel: "Your Phone Number",
      phonePlaceholder: "99XXXXXXX",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      signInButton: "Sign in",
    },
    mr: {
      signInTitle: "आपले खाते साइन इन करा",
      phoneLabel: "तुमचा फोन नंबर",
      phonePlaceholder: "९९XXXXXX",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "••••••••",
      signInButton: "साइन इन",
    },
  };

  const text = t[language] || t.en;

  return (
    <div className="flex flex-col items-center justify-center mt-20 ">
      <div className="w-full bg-transparent rounded-lg   md:mt-0 sm:max-w-md xl:p-0 dark:bg-transparent ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-serif font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            {text.signInTitle}
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-serif font-medium text-gray-900 dark:text-black"
              >
                {text.phoneLabel}
              </label>
              <input
                type="number"
                name="number"
                id="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setShowErro("");
                }}
                className="bg-black-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={text.phonePlaceholder}
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-serif font-medium text-gray-900 dark:text-black"
              >
                {text.passwordLabel}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password_hash}
                placeholder={text.passwordPlaceholder}
                onChange={(e) => {
                  setPasswordHash(e.target.value);
                  setShowErro("");
                }}
                className="bg-black-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="text-red-800 m-2 p-0">{showError}</div>

            <button
              // type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
                setIsLoading(true);
              }}
              className="w-full text-white font-serif font-bold bg-gray-500 hover:bg-gray-400 transition 1s focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-800"
            >
              {text.signInButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
