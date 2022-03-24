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

  const onDelete = (data) => {
    studentsContext.setStudents((prev) => {
      return prev.filter((student) => {
        return student.name !== data.userEntry;
      });
    });

    fetch(`http://localhost:8000/students/${data.userEntry}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register("userEntry", { required: true })} />
        {errors.userEntry && <span>Please enter a student name</span>}
      </label>
      <label>
        City:
        <input type="text" {...register("cityEntry", { required: false })} />
      </label>
      <input type="submit" value="Save" />
      <input type="button" value="Delete" onClick={handleSubmit(onDelete)} />
    </form>
  );
}
