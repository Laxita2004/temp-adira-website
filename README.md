# 🪷 Adira Product Recommendation System

A **Next.js + FastAPI** based intelligent product recommendation system designed for the **Adira Sarees** website.
The system suggests visually and contextually similar sarees based on product descriptions, using **TF-IDF vectorization** and **cosine similarity** to analyze and match items.

---

## 🌟 Features

### 🛍️ Frontend (Next.js)

* Dynamic product detail pages
* Integrated recommendation section (“You may also like…”)
* Fetches related products via FastAPI
* Responsive, minimal, and elegant UI
* Deployed on **Vercel**

### ⚙️ Backend (FastAPI)

* Uses **TF-IDF (Term Frequency–Inverse Document Frequency)** and **Cosine Similarity**
* Returns top similar products for a given item
* Integrates easily with any product database or JSON file
* CORS-enabled for smooth frontend communication

---

## 🧠 How It Works

1. **Text Processing:**
   Each product’s title, description, tags, and category are combined into a single text field.

2. **Vectorization with TF-IDF:**
   The textual data is converted into numeric vectors representing word importance.

3. **Similarity Calculation:**
   Using **cosine similarity**, the system identifies products with similar textual patterns.

4. **Recommendations:**
   The top N most similar products are sent to the frontend for display.

---

## 🧩 Tech Stack

| Layer                        | Technology                                    |
| ---------------------------- | --------------------------------------------- |
| **Frontend**                 | Next.js 14 (React + TypeScript)               |
| **Backend**                  | FastAPI (Python)                              |
| **ML/Recommendation Engine** | TF-IDF Vectorizer, Scikit-learn               |
| **Deployment**               | Vercel (Frontend), Localhost or EC2 (Backend) |
| **Data**                     | JSON-based product dataset                    |

---

## 🚀 Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/adira-recommendation-system.git
cd adira-recommendation-system
```

---

### 2️⃣ Frontend Setup (Next.js)

```bash
cd src
npm install
npm run dev
```

The frontend will start on:
👉 `http://localhost:3000`

---

### 3️⃣ Backend Setup (FastAPI)

#### Install dependencies:

```bash
pip install fastapi uvicorn scikit-learn pandas
```

#### Run the server:

```bash
uvicorn main:app --reload
```

The backend will start on:
👉 `http://127.0.0.1:8000`

---

### 4️⃣ API Example

**Endpoint:**

```
GET /recommend?title=<Product Title>
```

**Response Example:**

```json
{
  "recommendations": [
    {
      "id": 12,
      "title": "GulChaand",
      "description": "A drape that blooms like poetry...",
      "price": "4999",
      "images": [
        { "id": 1, "url": "https://example.com/gulchaand.jpg" }
      ],
      "tags": ["hand painted", "rani pink"]
    }
  ]
}
```

---

## 🌐 Deployment

### ✅ Frontend:

Deployed via **Vercel** (Free tier works perfectly).

### ✅ Backend:

Options:

* Run locally (for demos)
* Deploy on **AWS EC2** or **Render** if required 
  *(AWS Free Tier EC2 t2.micro is sufficient for testing)*

---

## 🧾 Literature Summary

The recommendation module leverages **TF-IDF and cosine similarity** to analyze product similarity based on textual attributes such as description, material, and style.
This approach ensures efficient, scalable, and content-driven recommendations without needing user profiles — ideal for early-stage e-commerce setups.

---

## 📸 Screenshots

| Product Page                           | Recommendations                              |
| -------------------------------------- | -------------------------------------------- |
| ![Product Page](docs/product-page.png) | ![Recommendations](docs/recommendations.png) |

---

## 🧑‍💻 Author

**Laxita Thakur**
Cloud & Full Stack Developer
📧 [[email@domain.com](mailto:email@domain.com)] | 🌐 [Portfolio Link] | 💼 [LinkedIn Profile]

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it with credit.
