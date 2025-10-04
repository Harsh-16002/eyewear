// Categories.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/enhanced-button";
import Layout from "../pages/layout";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "@/api/categories";

// Define the type for a category
interface Category {
  _id: string;
  name: string;
  description?: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load categories from backend
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Add or update category
  const handleAddOrUpdate = async () => {
    if (!name.trim()) return alert("Name is required");

    try {
      if (editingId) {
        await updateCategory(editingId, { name, description });
        alert("Category updated successfully!");
      } else {
        await addCategory({ name, description });
        alert("Category added successfully!");
      }

      // Reset form
      setName("");
      setDescription("");
      setEditingId(null);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    }
  };

  // Edit category
  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || "");
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      alert("Category deleted successfully!");
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-4">
        {/* Add / Edit Category */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Category" : "Add New Category"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>
            <Button onClick={handleAddOrUpdate} variant="gold">
              {editingId ? "Update Category" : "Add Category"}
            </Button>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>Categories List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.length === 0 && <p>No categories found.</p>}
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <strong>{cat.name}</strong>
                    {cat.description && (
                      <p className="text-sm text-gray-500">{cat.description}</p>
                    )}
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(cat)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Categories;
