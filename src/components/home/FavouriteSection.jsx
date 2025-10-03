import { Clock, Star, ChefHat, Coffee, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FavouriteSection({ favouriteRecipes }) {
  const [visibleRecipes, setVisibleRecipes] = useState(new Set());
  const recipeRefs = useRef([]);

  useEffect(() => {
    const observerRecipes = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleRecipes(prev => new Set(prev).add(index));
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });

    recipeRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observerRecipes.observe(ref);
      }
    });

    return () => {
      observerRecipes.disconnect();
    };
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center space-x-3">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 fill-current" />
          <h2 className="text-xl md:text-3xl font-bold text-slate-800">Resep Favorit</h2>
        </div>
        <button className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline">
          Lihat Semua
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {favouriteRecipes.map((recipe, index) => (
          <div 
            key={recipe.id} 
            ref={el => recipeRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visibleRecipes.has(index) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div className={`relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20 ${
              recipe.type === 'makanan' 
                ? 'shadow-orange-500/5 hover:shadow-orange-500/15' 
                : 'shadow-cyan-500/5 hover:shadow-cyan-500/15'
            }`}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                recipe.type === 'makanan' 
                  ? 'to-orange-500/5' 
                  : 'to-cyan-500/5'
              }`} />
              
              {/* Recipe Image */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Favourite Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500 fill-current" />
                </div>
              </div>
              
              <div className="relative z-10 p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full ${
                    recipe.type === 'makanan'
                      ? 'text-orange-700 bg-orange-100/90'
                      : 'text-cyan-700 bg-cyan-100/90'
                  }`}>
                    {recipe.type === 'makanan' ? 'Makanan' : 'Minuman'}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">
                      {recipe.rating || '4.8'}
                    </span>
                  </div>
                </div>
                
                <h3 className={`font-bold text-slate-800 mb-3 text-sm md:text-lg group-hover:transition-colors duration-200 line-clamp-2 ${
                  recipe.type === 'makanan'
                    ? 'group-hover:text-orange-600'
                    : 'group-hover:text-cyan-600'
                }`}>
                  {recipe.name}
                </h3>
                
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  {recipe.description || 'Resep favorit yang mudah dibuat dan penuh cita rasa.'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    {recipe.type === 'makanan' ? (
                      <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                    <span className="font-medium">{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}