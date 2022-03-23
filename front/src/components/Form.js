import React from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
// Context
import { StudentsContext } from "../App";

export default function Form() {
  const studentsContext = useContext(StudentsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    studentsContext.setStudents((prev) => [
      ...prev,
      {
        id: studentsContext.students.length + 1,
        name: data.userEntry,
        city: data.cityEntry,
      },
    ]);
    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.userEntry, city: data.cityEntry }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {console.log(studentsContext.names)} */}
      <label>
        Name:
        <input type="text" {...register("userEntry", { required: true })} />
      </label>
      <label>
        City:
        <input type="text" {...register("cityEntry", { required: true })} />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
}
