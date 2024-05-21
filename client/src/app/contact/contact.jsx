/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-02 13:18:12
 * @LastEditTime: 2024-05-02 14:20:41
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
"use client";

import { useForm } from "react-hook-form";
import { sendEmail } from "../utils/send-email";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    sendEmail(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="form-label"
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="form-control"
          {...register("email", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className="form-control"
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Contact;
