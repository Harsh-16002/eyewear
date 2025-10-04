// /api/products.ts
import api from "./axios";

export const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const fetchProductsByCategory = async (category: string) => {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};

export const addProduct = async (data: FormData) => {
  // override Content-Type for multipart
  const res = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
