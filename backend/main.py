from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from engine import RiskScanner 

app = FastAPI(title="Enterprise Risk Engine")


origins = [
    "http://localhost:5173",
    "http://localhost:5174",  
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",  
    "http://127.0.0.1:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "System Online", "engine": "FastAPI"}

@app.get("/trades")
def get_trades(page: int = 1, limit: int = 15):
    file_path = "trades.csv"
    
    if not os.path.exists(file_path):
        return {"error": "trades.csv not found. Run make_data.py first!"}

    
    df = pd.read_csv(file_path)
    
    # 2. Server-Side Pagination Logic
    start = (page - 1) * limit
    end = start + limit
    chunk = df.iloc[start:end].to_dict(orient="records")
    
    # 3. Apply OOP Risk Logic (Strategy Pattern)
    scanner = RiskScanner()
    for trade in chunk:
        trade['risk_score'] = scanner.check(trade['amount'])
        
    return {
        "metadata": {
            "total_records": len(df),
            "current_page": page,
            "page_limit": limit
        },
        "data": chunk
    }