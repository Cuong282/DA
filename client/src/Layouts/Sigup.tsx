import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";
import { LOGIN } from "../services";



function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function LogIn(event:any) {
    event.preventDefault(); 
    let item = { email, password };
    console.log("item", item);
   
    try {
      const ApiLogin = await fetch("http://localhost:3001/todo", {
        method: "GET",
        // body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json"
        },
         mode: "no-cors"
      });

      const result = await ApiLogin.json();
      console.log("result:", result);
      localStorage.setItem("user-info",JSON.stringify(result))
     
      if (result.error) {
        setError(result.error);
      } else {
        console.log("Login successful!");
      }
    } catch (error) {
      setError("Error logging in. Please try again:");
    }
    navigate("/", { replace: true });
    console.log("Login successful!");
  }

  return (
    <form>
      <h2>Sign up</h2>
      <div className="Signup_from ">
        <br />
        <label >
          Email:
          <input
            type="email"
            placeholder="email"
            value={email}
            
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            value={password}
            className="w-full ml-5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>

      <button onClick={LogIn} className="bg-sky-400 rounded-md h-full">Đăng Ký</button>
    </form>
  );
};

export default LoginForm;