import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarMaintenance.css"; //poillll

const CarMaintenance = () => {
  const baseUrl = import.meta.env.VITE_API_URL;

  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    carModel: "",
    owner: "",
    serviceDate: "",
    issue: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all maintenance logs
  const fetchAllLogs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/carapi/all`);
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setMessage("Failed to fetch maintenance records.");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update maintenance record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${baseUrl}/carapi/update/${formData.id}`, formData);
        setMessage("Maintenance record updated successfully!");
      } else {
        await axios.post(`${baseUrl}/carapi/add`, formData);
        setMessage("Maintenance record added successfully!");
      }
      setFormData({ id: "", carModel: "", owner: "", serviceDate: "", issue: "" });
      setIsEditing(false);
      fetchAllLogs();
    } catch (error) {
      console.error("Error saving record:", error);
      setMessage("Failed to save record.");
    }
  };

  // Edit a maintenance record
  const editLog = (log) => {
    setFormData(log);
    setIsEditing(true);
  };

  // Delete a record
  const deleteLog = async (id) => {
    try {
      await axios.delete(`${baseUrl}/carapi/delete/${id}`);
      setMessage("Record deleted successfully!");
      fetchAllLogs();
    } catch (error) {
      console.error("Error deleting record:", error);
      setMessage("Failed to delete record.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllLogs();
  }, []);

  return (
    <div className="maintenance-container">
      <h1 className="title">Car Maintenance Management</h1>

      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit} className="maintenance-form">
        <input
          type="text"
          name="carModel"
          placeholder="Car Model"
          value={formData.carModel}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="serviceDate"
          value={formData.serviceDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="issue"
          placeholder="Issue Description"
          value={formData.issue}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-submit">
          {isEditing ? "Update Record" : "Add Record"}
        </button>
      </form>

      {Array.isArray(logs) && logs.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Car Model</th>
                <th>Owner</th>
                <th>Service Date</th>
                <th>Issue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.carModel}</td>
                  <td>{log.owner}</td>
                  <td>{log.serviceDate}</td>
                  <td>{log.issue}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => editLog(log)}>
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => deleteLog(log.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No maintenance records found.</p>
      )}
    </div>
  );
};

export default CarMaintenance;