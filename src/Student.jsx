import React, { useState } from "react";

function StudentRow({ student }) {
  return (
    <tr>
      <td>{student.slno}</td>
      <td>{student.name}</td>
      <td>{student.usn}</td>
      <td>{student.marks}</td>
    </tr>
  );
}

function StudentsTable({ students }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Student Name</th>
          <th>USN</th>
          <th>Total Marks</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow key={student.slno} student={student} />
        ))}
      </tbody>
    </table>
  );
}

function StudentAddSubmit({ onAdd }) {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [marks, setMarks] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !usn.trim() || marks === "") {
      alert("Please fill all fields");
      return;
    }

    onAdd({ name: name.trim(), usn: usn.trim(), marks: Number(marks) });

    setName("");
    setUsn("");
    setMarks("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export { StudentsTable, StudentAddSubmit };