from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Data ---
with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

df = pd.DataFrame(products)

# Some products might store images differently (array or single URL)
def extract_image_urls(row):
    if isinstance(row.get("images"), list) and len(row["images"]) > 0:
        # Case: already a list of {url: "..."}
        return row["images"]
    elif "image_url" in row and row["image_url"]:
        # Case: single string URL
        return [{"url": row["image_url"]}]
    else:
        return [{"url": "/placeholder.jpg"}]

df["combined_text"] = (
    df["title"].fillna("") + " " +
    df["description"].fillna("") + " " +
    df["category"].fillna("") + " " +
    df["tags"].astype(str)
)

vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined_text"])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# --- Recommend API ---
@app.get("/recommend")
def recommend(title: str, top_n: int = 5):
    if title not in df["title"].values:
        return {"error": f"Product '{title}' not found."}

    idx = df.index[df["title"] == title][0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1: top_n + 1]
    product_indices = [i[0] for i in sim_scores]

    similar_items = []
    for i in product_indices:
        row = df.iloc[i].to_dict()
        images = extract_image_urls(row)
        similar_items.append({
            "id": int(row["id"]),
            "title": row["title"],
            "description": row.get("description", ""),
            "tags": row.get("tags", []),
            "price": str(row.get("price", "")),
            "images": images
        })

    return {"recommendations": similar_items}
