import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";




function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function Signup(event:any) {
    event.preventDefault(); 
    let item = { email, password };
    console.log("item", item);
   
    try {
      const Signup = await fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json"
        },
         mode: "no-cors"
      });

      const result = await Signup.json();
      console.log("signup:",Signup)
      console.log("result:", result);
      localStorage.setItem("user-info",JSON.stringify(result))
     
      if (result.error) {
        setError(result.error);
      } else {
        console.log("Signup successful!");
      }
    } catch (error) {
      setError("");
    }
    navigate("/signup", { replace: false });
    console.log (alert("Signup susses"));
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

      <button onClick={Signup} className="bg-sky-400 rounded-md h-full">Đăng Ký</button>
    </form>
  );
};

export default SignupForm;