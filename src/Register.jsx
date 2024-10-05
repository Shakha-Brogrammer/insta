import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const apiUrl = "https://crudcrud.com/api/942afa6b75e94891b33b002bc7462eaa";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const saveUserData = async (data) => {
    setLoading(true);
    setErrorMessage("");

    const userData = {
      ...data,
      followers: [],
    };

    try {
      const res = await axios.post(`${apiUrl}/userdata`, userData);
      localStorage.setItem("userId", res.data._id);
      navigate("/insta");
    } catch (error) {
      setErrorMessage("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gradient-to-bl from-pink-500 via-purple-500 to-orange-400 flex-col flex gap-5 justify-center items-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit(saveUserData)}
        className="w-[350px] p-8 border border-gray-500 flex flex-col gap-7"
      >
        <img
          className="cursor-pointer w-[80%] self-center"
          src="/Instagram-logo.png"
          alt="Instagram Logo"
        />
        <h1 className="text-center text-white">
          Sign up to see photos and videos from your friends.
        </h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        
        <input
          {...register("Email", { required: "Email is required" })}
          className="p-2 outline-none focus:border-gray-600 text-xs bg-gray-100 border border-gray-200 rounded-sm"
          type="email"
          placeholder="Email"
        />
        {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
        
        <input
          {...register("Name", { required: "Full name is required" })}
          className="p-2 outline-none focus:border-gray-600 text-xs bg-gray-100 border border-gray-200 rounded-sm"
          type="text"
          placeholder="Full name"
        />
        {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
        
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

        <Button type="submit" className="bg-blue-600 mt-9" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
      <div className="w-[350px] px-8 py-5 border justify-center items-center gap-3 border-gray-500 flex">
        <h1 className="text-white">Have an account?</h1>
        <Link className="text-blue-100" to={"/login"}>
          Log in
        </Link>
      </div>
    </header>
  );
};

export default Register;
