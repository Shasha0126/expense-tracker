import React from 'react';
import styled from 'styled-components';
import bg from '../../img/bg.png'; // Adjust the path if needed

const Home = () => {
  return (
    <HomeStyled bg={bg}>
      <div className="homepage">
        <div className="nav-container">
          <div className="logopart">
            <h1>Xpert</h1>
          </div>
          <div className="navbar">
            <a href="/home" className="navicon">HOME</a>
            <a href="/dashboard" className="navicon">DASHBOARD</a>
            <a href="/aboutus" className="navicon">ABOUT US</a>
            <a href="/contactus" className="navicon">CONTACT US</a>
          </div>
        </div>
        <div className="main">
          <h1>Welcome to the Expense Tracker</h1>
          <p>Track your incomes and expenses effortlessly!</p>
          <a href="/login" className="login-btn">Login</a>
        </div>
        <div className="footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  .homepage {
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

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:rgb(109, 27, 90);
    text-align: center;
    font-weight:400;

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .login-btn {
      padding: 0.8rem 1.5rem;
      background-color: #2c3e50;
      color: #ffffff;
      text-decoration: none;
      font-size: 1.2rem;
      border-radius: 8px;
      transition: background 0.3s ease;

      &:hover {
        background-color:rgb(74, 83, 91);
        
      }
    }
  }

  .footer {
    background: rgba(0, 0, 0, 0.4);
    color: #ffffff;
    padding: 1rem;
    text-align: center;

    .footer-links a {
      color: #ffffff;
      margin: 0 1rem;
      text-decoration: none;
    }

    .footer-links a:hover {
      text-decoration: underline;
      color: #2c3e50;
    }
  }
`;

export default Home;
