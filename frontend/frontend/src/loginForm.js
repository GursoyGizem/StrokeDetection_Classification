import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        onLogin(data.token);
      } else {
        setError(data.error || "Giriş başarısız!");
      }
    } catch (err) {
      setError("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: `linear-gradient(rgba(255,255,255,0.93), rgba(220,230,250,0.92)), url('/arka_plan.png') center center / cover no-repeat`,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Baslik */}
        <nav
          className="navbar"
          style={{
            background: "#e3f0ff",
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center", 
            boxShadow: "0 2px 8px #e6e6e6",
            position: "relative"
          }}
        >
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: 85,
              position: "absolute",
              left: 32, 
              top: "50%",
              transform: "translateY(-50%)"
            }}
          />
          {/* Ortada Baslik */}
          <span
            style={{
              fontWeight: 600,
              fontSize: 38,
              letterSpacing: 1,
              color: "#2186eb",
              textAlign: "center"
            }}
          >
            BT İnme Asistanı
          </span>
        </nav>

      {/* Login Card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 0 32px #ececec",
            padding: "40px 60px",
            minWidth: 350,
            maxWidth: "90vw"
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: "bold", textAlign: "center", marginBottom: 32 }}>
            Yetkili Girişi
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-bold" style={{ marginBottom: 4 }}>Kullanıcı Adı</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                style={{
                  borderRadius: 8,
                  border: "1px solid #cce1ff",
                  boxShadow: "0 1px 4px #e8f0fe",
                  padding: "10px 16px"
                }}
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold" style={{ marginBottom: 4 }}>Şifre</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: 8,
                  border: "1px solid #cce1ff",
                  boxShadow: "0 1px 4px #e8f0fe",
                  padding: "10px 16px"
                }}
              />
            </div>
            {error && (
              <div className="alert alert-danger" style={{ fontSize: 15, marginBottom: 12 }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: 8,
                background: "#2186eb",
                border: "none",
                marginTop: 8,
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: 1
              }}
            >
              Giriş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;