import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function Signup(event: any) {
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
      console.log("signup:", Signup)
      console.log("result:", result);
      localStorage.setItem("user-info", JSON.stringify(result))

      if (result.error) {
        setError(result.error);
      } else {
        console.log("Signup successful!");
      }
    } catch (error) {
      setError("");
    }
    navigate("/signup", { replace: false });
    console.log(alert("Signup susses"));
  }

  return (
    <div className="Signup_from">
      <div className="Sigup_change">
      <form className="flex items-center " >
        <h2>Sign up</h2>
        <div className="Signup">
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

        <button onClick={Signup} className="bg-cyan-500 w-20 h-full">Đăng Ký</button>
      </form>

      </div>
     
    </div>

  );
};

export default SignupForm;