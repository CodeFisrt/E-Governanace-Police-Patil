import React from "react";

function Login({ user, language = "en" }) {
  function isLogin() {
    console.log(user);
  }

  const t = {
    en: {
      signInTitle: "Sign in to your account",
      emailLabel: "Your email",
      emailPlaceholder: "name@gmail.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      signInButton: "Sign in",
    },
    mr: {
      signInTitle: "आपले खाते साइन इन करा",
      emailLabel: "आपला ईमेल",
      emailPlaceholder: "name@gmail.com",
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
                htmlFor="email"
                className="block mb-2 text-sm font-serif font-medium text-gray-900 dark:text-black"
              >
                {text.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-black-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={text.emailPlaceholder}
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
                placeholder={text.passwordPlaceholder}
                className="bg-black-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              onClick={() => isLogin()}
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
