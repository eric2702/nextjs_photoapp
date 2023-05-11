"use client";
import Navbar from "@/app/components/navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostDetails({ params }: { params: { slug: string } }) {
  const [resultPhotoData, setResultPhotoData] = useState({
    photoId: "",
    photoLink: "",
    photoDescription: "",
    postUsername: "",
    photoDate: "",
    isOwner: false,
    comments: [],
    commentsSize: 0,
  });
  const [resultCommentData, setResultCommentData] = useState([]);

  const router = useRouter();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  async function handleDelete(photoId: string): Promise<void> {
    const res = await fetch(`http://localhost:8080/api/photos/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      alert("Photo deleted successfully");
      router.push("/home");
      // Implement any other necessary actions after successful deletion
    } else {
      alert("Failed to delete photo");
      router.refresh();
      // Implement any necessary error handling
    }
  }

  async function handleCommentPost(): Promise<void> {
    const photoId = params.slug;
    const commentInput = document.getElementById(
      "comment-input"
    ) as HTMLInputElement;
    const comment = commentInput.value.trim();
    const res = await fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        photoId,
      }),
    });

    if (res.status == 201) {
      commentInput.value = "";
      //get newest comments from /api/comments/all/photoId
      const resComment = await fetch(
        `http://localhost:8080/api/comments/all/${resultPhotoData.photoId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resUpdateComment = await resComment.json();
      console.log(resUpdateComment);
      const resultUpdateCommentData = resUpdateComment.data;
      setResultCommentData(resultUpdateCommentData);

      // Implement any other necessary actions after successful comment submission
    } else {
      alert("Failed to post comment");
      // Implement any necessary error handling
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const resPhoto = await fetch(
          `http://localhost:8080/api/photos/${params.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resultPhoto = await resPhoto.json();
        console.log(resultPhoto);
        const resultPhotoData = resultPhoto.data;
        //if resultphotodata is empty array, alert photo doesnt exist
        if (resultPhotoData.length == 0) {
          alert(resultPhoto.message);
          router.push("/home");
          return;
        }
        setResultPhotoData(resultPhotoData);
        setResultCommentData(resultPhotoData.comments);
      } catch (error) {
        console.error(error);
        //alert photo doesnt exist
        alert("Photo does not exist");
        router.push("/home");
        return;
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <div className="p-3 rounded" style={{ background: "#F7F7F7" }}>
          <h3>Actions</h3>
          {resultPhotoData.isOwner && (
            <button
              className="btn btn-danger ms-auto"
              onClick={() => handleDelete(resultPhotoData.photoId)}
            >
              Delete
            </button>
          )}
        </div>

        <div className="row mt-3">
          <div key={resultPhotoData.photoId} className="col-12 mb-4">
            <div className="card">
              <img src={resultPhotoData.photoLink} className="card-img-top" />
              <div className="card-body">
                <p className="card-text">{resultPhotoData.photoDescription}</p>
              </div>
              <div
                className={`card-footer small ${
                  resultPhotoData.isOwner
                    ? "bg-primary text-white"
                    : "text-muted"
                }`}
              >
                By: {resultPhotoData.postUsername}
                <br />
                {new Date(resultPhotoData.photoDate).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <div className="card-body">
                <h6>Comments</h6>
                <div className="mb-3">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="comment-input"
                      placeholder="Add a comment"
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => handleCommentPost()}
                    >
                      Post
                    </button>
                  </div>
                  <span className="small text-muted">
                    Total: {resultPhotoData.commentsSize} comments
                  </span>
                </div>
                {/* result map comments here */}
                {resultCommentData.map(
                  (comment: {
                    comment: any;
                    username: any;
                    commentDate: any;
                  }) => (
                    <div className="d-flex flex-start my-2">
                      <a className="me-3" href="#">
                        <img
                          className="rounded-circle shadow-1-strong"
                          src="https://cdn-icons-png.flaticon.com/512/61/61205.png"
                          alt="avatar"
                          width="65"
                          height="65"
                        />
                      </a>
                      <div className="flex-grow-1 flex-shrink-1">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1" style={{ fontWeight: "bold" }}>
                              {comment.username}{" "}
                              {/* <span className="small">- 3 hours ago</span> */}
                            </p>
                            <p className="text-muted small">
                              {
                                //comment.commentDate to dd-mm-yyyy hh:mm
                                new Date(comment.commentDate).toLocaleString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }
                                )
                              }
                            </p>
                          </div>
                          <p className="small mb-0">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
