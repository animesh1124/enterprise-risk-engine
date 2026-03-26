# 🛡️ Enterprise Risk & Governance Engine

A full-stack, decoupled internal tool designed to ingest, process, and evaluate high-volume financial trade logs. Built with a focus on deterministic logic, strict data separation, and high-performance rendering.

## 🏗️ Architecture & Tech Stack
* **Backend Engine:** Python, FastAPI, Pandas
* **Frontend Dashboard:** React, Vite
* **Design Pattern:** Strategy Pattern (for scalable, auditable risk rules)
* **Data Handling:** Server-side pagination for 100k+ record datasets

## ⚙️ Core Features
* **Asynchronous Processing:** FastAPI implementation ensures non-blocking data retrieval.
* **Separation of Concerns:** Business logic (risk evaluation) is strictly isolated from the routing layer via OOP principles.
* **High-Volume Ingestion:** Pandas is utilized to efficiently parse and serialize massive CSV datasets into structured JSON payloads.

## 🚀 Quick Start
**1. Start the Risk Engine (Backend)**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
