import api from "./axios";

// Get all categories
export const fetchCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

// Add new category
export const addCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

// Update category
export const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
