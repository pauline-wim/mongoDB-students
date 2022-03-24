import React from "react";
import { useContext } from "react";
// Context
import { StudentsContext } from "../App";
// CSS
import "../App.css";

export default function Form() {
  const studentsContext = useContext(StudentsContext);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {studentsContext.students.map((student, i) => {
          studentsContext.students.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          );
          return (
            <li key={student.firstName + i}>
              {student.firstName}{" "}
              <span className="bold">{student.lastName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
