import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login Successful!");
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    aadhar: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("User Data:", formData);
    alert("Signup Successful!");
  };

  return (
    <>
      {loginPage && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              Login
            </h2>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300"
            >
              Login
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Don't have an account?{" "}
              <a
                className="text-blue-600 cursor-pointer"
                onClick={() => setLoginPage(false)}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      )}
      {!loginPage && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmitSignup}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
              E-Governance Portal – Sign Up
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                maxLength="12"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 12-digit Aadhar number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Create password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-all duration-300 font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already registered?{" "}
              <a
                className="text-blue-700 cursor-pointer"
                onClick={() => setLoginPage(true)}
              >
                Login
              </a>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
