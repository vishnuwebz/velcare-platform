export default function FilterBar({ categories, selected, setSelected }) {
  return (
    <div className="filter-bar">
      {["All", ...categories].map((cat, i) => (
        <button
          key={i}
          className={`filter-btn ${selected === cat ? "active" : ""}`}
          onClick={() => setSelected(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}