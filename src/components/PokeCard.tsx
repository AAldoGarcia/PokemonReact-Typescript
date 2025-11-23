import  type { Pokemon } from '../types/Pokemon';
import { typeColors } from '../types/PokemonConstants';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void; // Opcional: para futura funcionalidad
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        {/* Imagen del Pokémon */}
        <div className="flex-shrink-0">
          <img 
            src={pokemon.spriteUrl} 
            alt={pokemon.name}
            className="w-16 h-16 object-cover"
            onError={(e) => {
              // Fallback si la imagen no carga
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Pokémon';
            }}
          />
        </div>
        
        {/* Información */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg capitalize truncate">{pokemon.name}</h4>
          <p className="text-sm text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</p>
          
          {/* Tipos */}
          <div className="flex flex-wrap gap-1 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-1 rounded text-xs capitalize font-medium ${
                  typeColors[type]?.text || 'text-white'
                } ${typeColors[type]?.bg || 'bg-gray-500'}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="font-semibold text-gray-700">HP</div>
          <div className="text-green-600 font-bold">{pokemon.stats.hp}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700">ATK</div>
          <div className="text-red-600 font-bold">{pokemon.stats.attack}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700">DEF</div>
          <div className="text-blue-600 font-bold">{pokemon.stats.defense}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700">SP.ATK</div>
          <div className="text-purple-600 font-bold">{pokemon.stats['special-attack']}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700">SP.DEF</div>
          <div className="text-purple-600 font-bold">{pokemon.stats['special-defense']}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-700">SPD</div>
          <div className="text-yellow-600 font-bold">{pokemon.stats.speed}</div>
        </div>
      </div>
    </div>
  );
};