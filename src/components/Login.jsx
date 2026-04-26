import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-[#ebe6dd] min-h-screen flex items-center justify-center p-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
        )}

        <label className="block mb-5">
          <span className="font-bold">Email</span>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-5">
          <span className="font-bold">Password</span>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 hover:bg-gray-800 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
