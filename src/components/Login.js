import React from "react";
import { useState } from "react";
import $ from "jquery";
import Home from "./Home";
import "../css/Login.css";
import "../js/Login";
const API = require("../API.json");

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUpAsUser, setShowSignUpAsUser] = useState(true);
  const [showSignUpAsCompany, setshowSignUpAsCompany] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [website, setWebsite] = useState("");
  const [isCompany, setisCompany] = useState(false);
  const [url, setUrl] = useState(API.Main);

  const signup = () => {
    if (userName == "" || userPassWord == "" || userEmail == "") {
      alert("enter details");
    } else {
      POST_TO_DB();
    }
  };
  const signIn = () => {
    if (userEmail == userPassWord) {
      window.location = "#/home";
    } 
  };
  const POST_TO_DB = () => {
    console.log("proceedig");
    const requestoptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassWord,
        isCompany: isCompany,
        website: website,
      }),
    };
    fetch(url + "addUser", requestoptions)
      .then((response) => {
        alert("please confirm your same password in your mail");
        setShowSignIn(true);
        setShowSignUp(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div class="login-container">
        <button
          onClick={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        >
          SignUp
        </button>
        <button
          onClick={() => {
            setShowSignIn(true);
            setShowSignUp(false);
          }}
        >
          SignIn
        </button>
      </div>
      {showSignIn ? (
        <div id="login" className="login">
          <h1>Sign IN</h1>
          <label>
            Email:
            <input
              type="Email"
              name="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="text"
              name="Password"
              value={userPassWord}
              onChange={(e) => {
                setUserPassWord(e.target.value);
                setisCompany(false);
              }}
            />
          </label>
          <br/>
          <button onClick={()=>signIn()}>Sign In</button>
        </div>
      ) : (
        <></>
      )}

      {showSignUp ? (
        <>
          <h1>Sign UP</h1>
          <button
            onClick={() => {
              setShowSignUpAsUser(true);
              setshowSignUpAsCompany(false);
            }}
          >
            sign up as user
          </button>
          <button
            onClick={() => {
              setShowSignUpAsUser(false);
              setshowSignUpAsCompany(true);
            }}
          >
            sign up as company
          </button>
          {showSignUpAsUser ? (
            <div className="normal-user" id="normal-user">
              <p>Sign Up as User to view Jobs</p>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="Email"
                  name="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </label>
              <label>
                Password
                <input
                  type="text"
                  name="Password"
                  value={userPassWord}
                  onChange={(e) => {
                    setUserPassWord(e.target.value);
                    setisCompany(false);
                  }}
                />
              </label>
              <input value="false" name="isCompany" hidden={true} />
            </div>
          ) : (
            <div className="company-user" id="company-user">
              <p>Sign Up as Company to Post Jobs</p>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="Email"
                  name="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </label>
              <label>
                Password
                <input
                  type="text"
                  name="Password"
                  value={userPassWord}
                  onChange={(e) => {
                    setUserPassWord(e.target.value);
                    setisCompany(true);
                  }}
                />
              </label>
              <label>
                Website
                <input
                  type="url"
                  name="website"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    setisCompany(true);
                  }}
                />
              </label>
              <input value="true" name="isCompany" hidden={true} />
            </div>
          )}
          <button
            onClick={() => {
              signup();
            }}
          >
            SignUp
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
