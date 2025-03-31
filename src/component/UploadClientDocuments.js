import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Config";
import "../style/uploaddocs.css";

const UploadClientDocuments = ({ clientId }) => {
  const [files, setFiles] = useState({});
  const [existingDocs, setExistingDocs] = useState({});
  const [cibilScore, setCibilScore] = useState("");
  const [message, setMessage] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_URL}/client-documents/${clientId}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setExistingDocs(response.data);
        setCibilScore(response.data.cibil_score || "");
      } catch (error) {
        console.error("❌ Error fetching client documents:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    fetchDocuments();
  }, [clientId, accessToken]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log(`🟡 Selected file for ${e.target.name}:`, file.name, file.size);

    setFiles((prevFiles) => ({ ...prevFiles, [e.target.name]: file }));
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

    console.log("🔵 FormData contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setMessage("Uploading documents...");

    try {
      const response = await axios.patch(
        `${API_URL}/upload-documents/${clientId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("✅ Upload Success:", response.data);
      setMessage("Documents uploaded successfully!");
      setFiles({}); 
      setExistingDocs(response.data);
      
      setTimeout(() => {
        window.location.reload();
      }, 3000); // ✅ Refresh page after 3 seconds
    } catch (error) {
      console.error("❌ Upload Failed:", error);
      setMessage("Failed to upload documents");
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
      }
    }
  };

  return (
    <div>
      <h2>Upload Documents for Client {clientId}</h2>
      <form onSubmit={handleSubmit}>
        <label>CIBIL Score:</label>
        <input
          type="number"
          name="cibil_score"
          value={cibilScore}
          onChange={(e) => setCibilScore(e.target.value)}
        />
        <br />

        {["aadhaar_front", "aadhaar_back", "cibil_report", "pan_card", "gas_bill"].map((doc) => (
          <div key={doc}>
            <label>{doc.replace("_", " ").toUpperCase()}:</label>
            <br />
            {existingDocs[doc] ? (
              <>
                <img 
                  src={`http://127.0.0.1:8000${existingDocs[doc]}`} 
                  alt={doc} 
                  width="330" 
                  onError={(e) => (e.target.style.display = "none")}
                />
                <p>Change File:</p>
              </>
            ) : <p>No file uploaded</p>}
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