import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const myId = "https://crudcrud.com/api/942afa6b75e94891b33b002bc7462eaa";
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheck = async (data) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const res = await axios.get(`${myId}/userdata`);
      const users = res.data;
      const user = users.find(
        (user) =>
          user.userName === data.userName && user.password === data.password
      );

      if (user) {
        localStorage.setItem("userId", user._id); // Store user ID in localStorage
        navigate("/insta");
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!!! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="w-full h-[100vh] bg-white z-50 fixed top-0 left-0 flex justify-center items-center">
          <img
            src="/photo-insta.jpg"
            className="animate-ping w-[70px] h-[70px]"
            alt="Loading"
          />
        </div>
      )}
      <header className="flex-col bg-gradient-to-bl from-pink-500 via-purple-500 to-orange-400 flex gap-5 justify-center items-center w-full min-h-[100vh]">
        <form
          onSubmit={handleSubmit(handleCheck)}
          className="w-[350px] p-8 border border-gray-500 flex flex-col gap-2"
        >
          <img
            className="cursor-pointer w-[80%] self-center mb-6"
            src="/Instagram-logo.png"
            alt="Instagram Logo"
          />
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <input
            {...register("userName", { required: "Username is required" })}
            className="p-2 outline-none focus:border-gray-600 text-xs bg-gray-100 border border-gray-200 rounded-sm"
            type="text"
            placeholder="Username"
          />
          {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
          
          <input
            {...register("password", { required: "Password is required" })}
            className="p-2 outline-none focus:border-gray-600 text-xs bg-gray-100 border border-gray-200 rounded-sm"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <Button type="submit" className="py-[8px] bg-blue-600 mt-4">
            Log in
          </Button>
        </form>
        <div className="w-[350px] px-8 py-5 border justify-center items-center gap-3 border-gray-500 flex">
          <h1 className="text-white">Don't have an account?</h1>
          <Link className="text-blue-100" to={"/"}>
            Sign up
          </Link>
        </div>
      </header>
    </>
  );
};

export default Login;
