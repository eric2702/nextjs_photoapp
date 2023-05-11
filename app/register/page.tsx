"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default async function Register() {
  const [usernameErrorMsg, setUEM] = React.useState("");
  const [username, setU] = React.useState("");
  const [passwordErrorMsg, setPEM] = React.useState("");
  const [password, setP] = React.useState("");
  const [confErrorMsg, setCEM] = React.useState("");
  const [conf, setC] = React.useState("");
  const [nameErrorMsg, setNEM] = React.useState("");
  const [name, setN] = React.useState("");
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
    const name = event.currentTarget.nameperson.value;
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const confirm = event.currentTarget.confirm.value;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password }),
    };
    const resp = await fetch(
      "http://localhost:8080/api/auth/register",
      options
    );
    const data = await resp.json();

    //get status code
    const success = data.success;
    if (!success) {
      if (data.message.password) {
        setPEM(data.message.password);
        setP("is-invalid");
      } else {
        setPEM("");
        setP("");
      }
      if (data.message.username) {
        setUEM(data.message.username);
        setU("is-invalid");
      } else {
        setUEM("");
        setU("");
      }
      if (data.message.name) {
        setNEM(data.message.name);
        setN("is-invalid");
      } else {
        setNEM("");
        setN("");
      }
      if (confirm !== password) {
        setCEM("Confirm password doesn't match");
        setC("is-invalid");
      } else {
        setCEM("");
        setC("");
      }
      return;
    }
    //redirect to home using router push

    //store the token in httpOnly cookie for 24 hours
    const token = data.data.token;
    const cookie = `token=${token};max-age=86400;`;
    document.cookie = cookie;
    router.push("/home");
  };

  // check if user is already logged in

  return (
    <div className="container">
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={"form-control " + name}
            id="nameperson"
            placeholder="Enter your Name"
          />
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {nameErrorMsg}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={"form-control " + username}
            id="username"
            placeholder="Enter your username"
          />
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {usernameErrorMsg}
          </div>
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
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {passwordErrorMsg}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className={"form-control " + conf}
            id="confirm"
            placeholder="Enter your password"
          />
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {confErrorMsg}
          </div>
        </div>
        <Link href="/login">Login Instead</Link>
        <div className="d-flex justify-content-center mt-2">
          <button type="submit" className="btn btn-primary w-50">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
