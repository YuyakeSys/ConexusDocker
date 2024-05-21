/*
 * @Author: Zhouyang Meng
 * @Date: 2024-02-16 03:07:34
 * @LastEditTime: 2024-05-02 13:21:37
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// pages/contact.js
"use client";

import Head from "next/head";
import Map from "./map";
import Contact from "./contact";

export default function ContactPage() {
  const API_KEY = "AIzaSyBsQESWPrbP-KgH9w2ln4Sc4zB_ezgKx7k";

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="container my-5">
        <h1 className="mb-4">Contact Us</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>Get in Touch</h2>
            {/* <form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form> */}
            <Contact />
          </div>
          <div className="col-md-6">
            <h2>Contact Information</h2>
            <p>
              <strong>Address:</strong> Your Address Here
            </p>
            <p>
              <strong>Phone:</strong> Your Phone Number Here
            </p>
            <p>
              <strong>Email:</strong> Your Email Here
            </p>
            {/* avoid over use */}
            {/* <Map address="Ørestads Boulevard 60, 4th 2300 Copenhagen" /> */}
          </div>
        </div>
      </div>
    </>
  );
}
