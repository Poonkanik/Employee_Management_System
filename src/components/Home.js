import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

 const API_BASE = process.env.REACT_APP_API || "http://localhost:8080";



  const fetchEmployees = () => {
    axios
      .get(`${API_BASE}/api/employees`)
      .then((res) => setEmployees(res.data || []))
      .catch((err) => {
        console.error("API Error:", err);
        setEmployees([]);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await axios.delete(`${API_BASE}/api/employees/${id}`);
      alert("Employee deleted");
      fetchEmployees();
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Employee List</h2>

      <Link to="/add-employee">
        <button className="btn">Add New Employee</button>
      </Link>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(employees) &&
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.email}</td>
                  <td>{emp.experience}</td>
                  <td>{emp.salary}</td>

                  <td>
                    <div className="actions">
                      <button
                        className="btn edit-btn"
                        onClick={() => navigate(`/edit-employee/${emp.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn delete-btn"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
