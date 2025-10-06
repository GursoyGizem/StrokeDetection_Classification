import React, { useState } from "react";

// hasta ıd, isim ve file alir post eder ve model devreye girer
function UploadForm({ onUploaded }) {
  const [id, setId] = useState("");
  const [isim, setIsim] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);         
    formData.append("isim", isim);     
    formData.append("file", file);     

    const res = await fetch("http://127.0.0.1:5000/predict", { method: "POST", body: formData });

    if (res.ok) {
      setId("");
      setIsim("");
      setFile(null);
      onUploaded && onUploaded();  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="ID girin..."
        value={id}
        onChange={e => setId(e.target.value)}
        name="id"
        required
      />
      <input
        placeholder="Hasta ismi girin..."
        value={isim}
        onChange={e => setIsim(e.target.value)}
        name="isim"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Analiz Et</button>
    </form>
  );
}
export default UploadForm;