"use client";
import Link from "next/link";

import React, { useEffect } from "react";

export default function welcome() {
  return (
    <div>
      <div className="container">
        <h1 className="text-center">WELCOME TO THE PHOTO APP</h1>

        <div className="row">
          <div className="col justify-content-center d-flex">
            <Link href="/login" className="w-50">
              <button className="btn btn-primary w-100">Login</button>
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col justify-content-center d-flex">
            <Link href="/register" className="w-50">
              <button className="btn btn-primary w-100">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
