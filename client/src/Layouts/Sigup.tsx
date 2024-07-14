import { useState } from "react";
import "./Signup.css";
import { error } from "console";

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(username, email, password);
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <div className="Signup_from">
      <br/>
      <label>
        <h1>Username:</h1>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <br/>
 
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </label>
      <br />
      </div>

      <button type="submit">Sign up</button>
    </form>
  );
};

export default RegisterForm;
