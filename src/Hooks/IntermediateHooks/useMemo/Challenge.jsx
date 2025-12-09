import { useState, useMemo } from "react";

const Challenge = () => {
  const Products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000 },
    { id: 2, name: "Smartphone", category: "Electronics", price: 30000 },
    { id: 3, name: "Table", category: "Furniture", price: 5000 },
    { id: 4, name: "Chair", category: "Furniture", price: 2000 },
    { id: 5, name: "T-Shirt", category: "Clothing", price: 500 },
    { id: 6, name: "Headphones", category: "Electronics", price: 2000 },
  ];

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filterHandler = () => {
   return Products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category === "All" || product.category === category;
      return matchSearch && matchCategory;
    });
  };

  const filteredProducts = useMemo(filterHandler, [search, category]);
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
        <option value="Clothing">Clothing</option>
      </select>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Challenge;
