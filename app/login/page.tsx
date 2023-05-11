"use client";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default async function Login() {
  const [username, setU] = React.useState("");
  const [password, setP] = React.useState("");
  const [errorLogin, setEL] = React.useState("");

  const router = useRouter();

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const resUser = await fetch("http://localhost:8080/api/user/details", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resUser.status == 200) {
    router.push("/home");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const resp = await fetch(
      "http://localhost:8080/api/auth/authenticate",
      options
    );
    const result = await resp.json();
    // get status code
    const status = resp.status;
    console.log(status);
    if (!result.success) {
      let errors = result.message;
      //for each error, save it in a string
      let errorString = "";
      for (let i = 0; i < errors.length; i++) {
        errorString += errors[i] + "<br>";
      }
      //set the error string to the error message
      setEL(errorString);
      setU("is-invalid");
      setP("is-invalid");

      return;
    }
    //redirect to home using router push
    const data = result.data;
    //store the token in httpOnly cookie for 24 hours
    const token = data.token;
    if (data.token) {
      const cookie = `token=${token};max-age=86400;`;
      document.cookie = cookie;
      // localStorage.setItem("token", token);
      router.push("/home");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={"form-control " + username}
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={"form-control " + password}
            id="password"
            placeholder="Enter your password"
          />
          <div
            className="invalid-feedback"
            dangerouslySetInnerHTML={{ __html: errorLogin }}
          ></div>
        </div>
        <Link href="/register">I don't have an account</Link>

        <div className="d-flex justify-content-center mt-2">
          <button type="submit" className="btn btn-primary w-50">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
