# 🏥 MedFlow Clinic AI 🤖

**MedFlow Clinic AI** is an end-to-end, AI-powered clinical management platform built to modernize the patient journey. From intelligent appointment booking and real-time AI clinical diagnosis reports to automated billing and integrated payments, MedFlow represents the future of autonomous healthcare software.

---

## 🌟 Key Features

- **Multi-Agent AI Engine:** Leverages Google Gemini and LangGraph to analyze patient symptoms, cross-reference medical history, check safety conflicts, and generate comprehensive clinical reports in seconds.
- **Smart Patient Booking:** Responsive, beautiful web portal for patients to book appointments and provide preliminary health data.
- **AI Medical Billing:** Automatically suggests **ICD-10** (Diagnosis) and **CPT** (Procedure) codes based on the patient's medical history.
- **Integrated Payments:** Built-in Safepay checkout for secure online transactions with automated payment confirmation and status updates on the dashboard.
- **Doctor Portal:** Role-based dashboard with Dark/Light mode, patient timelines, and real-time revenue tracking.
- **Dual Databases:** Relational data stored securely in **MySQL**, with complex clinical relationships mapped in **Neo4j** (Graph Database).
- **Containerized Architecture:** Fully dockerized for seamless, one-command deployment anywhere.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **AI / LLMs:** Google Gemini API, LangGraph, LangChain
- **Databases:** MySQL 8.0, Neo4j 5.11
- **Authentication:** Firebase Auth
- **Infrastructure:** Docker, Docker Compose
- **Payments:** Safepay (Sandbox)

---

## 🚀 Setup & Installation Guide

Follow these steps to deploy MedFlow Clinic AI locally using Docker.

### 1. Prerequisites
- **Docker Desktop** installed and running on your machine.
- **Git** installed.
- (Optional) A Firebase account for Doctor authentication.

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/medflow_deliverable.git
cd medflow_deliverable
```

### 3. Configure API Keys
To run the AI synthesis and authentication, you must provide your own API keys.
Open `docker-compose.yml` and replace the placeholder values under the `backend` and `frontend` environments:

- `GEMINI_API_KEY=Your_Google_Gemini_Key`
- `NEXT_PUBLIC_FIREBASE_API_KEY=Your_Firebase_Config_Key`
- `SAFEPAY_PUBLIC_KEY=Your_Safepay_Public_Key`
- `SAFEPAY_SECRET_KEY=Your_Safepay_Secret_Key`

*(Note: The system will run without these, but AI features and Doctor Login require valid keys to function.)*

### 4. Build and Run the Containers
With Docker Desktop running, execute the following command in the root folder:

```bash
docker-compose up -d --build
```
This will download all necessary dependencies and spin up 4 containers:
1. `frontend` (Next.js)
2. `backend` (FastAPI)
3. `mysql` (Relational DB)
4. `neo4j` (Graph DB)

*(The first build may take 3-5 minutes depending on your internet speed.)*

### 5. Access the Platform
Once the containers are running:
- **Patient Booking Portal:** [http://localhost:3000](http://localhost:3000)
- **Doctor Dashboard:** [http://localhost:3000/doctor/login](http://localhost:3000/doctor/login)
- **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Neo4j Graph Dashboard:** [http://localhost:7474](http://localhost:7474)

---

## 🤝 Contributing
Feel free to fork this repository, submit Pull Requests, or open Issues for any bugs or feature requests!

> **Note:** The n8n automation layer has been decoupled from this open-source release to keep the codebase clean and lightweight.
