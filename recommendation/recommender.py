import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Step 1 — Load exported data
with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

df = pd.DataFrame(products)

# Step 2 — Create a combined text field (important!)
df["combined_text"] = (
    df["title"].fillna("") + " " +
    df["description"].fillna("") + " " +
    df["category"].fillna("") + " " +
    df["tags"].astype(str)
)

# Step 3 — TF-IDF vectorization
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined_text"])

# Step 4 — Cosine similarity between all products
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Step 5 — Recommendation function
def get_recommendations(title, top_n=5):
    if title not in df["title"].values:
        return f"Product '{title}' not found."

    idx = df.index[df["title"] == title][0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1: top_n + 1]  # exclude itself
    product_indices = [i[0] for i in sim_scores]
    return df.iloc[product_indices][["title", "description", "tags"]]

# Test it!
if __name__ == "__main__":
    recommendations = get_recommendations("Chandrika", top_n=5)
    print(recommendations)
