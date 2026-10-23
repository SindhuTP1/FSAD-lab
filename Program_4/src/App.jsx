
import React, { useState } from "react";
import { StudentsTable, StudentAddSubmit } from "./Student.jsx";

function App() {
  const [students, setStudents] = useState([
    { slno: 1, name: "stud1", usn: "rvce1", marks: 150 },
    { slno: 2, name: "stud2", usn: "rvce2", marks: 145 }
  ]);

  function addStudent(student) {
  const newStudent = {
    ...student,
    slno: students.length + 1
  };

  setStudents([...students, newStudent]);
}


  return (
    <div>
      <h2>Student Registration Portal</h2>
      <StudentsTable students={students} />
      <h3>Add Student</h3>
      <StudentAddSubmit onAdd={addStudent} />
    </div>
  );
}

export default App;
