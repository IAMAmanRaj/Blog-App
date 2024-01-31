import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { Button, Label } from "flowbite-react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }

      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row p-3 max-w-3xl mx-auto md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Aman's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label value="Your username " />
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="bg-slate-100 p-3 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <Label value="Your email"></Label>
              <input
                type="email"
                placeholder="name@company.com"
                id="email"
                className="bg-slate-100 p-3 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <Label value="Your password" />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="bg-slate-100 p-3 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              disabled={loading}
              type="submit"
              className=" text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <p>Have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-500">Sign in</span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error && "Something went wrong!"}
          </p>
        </div>
      </div>
    </div>
  );
}
