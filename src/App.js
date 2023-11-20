import { useEffect, useState } from "react";
import Header from "./components/Header.js";
import Formpage from "./components/Formpage.js";
import "./App.css";

function App() {
  const student = [];
  let [students, setStudents] = useState(student);
  let getstudent = async () => {
    let response = await fetch(
      "https://crud-student-api-server.onrender.com0/getallstudents",
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
      }
    );
    let studnets = await response.json();
    setStudents(studnets);
  };

  useEffect(() => {
    getstudent();
  });

  return (
    <div>
      <Header />
      <Formpage students={students} setStudents={setStudents} />
    </div>
  );
}

export default App;