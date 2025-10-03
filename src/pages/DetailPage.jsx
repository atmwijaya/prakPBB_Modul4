import { X, Clock, ChefHat, Coffee, Star, Users } from 'lucide-react';

export default function DetailPage({ recipe, type, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg hover:scale-105"
        >
          <X className="w-6 h-6 text-slate-700" />
        </button>

        {/* Recipe Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Recipe Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                type === 'makanan' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-cyan-100 text-cyan-700'
              }`}>
                {type === 'makanan' ? 'Makanan' : 'Minuman'}
              </span>
              <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-slate-700">4.8</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {recipe.name}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl p-4">
              <Clock className="w-5 h-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-500">Bahan</p>
                <p className="font-semibold text-slate-800">{recipe.ingredients.length} item</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl p-4">
              {type === 'makanan' ? (
                <ChefHat className="w-5 h-5 text-slate-600" />
              ) : (
                <Coffee className="w-5 h-5 text-slate-600" />
              )}
              <div>
                <p className="text-sm text-slate-500">Langkah</p>
                <p className="font-semibold text-slate-800">{recipe.steps.length} langkah</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl p-4">
              <Users className="w-5 h-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-500">Porsi</p>
                <p className="font-semibold text-slate-800">2-3 orang</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl p-4">
              <Clock className="w-5 h-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-500">Waktu</p>
                <p className="font-semibold text-slate-800">30 menit</p>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <div className={`w-2 h-6 rounded-full mr-3 ${
                type === 'makanan' ? 'bg-orange-500' : 'bg-cyan-500'
              }`} />
              Bahan-bahan
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6">
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      type === 'makanan' ? 'bg-orange-500' : 'bg-cyan-500'
                    }`} />
                    <span className="text-slate-700 leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <div className={`w-2 h-6 rounded-full mr-3 ${
                type === 'makanan' ? 'bg-orange-500' : 'bg-cyan-500'
              }`} />
              Langkah Pembuatan
            </h2>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex space-x-4 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    type === 'makanan' ? 'bg-orange-500' : 'bg-cyan-500'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 pt-6 border-t border-slate-200">
            <button className={`flex-1 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:shadow-lg ${
              type === 'makanan' 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-cyan-500 hover:bg-cyan-600'
            }`}>
              Simpan Resep
            </button>
            <button className="flex-1 py-4 rounded-2xl font-semibold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-200">
              Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}