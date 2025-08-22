import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

// Add Product
export const addProduct = async (product) => {
  await addDoc(collection(db, "products"), product);
};

// Get Products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { db };
