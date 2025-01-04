import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import bg from '../../img/bg.png'; 
import axios from 'axios';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:4000/api/v1/adduser", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });
        alert('User registered successfully');
        handleToggle();
    } catch (err) {
        console.error("Signup error:", err);
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Login successful!");
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(error.response?.data?.message || "Invalid email or password");
    });
  };

  return (
    <LoginSignupStyled bg={bg}>
      <div className="login-signup-container">
        <div className="nav-container">
          <div className="logopart">
            <h1>Xpert</h1>
          </div>
          <div className="navbar">
            <a href="/" className="navicon">HOME</a>
            <a href="/dashboard" className="navicon">DASHBOARD</a>
            <a href="/aboutus" className="navicon">ABOUT US</a>
            <a href="/contactus" className="navicon">CONTACT US</a>
          </div>
        </div>

        <div className="form-container">
          {isLogin ? (
            <div className="login-form">
              <h2>Login Champ!!</h2>
              <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="submit-btn">LOGIN IN</button>
              </form>
              <button className="toggle-btn" onClick={handleToggle}>Don't have an account? Sign Up</button>
            </div>
          ) : (
            <div className="signup-form">
              <h2>Create Account</h2>
              <form onSubmit={handleSignup}>
                <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="submit-btn">SIGN UP</button>
              </form>
              <button className="toggle-btn" onClick={handleToggle}>Already have an account? Login In</button>
            </div>
          )}
        </div>
      </div>
    </LoginSignupStyled>
  );
};

const LoginSignupStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  .login-signup-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(0, 0, 0, .4);
    color: #ffffff;

    .logopart h1 {
      font-size: 2rem;
      margin: 0;
    }

    .navbar a {
      margin: 0 1rem;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
    }

    .navbar a:hover {
      text-decoration: underline;
      color: #2c3e50;
    }
  }

  .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 400px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 16px;
    background-color: rgba(154, 127, 127, 0.5);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    padding: 20px;
  }

  .login-form, .signup-form {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .login-form input, .signup-form input {
    margin: 10px;
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .login-form button, .signup-form button {
    background-color: #2c3e50;
    padding: 10px 20px;
    color: white;
    border: none;
    margin-top: 20px;
    border-radius: 5px;

    &:hover{
    background-color:purple;
    }
  }

  .toggle-btn {
    margin-top: 20px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default LoginSignup;
