import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.REACT_APP_API ||
    "https://employee-management-sys-backend.onrender.com";

  const [emp, setEmp] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/employees/${id}`)
      .then((res) => setEmp(res.data))
      .catch((err) => console.error("GET error:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE}/api/employees/${id}`, emp, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Employee Updated");
      navigate("/home");
    } catch (err) {
      console.error("PUT error:", err);
      alert("Error updating employee");
    }
  };

  if (!emp) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input
          value={emp.name}
          onChange={(e) => setEmp({ ...emp, name: e.target.value })}
        />

        <label>Email</label>
        <input
          value={emp.email}
          onChange={(e) => setEmp({ ...emp, email: e.target.value })}
        />

        <label>Role</label>
        <input
          value={emp.role}
          onChange={(e) => setEmp({ ...emp, role: e.target.value })}
        />

        <label>Experience</label>
        <input
          type="number"
          value={emp.experience}
          onChange={(e) =>
            setEmp({ ...emp, experience: Number(e.target.value) })
          }
        />

        <label>Salary</label>
        <input
          type="number"
          value={emp.salary}
          onChange={(e) => setEmp({ ...emp, salary: Number(e.target.value) })}
        />

        <button type="submit" className="btn">
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
