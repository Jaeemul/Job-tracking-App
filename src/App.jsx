import { useState, useEffect } from "react";

export default function SearchApp() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // Load saved data from localStorage on first render
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("entries")) || [];
    setData(savedData);
  }, []);

  // Function to add new entry and save to localStorage
  const addEntry = () => {
    if (newEntry.trim() !== "" && !data.includes(newEntry)) {
      const updatedData = [...data, newEntry];
      setData(updatedData);
      localStorage.setItem("entries", JSON.stringify(updatedData)); // Save to localStorage
      setNewEntry("");
    }
  };

  // Function to delete an entry
  const deleteEntry = (name) => {
    const updatedData = data.filter((item) => item !== name);
    setData(updatedData);
    localStorage.setItem("entries", JSON.stringify(updatedData)); // Update localStorage
  };

  // Filter data based on search input
  const filteredData = data.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl text-violet-700 font-bold mb-7">Track Your Jobs</h1>
      
      <input
        type="text"
        placeholder="Search name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <h1 className="text-xl text-violet-600 font-bold mb-4">Enlisted Jobs</h1>
      <ul className="border border-gray-200 rounded p-2 mb-4">
        {filteredData.length > 0 ? (
          filteredData.map((name, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-b border-gray-300 last:border-none">
              {name}
              <button
                onClick={() => deleteEntry(name)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No results found</li>
        )}
      </ul>

      <h1 className="text-xl text-violet-600 font-bold mb-4">Add a Job</h1>
      <input
        type="text"
        placeholder="Add new name..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <button
        onClick={addEntry}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Entry
      </button>
    </div>
  );
}
