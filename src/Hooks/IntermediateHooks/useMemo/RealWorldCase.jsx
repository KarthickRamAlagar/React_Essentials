import React, { useState, useMemo } from "react";

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 30000, category: "Electronics" },
  { id: 3, name: "Table", price: 5000, category: "Furniture" },
  { id: 4, name: "Chair", price: 2000, category: "Furniture" },
  { id: 5, name: "Headphones", price: 2000, category: "Electronics" },
  // imagine 1000+ products
];

function ProductTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // useMemo to filter products efficiently
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      <h1>Product Table</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
      </select>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
