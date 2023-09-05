import React, { useState } from "react";
import Header from "../../Header/Header";
import { postRequest } from "../../../Services/request.service";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuthStatus, setUserID } from "../../../Redux/slices/auth-slice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [, setCookie] = useCookies(["name"]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await postRequest("users/login", body);
      setCookie("token", response.token);
      dispatch(setAuthStatus(true));
      dispatch(setUserID(response.id));
      alert("Successful login");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-semibold text-gray-800 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <div className="flex items-center mt-2 justify-end">
                <span className="font-semibold text-gray-800">
                  Don't have an account?&nbsp;
                </span>
                <div className="text-sm">
                  <a
                    href="/register"
                    className="font-semibold text-indigo-800 hover:text-indigo-500 underline"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
