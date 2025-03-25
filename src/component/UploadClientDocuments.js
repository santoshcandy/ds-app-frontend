import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadClientDocuments = ({ clientId }) => {
  const [files, setFiles] = useState({});
  const [existingDocs, setExistingDocs] = useState({});
  const [cibilScore, setCibilScore] = useState("");
  const [message, setMessage] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Use env variable

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_URL}/manage/client-documents/${clientId}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setExistingDocs(response.data);
        setCibilScore(response.data.cibil_score || "");
      } catch (error) {
        console.error("Error fetching client documents", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    fetchDocuments();
  }, [clientId, accessToken, API_URL]);

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cibil_score", cibilScore || 500);

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }

    try {
      const response = await axios.post(`${API_URL}/manage/upload-documents/${clientId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to upload documents");
      console.error(error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  return (
    <div>
      <h2>Upload Documents for Client {clientId}</h2>
      <form onSubmit={handleSubmit}>
        <label>CIBIL Score:</label>
        <input type="number" name="cibil_score" value={cibilScore} onChange={(e) => setCibilScore(e.target.value)} />
        <br />

        {["aadhaar_front", "aadhaar_back", "cibil_report", "pan_card", "gas_bill"].map((doc) => (
          <div key={doc}>
            <label>{doc.replace("_", " ").toUpperCase()}:</label>
            <br />
            {existingDocs[doc] ? (
              <>
                <img src={`${API_URL}${existingDocs[doc]}`} alt={doc} width="150" onError={(e) => (e.target.style.display = "none")} />
                <p>Change File:</p>
              </>
            ) : (
              <p>No file uploaded</p>
            )}
            <input type="file" name={doc} onChange={handleFileChange} />
            <br />
          </div>
        ))}

        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadClientDocuments;
