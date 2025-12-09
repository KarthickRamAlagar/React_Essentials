import { useState, useEffect } from "react";

const sampleProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800 },
  { id: 2, name: "Shoes", category: "Fashion", price: 50 },
  { id: 3, name: "Phone", category: "Electronics", price: 500 },
  { id: 4, name: "Watch", category: "Accessories", price: 150 },
  { id: 5, name: "T-shirt", category: "Fashion", price: 20 },
];

const Filtering = () => {
  const [products] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  // Filters
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]); // array of checked categories
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("");

  // Get unique categories dynamically
  const categoryList = [...new Set(sampleProducts.map((p) => p.category))];

  // Filtering logic
  useEffect(() => {
    let filtered = [...products];

    //  Search Filter
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    //  Category Filter
    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    //  Price Range Filter
    filtered = filtered.filter((p) => p.price <= maxPrice);

    //  Sort by Price
    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [search, categories, maxPrice, sort, products]);

  //  Checkbox handler
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((c) => c !== value));
    }
  };

  //  Clear Filters Handler
  const clearFilters = () => {
    setSearch("");
    setCategories([]);
    setMaxPrice(1000);
    setSort("");
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
      {/* SIDEBAR FILTERS */}
      <div
        style={{
          width: "350px",
          borderRight: "1px solid gray",
          paddingRight: "15px",
        }}
      >
        <h2>Filters</h2>

        {/* Search Box */}
        <div>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </div>

        {/* Category Checkboxes */}
        <div style={{ marginTop: "15px" }}>
          <label>
            <b>Category</b>
          </label>
          {categoryList.map((cat) => (
            <div key={cat}>
              <input
                type="checkbox"
                value={cat}
                onChange={handleCategoryChange}
                checked={categories.includes(cat)}
              />
              <label style={{ marginLeft: "5px" }}>{cat}</label>
            </div>
          ))}
        </div>

        {/* Range Filter */}
        <div style={{ marginTop: "15px" }}>
          <label>
            <b>Max Price: ${maxPrice}</b>
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        {/* Sort by Radio */}
        <div style={{ marginTop: "15px" }}>
          <label>
            <b>Sort By Price</b>
          </label>
          <div>
            <input
              type="radio"
              name="sort"
              value="lowToHigh"
              checked={sort === "lowToHigh"}
              onChange={(e) => setSort(e.target.value)}
            />
            Low → High
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              value="highToLow"
              checked={sort === "highToLow"}
              onChange={(e) => setSort(e.target.value)}
            />
            High → Low
          </div>
        </div>

        {/* CLEAR FILTERS BUTTON */}
        <div style={{ marginTop: "25px" }}>
          <button
            onClick={clearFilters}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={{ flexGrow: 1 }}>
        <h2>Products</h2>
        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "15px",
            }}
          >
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <h4>{p.name}</h4>
                <p>Category: {p.category}</p>
                <p>Price: ${p.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Filtering;
