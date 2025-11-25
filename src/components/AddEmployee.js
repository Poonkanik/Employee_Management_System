import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddEmployee() {
  const [emp, setEmp] = useState({
    name: "",
    role: "",
    email: "",
    experience: 0,
    salary: 0,
    backgroundCheck: false,
    degreeVerification: false,
  });

  const navigate = useNavigate();

  // Use .env if set, else fallback
  const API_BASE = process.env.REACT_APP_API || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    await axios.post(`${API_BASE}/api/employees`, emp, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Employee added successfully");
      navigate("/home"); // Go back to home
    } catch (err) {
      console.error("Add employee error:", err);

      // Detailed error information
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Status:", err.response.status);
        alert(
          `Error adding employee (status ${err.response.status}). Check console for details.`
        );
      } else if (err.request) {
        console.error("No response:", err.request);
        alert("No response from backend. Is Spring Boot running?");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {["name", "role", "email", "experience", "salary"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "experience" || field === "salary" ? "number" : "text"}
              value={emp[field]}
              onChange={(e) =>
                setEmp({
                  ...emp,
                  [field]:
                    field === "experience" || field === "salary"
                      ? Number(e.target.value)
                      : e.target.value,
                })
              }
              required
            />
          </div>
        ))}

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={emp.backgroundCheck}
              onChange={(e) =>
                setEmp({ ...emp, backgroundCheck: e.target.checked })
              }
            />
            Background Check
          </label>

          <label style={{ marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={emp.degreeVerification}
              onChange={(e) =>
                setEmp({
                  ...emp,
                  degreeVerification: e.target.checked,
                })
              }
            />
            Degree Verification
          </label>
        </div>

        <button type="submit" className="btn">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
