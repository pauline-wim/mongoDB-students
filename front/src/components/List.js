import React from "react";
import { useContext } from "react";
// Context
import { StudentsContext } from "../App";

export default function Form() {
  const studentsContext = useContext(StudentsContext);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {studentsContext.students.map((student, i) => {
          return (
            <li key={student.name + i}>
              {student.name} ({student.city})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
