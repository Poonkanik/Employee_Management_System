import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddEmployee() {
  const [emp, setEmp] = useState({
    name: "",
    role: "",
    email: "",
    experience: "",
    salary: "",
    backgroundCheck: false,
    degreeVerification: false,
  });

  const navigate = useNavigate();

  const API_BASE =
    process.env.REACT_APP_API ||
    "https://employee-management-sys-backend-2.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❗ FIX: Remove fields that backend does not support
    const payload = {
      name: emp.name,
      role: emp.role,
      email: emp.email,
      experience: Number(emp.experience) || 0,
      salary: Number(emp.salary) || 0,
    };

    try {
      await axios.post(`${API_BASE}/api/employees`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Employee added successfully");
      navigate("/home");
    } catch (err) {
      console.error("Add employee error:", err);

      if (err.response) {
        alert(`Backend error: ${err.response.status}`);
      } else {
        alert("Network error. Backend may be sleeping.");
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
                  [field]: e.target.value,
                })
              }
              required
            />
          </div>
        ))}

        {/* UI still keeps these checkboxes */}
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
                setEmp({ ...emp, degreeVerification: e.target.checked })
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
