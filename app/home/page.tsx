"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

export default async function home() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const router = useRouter();

  const resPhoto = await fetch("http://localhost:8080/api/photos/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultPhoto = await resPhoto.json();

  const resultPhotoData = resultPhoto.data;

  //map through the resultPhotoData and console.log the photoLink

  console.log(resultPhoto);

  if (resPhoto.status == 200) {
    console.log(resultPhoto);
  } else {
    router.push("/login");
  }

  resultPhotoData.map((photo: { photoLink: any; comments: any }) => {
    console.log(photo.photoLink);
    const comments = photo.comments;
    comments.map(
      (comment: { comment: any; username: any; commentDate: any }) => {
        console.log(comment.comment);
        console.log(comment.username);
        console.log(comment.commentDate);
      }
    );
  });

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          {resultPhotoData.map(
            (photo: {
              photoLink: any;
              postUserId: any;
              postUsername: any;
              photoDate: any;
              comments: any;
              photoId: any;
              photoDescription: any;
              isOwner: boolean;
              commentsSize: any;
            }) => (
              <div key={photo.photoId} className="col-md-6 mb-4">
                <div className="card">
                  <img src={photo.photoLink} className="card-img-top" />
                  <div className="card-body">
                    <p className="card-text">{photo.photoDescription}</p>
                  </div>
                  <div
                    className={`card-footer small ${
                      photo.isOwner ? "bg-primary text-white" : "text-muted"
                    }`}
                  >
                    By: {photo.postUsername}
                    <br />
                    {new Date(photo.photoDate).toLocaleString("en-GB", {
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
                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment"
                      /> */}
                      <span className="small text-muted">
                        Showing {photo.comments.length} of {photo.commentsSize}{" "}
                        latest comments
                      </span>
                    </div>
                    {/* result map comments here */}
                    {photo.comments.map(
                      (comment: {
                        comment: any;
                        username: any;
                        commentDate: Date;
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
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {comment.username}{" "}
                                </p>
                                <p className="text-muted small">
                                  {
                                    //comment.commentDate to dd-mm-yyyy hh:mm
                                    new Date(
                                      comment.commentDate
                                    ).toLocaleString("en-GB", {
                                      day: "numeric",
                                      month: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    })
                                  }
                                </p>
                              </div>
                              <p className="small mb-0">{comment.comment}</p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <div className="d-flex justify-content-end">
                      <Link href={`/post/${photo.photoId}`}>
                        <button type="button" className="btn btn-warning">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
