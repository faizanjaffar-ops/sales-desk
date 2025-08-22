import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Products() {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // { [productId]: quantity }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("You must be logged in to see products.");
      return;
    }

    (async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(list);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // ---- Cart helpers (increment/decrement by exactly 1) ----
  const addOne = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeOne = (productId) => {
    setCart((prev) => {
      const qty = prev[productId] || 0;
      if (qty <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: qty - 1 };
    });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: 10 }}>Sales Desk — Products</h1>

      {/* Simple cart badge */}
      <p style={{ marginBottom: 20 }}>
        Cart Items: {Object.values(cart).reduce((s, q) => s + q, 0)}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => {
          const qty = cart[p.id] || 0;
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 14,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image (TOP) */}
              <img
                src={p.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={p.name || "Product"}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              />

              {/* Title */}
              <h3 style={{ margin: "6px 0 4px", fontSize: 18 }}>{p.name || "Unnamed"}</h3>

              {/* Price */}
              <div style={{ fontWeight: "bold", marginBottom: 6 }}>
                ${Number(p.price || 0).toFixed(2)}
              </div>

              {/* Description */}
              <p style={{ color: "#555", fontSize: 14, minHeight: 36 }}>
                {p.description || "No description"}
              </p>

              {/* Actions: Add to Cart (always visible) + +/- shown when qty > 0 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => addOne(p.id)}
                  style={{
                    padding: "6px 10px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Add to Cart
                </button>

                {qty > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => removeOne(p.id)}
                      style={{
                        padding: "4px 10px",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      –
                    </button>
                    <span style={{ minWidth: 20, textAlign: "center" }}>{qty}</span>
                    <button
                      onClick={() => addOne(p.id)}
                      style={{
                        padding: "4px 10px",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
