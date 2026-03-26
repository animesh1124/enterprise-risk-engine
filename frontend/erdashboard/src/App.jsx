import React, { useState, useEffect } from 'react';

export default function App() {
  const [trades, setTrades] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); // 

  const fetchData = async (currentPage) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/trades?page=${currentPage}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`Backend rejected request. Status: ${response.status}`);
      }

      const json = await response.json();
      
      console.log("📥 Data received from Python:", json);

      if (json.error) {
        setErrorMsg(json.error); 
      } else if (json.data && json.data.length > 0) {
        setTrades(json.data);
      } else {
        setErrorMsg("API connected, but the CSV file is empty.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setErrorMsg("Cannot connect to Python. Is the FastAPI server running on Port 8000?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>🛡️ Enterprise Risk Center</h1>
        <p style={{ color: '#666', margin: '5px 0' }}> Analytics Engine</p>
      </div>

      {/* ERROR MESSAGE BOX */}
      {errorMsg && (
        <div style={{ backgroundColor: '#ffeaa7', padding: '15px', borderRadius: '5px', color: '#d63031', fontWeight: 'bold', marginBottom: '20px' }}>
          ⚠️ ERROR: {errorMsg}
        </div>
      )}

      {/* DASHBOARD CONTAINER */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Live Trade Stream</h2>
          <div>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ padding: '5px 10px' }}>Prev</button>
            <span style={{ margin: '0 15px', fontWeight: 'bold' }}>Page {page}</span>
            <button onClick={() => setPage(p => p + 1)} style={{ padding: '5px 10px' }}>Next</button>
          </div>
        </div>

        {loading ? (
          <h3 style={{ textAlign: 'center', color: '#0984e3' }}>Loading Data...</h3>
        ) : trades.length > 0 ? (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#eee' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Currency</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(t => (
                <tr key={t.trade_id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>#{t.trade_id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>${t.amount.toLocaleString()}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t.currency}</td>
                  <td style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd',
                    color: t.risk_score.includes('High') ? 'red' : 'green',
                    fontWeight: 'bold' 
                  }}>
                    {t.risk_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}