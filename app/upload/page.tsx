"use client";
import React, { useRef, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";

function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const imgRef = useRef<HTMLImageElement>(null); // create a reference to the img element

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    if (imgRef.current) {
      imgRef.current.setAttribute(
        "src",
        URL.createObjectURL(e.target.files[0])
      ); // set the src attribute of the img element
    }
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // create form data with file and description
    const formData = new FormData();
    if (!file) {
      alert("Please select a photo to upload!");
      return;
    }
    formData.append("file", file);
    formData.append("description", description);

    // get bearer token from local storage
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      // make post request to backend with form data and token
      const response = await fetch("http://localhost:8080/api/photos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }

      alert("Photo uploaded successfully");
      //refresh page as a whole
      router.push("/home");
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="photo-upload">Photo Upload:</label>
            <input
              type="file"
              className="form-control"
              id="photo-upload"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <br />
            {file && (
              <div className="d-flex justify-content-center">
                <img
                  id="preview-img"
                  className="img-fluid mt-3"
                  src={URL.createObjectURL(file)}
                  alt="Selected file preview"
                  ref={imgRef}
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
