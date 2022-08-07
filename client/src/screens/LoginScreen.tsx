import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeLogin, setSavedFromDB } from "../redux/mystroSlice";
import { TrackObjectFull, UserData } from "../types/schema";

const LoginScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [regMessage, setRegMessage] = useState("");

const dispatch = useDispatch();
let navigate = useNavigate();

  const addEmployee = (): void => {
    try {
      axios
      .post("http://localhost:3001/register", {
        name: name,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          loginSuccess(response.data);
        } else {
          setRegMessage("something went wrong"); 
        }
      });
    } catch(e) {
      console.log("error logging in", e);
    }
  };

  const login = async () => {
    // check given credentials against data base 
    try {
      const res = await axios.post("http://localhost:3001/login", {
          username: loginName,
          password: loginPassword,
        })

      if (res.data.length === 1) {
        setErrorMessage("worked");
        const userName: string = res.data[0].username;
        const userId: number = res.data[0].id;
        loginSuccess({ userName, userId });
      } else if (res.data.length === 0) {
        setErrorMessage("Username or password not recognised.");
      } else {
        setErrorMessage("Something weird happened.");
      }
    } catch(e) {
      console.log("error logging in", e);
    }
  };

  const loginSuccess = (userData: UserData): void => {
    dispatch(storeLogin({ userData: userData }));
    getSavedFromDB(userData.userId);
    navigate("/");
  }

  const getSavedFromDB = (userId: number) => {
    try {
      axios
      .post("http://localhost:3001/retrieve", {
        userId: userId,
      })
      .then((response) => {
        const savedStringRecs = response.data;
        let savedRecs: TrackObjectFull[] = [];
        for(let stringRec of savedStringRecs) {
          const rec = JSON.parse(stringRec.data);
          savedRecs.push(rec);
        }
        dispatch(setSavedFromDB({ saved: savedRecs }));
      });
    } catch(e) {
      console.log("error saving recommendations", e);
    }
  }

  const loginFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  }
  
  const registerFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addEmployee();
  }

  return (
    <div>
      <h3>Hi there, its great you want to register with Mystro, you will get your saved recommendations across devices when you sign in. However please note your user name and password will not be especially secure (this is a work in progress), so please use dummy username and password e.g. user33 abcd.</h3>
      <form onSubmit={registerFormSubmit}>
        <h2>Register</h2>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <p>{name}</p>
        <label htmlFor="">Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <p>{password}</p>
        <p>{regMessage}</p>
        <button
          type="submit"
        >
          Add employee
        </button>
      </form>
      <hr />
      <form onSubmit={loginFormSubmit}>
        <h2>Login</h2>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setLoginName(event.target.value);
          }}
        />
        <p>{loginName}</p>
        <label htmlFor="">Password:</label>
        <input type="password" onChange={(e) => setLoginPassword(e.target.value)} />
        <p>{loginPassword}</p>
        <p>{errorMessage}</p>
        <button
          type="submit"
        >
          Login
        </button>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
};

export default LoginScreen;
