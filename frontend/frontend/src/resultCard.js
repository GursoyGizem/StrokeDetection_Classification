import React, { useEffect, useState } from "react";

function ResultCard({ result }) {
  const [data, setData] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [filterTahmin, setFilterTahmin] = useState("");

  // api/records get istegi yollar
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/records");
      const list = await res.json();
      setData(list);
    } catch {
      setData([]);
    }
  };
  
  // render
  useEffect(() => { fetchData(); }, []);
  
  // api/delete/<record_id> post yollar
  // listeyi gunceller
  const handleDelete = async (record_id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    await fetch(`http://127.0.0.1:5000/api/delete/${record_id}`, { method: "POST" });
    fetchData();
  };

  // filtreleme
  const filtered = data.filter(row =>
    (row.id || "").toLowerCase().includes(filterId.toLowerCase()) &&
    (row.tahmin || "").toLowerCase().includes(filterTahmin.toLowerCase())
  );

  // resultCard
  if (result) {
    const isStrokeDetected = result.label !== "İnme Yok";
    const type = isStrokeDetected ? result.label : "-";
    const confidence = result.confidence;

    return (
      <div className="mx-auto" style={{ maxWidth: 600 }}>
        <div className="card shadow mt-4 p-4 text-center">
          <h3 className="fw-bold mb-3">
            İnme Tespit Sonucu:{" "}
            <span className={isStrokeDetected ? "text-success" : "text-danger"}>
              {isStrokeDetected ? "İNME VAR" : "İNME YOK"}
            </span>
          </h3>
          <p className="mb-2"><b>Tür:</b> {type}</p>
          <div className="progress mb-2" style={{ height: 22 }}>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: `${(confidence * 100).toFixed(2)}%` }}
              aria-valuenow={confidence * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {(confidence * 100).toFixed(1)}%
            </div>
          </div>
          <p className="text-muted">Sonuç güven skoru</p>
        </div>
      </div>
    );
  }

  // filtreleme/csv ozelligi
  return (
    <div className="mx-auto mt-4" style={{ maxWidth: 1100 }}>
      {/* Filtre inputları */}
      <div className="row mb-3 g-2 align-items-center">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Hasta ID ile filtrele"
            value={filterId}
            onChange={e => setFilterId(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Tahmine göre filtrele"
            value={filterTahmin}
            onChange={e => setFilterTahmin(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-grid">
          {}
        </div>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-success fw-bold"
          onClick={() => {
            const csvRows = [
              ['Hasta ID', 'İsim', 'Tahmin', 'Güven', 'Görüntü'],
              ...filtered.map(row => [row.id, row.isim, row.tahmin, row.guven, row.image_url])
            ];
            const csvContent = csvRows.map(e => e.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "analiz_kayitlari.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <i className="bi bi-download" /> Verileri CSV Olarak İndir
        </button>
      </div>
      <table className="table table-bordered align-middle text-center shadow">
        <thead className="table-primary">
          <tr>
            <th>Hasta ID</th>
            <th>İsim</th>
            <th>Tahmin</th>
            <th>Güven</th>
            <th>Görüntü</th>
            <th>PDF</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} className="text-muted">Kayıt bulunamadı.</td>
            </tr>
          )}
          {filtered.map(row => (
            <tr key={row.record_id}>
              <td>{row.id}</td>
              <td>{row.isim}</td>
              <td>{row.tahmin}</td>
              <td>{row.guven}%</td>
              <td>
                {row.image && (
                  <>
                    <img
                      src={`http://127.0.0.1:5000/static/${row.image}`}
                      width={50}
                      alt="Görüntü"
                      style={{ borderRadius: 8, border: '1px solid #ddd' }}
                    />
                  </>
                )}
              </td>
              <td>
                <a
                  href={`http://127.0.0.1:5000/api/report/${row.record_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >PDF</a>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.record_id)}>
                  <i className="bi bi-trash"></i> Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultCard;
