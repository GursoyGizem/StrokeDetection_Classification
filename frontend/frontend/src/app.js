import React, { useState } from "react";
import LoginForm from "./loginForm";
import LogoutButton from "./logOutButton";
import ResultCard from "./resultCard";
import SSSModal from "./SSSModal";
import UploadForm from "./uploadForm";

function App() {
  const [user, setUser] = useState(() => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" && token.trim() !== "" ? "user" : null;
  });
  const [result, setResult] = useState(null);
  const [showSss, setShowSss] = useState(false);
  const [view, setView] = useState("analyze"); 

  const goHome = () => {
    setResult(null);
    setView("analyze"); 
    window.scrollTo(0, 0);
  };

  const goList = () => {
    setResult(null);
    setView("list"); 
    window.scrollTo(0, 0);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data);
  };

  const handleLogin = (token) => {
    setUser("user");
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setResult(null);
  };

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(255,255,255,0.94), rgba(220,230,250,0.85)), url('/arka_plan.jpg') center center / cover no-repeat",
      }}
    >
      {/* Baslik */}
      <nav className="navbar navbar-expand-lg" style={{ background: "#e3f0ff" }}>
        <div className="container-fluid">
          <img src="/logo.png" alt="Logo" style={{ width: 70, marginRight: 16 }} />
          <span className="navbar-brand mb-0 h1 text-primary me-auto" style={{ fontWeight: 600, fontSize: 36 }}>
            BT İnme Asistanı
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-light" onClick={goHome}>
              Ana Sayfa
            </button>
            <button className="btn btn-light" onClick={goList}>
              Kayıtlı Hasta Listesi
            </button>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>
      </nav>

      {/* Orta Panel */}
      <div className="container py-5">
        {/* Analiz */}
        {view === "analyze" && (
          <div className="mx-auto mb-4" style={{ maxWidth: 980 }}>
            <div className="card shadow p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold m-0">İnme Tespiti ve Tipinin Belirlenmesi</h2>
                <button className="btn btn-outline-secondary" onClick={() => setShowSss(true)}>
                  SSS
                </button>
              </div>
              {/* Dosya yükleme ve analiz formu */}
              <form onSubmit={handleAnalyze} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label fw-bold">Hasta ID</label>
                  <input type="text" className="form-control" name="patient_id" placeholder="ID girin..." />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">İsim</label>
                  <input type="text" className="form-control" name="patient_name" placeholder="Hasta ismi girin..." />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Görüntü Yükle</label>
                  <input type="file" className="form-control" name="file" accept="image/png, image/jpeg" required />
                </div>
                <button className="btn btn-primary w-100" type="submit">
                  <i className="bi bi-search"></i> Analiz Et
                </button>
              </form>
            </div>
            {/* Analiz Sonucu */}
            {result && <ResultCard result={result} />}
          </div>
        )}

        {/* Hasta Kayit Listesi */}
        {view === "list" && (
          <div className="mx-auto mb-4" style={{ maxWidth: 1100 }}>
            <ResultCard />
          </div>
        )}
      </div>

      {/* SSS */}
      <SSSModal open={showSss} onClose={() => setShowSss(false)} />
    </div>
  );
}

export default App;
