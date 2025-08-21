import React from "react";
import search from "../assets/search.png";

const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // ✅ moved outside
                    placeholder="Search for movies..."
                    className="border p-2 rounded w-full pl-10"
                />
                <button
                    onClick={onSearch}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default Search;
