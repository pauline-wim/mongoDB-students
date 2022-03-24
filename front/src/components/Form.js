import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
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
        firstName: data.firstNameEntry,
        lastName: data.lastNameEntry,
      },
    ]);
    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstNameEntry,
        lastName: data.lastNameEntry,
      }),
    });
  };

  const onDelete = (data) => {
    studentsContext.setStudents((prev) => {
      return prev.filter((student) => {
        return student.firstName !== data.firstNameEntry;
      });
    });

    fetch(`http://localhost:8000/students/${data.firstNameEntry}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name:
        <input
          type="text"
          {...register("firstNameEntry", { required: true })}
        />
        {errors.firstNameEntry && (
          <span>Please enter the student first name</span>
        )}
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" {...register("lastNameEntry", { required: true })} />
        {errors.lastNameEntry && <span>The student last name is required</span>}
      </label>
      <br />
      <input type="submit" value="Save" />
      <input type="button" value="Delete" onClick={handleSubmit(onDelete)} />
    </form>
  );
}
