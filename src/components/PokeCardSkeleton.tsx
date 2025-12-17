export const PokemonCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 animate-pulse">
      
      {/* SECCIÓN SUPERIOR: IMAGEN Y DATOS */}
      <div className="flex items-center space-x-4">
        {/* Círculo/Cuadro para la imagen */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        </div>
        
        {/* Líneas para Nombre, ID y Tipos */}
        <div className="flex-1 space-y-3">
          {/* Línea gruesa (Nombre) */}
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          {/* Línea delgada (ID) */}
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          
          {/* Bloques para los Tipos */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: STATS (Grid de 6) */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
             {/* Label (HP, ATK, etc) */}
             <div className="h-3 w-8 bg-gray-200 rounded"></div>
             {/* Valor número */}
             <div className="h-4 w-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};