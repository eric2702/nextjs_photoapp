import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

export default function Navbar() {
  const router = useRouter();

  const handleSubmit = async () => {
    // delete cookie token from browser
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Logout berhasil");
    router.push("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <Link
              passHref={true}
              style={{ textDecoration: "none", color: "black" }}
              href={"/"}
            >
              PhotoApp
            </Link>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page">
                  <Link
                    passHref={true}
                    style={{ textDecoration: "none", color: "black" }}
                    href={"/home"}
                  >
                    Home
                  </Link>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <Link
                    passHref={true}
                    style={{ textDecoration: "none", color: "black" }}
                    href={"/upload"}
                  >
                    Upload
                  </Link>
                </span>
              </li>
            </ul>
            <div className="ms-auto">
              <button onClick={handleSubmit} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
