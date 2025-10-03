import { useState, useEffect, useMemo } from "react";
import { ResepMakanan } from "../data/makanan";
import RecipeGrid from "../components/makanan/RecipeGrid";
import DetailPage from "../pages/DetailPage";
import { ChevronLeft, ChevronRight, Search, Filter, X } from 'lucide-react';

export default function MakananPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bahanFilter, setBahanFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showBahanFilter, setShowBahanFilter] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const itemsPerPage = 3;

  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);

  const semuaBahan = useMemo(() => {
    const bahanSet = new Set();
    allMakanan.forEach(recipe => {
      recipe.ingredients.forEach(bahan => {
        // Extract main ingredient name (remove quantities)
        const cleanBahan = bahan.replace(/[0-9].*?(\s|$)/, '').trim().toLowerCase();
        if (cleanBahan) bahanSet.add(cleanBahan);
      });
    });
    return Array.from(bahanSet).sort();
  }, [allMakanan]);

  const filteredRecipes = useMemo(() => {
    let filtered = allMakanan;

    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (bahanFilter.trim() !== "") {
      const lowercasedBahan = bahanFilter.toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.ingredients.some(bahan => 
          bahan.toLowerCase().includes(lowercasedBahan)
        )
      );
    }

    return filtered;
  }, [searchQuery, bahanFilter, allMakanan]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, bahanFilter]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setBahanFilter("");
    setShowBahanFilter(false);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
            Resep Makanan Nusantara
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari resep makanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowBahanFilter(!showBahanFilter)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl border transition-all duration-200 ${
                  showBahanFilter || bahanFilter
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Filter Bahan {bahanFilter && `(${bahanFilter})`}
                </span>
              </button>

              {(searchQuery || bahanFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 rounded-2xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Hapus Filter</span>
                </button>
              )}
            </div>

            {showBahanFilter && (
              <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl p-4 shadow-lg">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cari bahan:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: bawang, ayam, santan..."
                    value={bahanFilter}
                    onChange={(e) => setBahanFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bahan populer:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {semuaBahan.slice(0, 8).map((bahan) => (
                      <button
                        key={bahan}
                        onClick={() => setBahanFilter(bahan)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          bahanFilter === bahan
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {bahan}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-40 overflow-y-auto">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Semua bahan:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {semuaBahan.map((bahan) => (
                      <button
                        key={bahan}
                        onClick={() => setBahanFilter(bahan)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 text-left ${
                          bahanFilter === bahan
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {bahan}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6">
          <p className="text-slate-600">
            Ditemukan <span className="font-semibold">{filteredRecipes.length}</span> resep
            {searchQuery && ` untuk "${searchQuery}"`}
            {bahanFilter && ` dengan bahan "${bahanFilter}"`}
          </p>
        </div>

        {/* Updated RecipeGrid with onClick */}
        <RecipeGrid recipes={currentRecipes} onRecipeClick={handleRecipeClick} />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 space-y-4 sm:space-y-0">
            <div className="text-sm text-slate-600">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredRecipes.length)} dari {filteredRecipes.length} resep
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`flex items-center space-x-1 px-4 py-2 rounded-2xl border transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Sebelumnya</span>
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-1 px-4 py-2 rounded-2xl border transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                <span className="text-sm font-medium">Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Resep tidak ditemukan</h3>
            <p className="text-slate-500">
              {searchQuery || bahanFilter 
                ? `Tidak ada resep yang sesuai dengan pencarian${searchQuery ? ` "${searchQuery}"` : ""}${bahanFilter ? ` dan bahan "${bahanFilter}"` : ""}`
                : "Coba gunakan kata kunci pencarian yang berbeda"}
            </p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedRecipe && (
        <DetailPage 
          recipe={selectedRecipe} 
          type="makanan" 
          onClose={handleCloseDetail} 
        />
      )}
    </div>
  );
}