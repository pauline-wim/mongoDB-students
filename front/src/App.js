import Form from "./components/Form";
import List from "./components/List";
import { createContext, useState, useEffect } from "react";

export const StudentsContext = createContext();

function App() {
  const [students, setStudents] = useState([]);

  const studentsContext = {
    students,
    setStudents,
  };

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json(res))
      .then((res) => {
        // console.log(res);
        setStudents(res);
      });
  }, []);

  return (
    <StudentsContext.Provider value={studentsContext}>
      <div>
        <h1>Students</h1>
        <Form />
        <List />
      </div>
    </StudentsContext.Provider>
  );
}

export default App;
