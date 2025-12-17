import { useState, Fragment } from "react";
import { Disclosure, RadioGroup, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import  type { Pokemon } from "../types/Pokemon";
import type { SearchFilters } from "../types/SearchFilters";
import { pokemonApi } from "../services/pokemonApi";
import { PokemonCard } from "../components/PokeCard";
import { regions, typesList, typeColors } from "../types/PokemonConstants";
import { PokemonCardSkeleton } from "../components/PokeCardSkeleton";

const SearchBar = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTypeClick = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      if (prev.length >= 2) return prev;
      return [...prev, type];
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters: SearchFilters = {
        searchTerm,
        selectedRegion,
        selectedTypes,
      };

      console.log('Buscando con filtros:', filters);
      const results = await pokemonApi.searchPokemons(filters);
      setPokemons(results);
      console.log('Resultados encontrados:', results.length);
    } catch (err) {
      setError('Error al buscar Pokémon');
      console.error('Error searching pokemons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedRegion("");
    setSelectedTypes([]);
    setSearchTerm("");
    setPokemons([]);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* BUSCAR - CORREGIDO */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar Pokémon..."
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
        />
        <button
          type="button" // ← SOLUCIÓN AL PROBLEMA De Redirigir a página
          onClick={handleSearch}
          disabled={loading}
          className="px-6 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold rounded-lg shadow-sm transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* DISCLOSURE - Ya funciona correctamente */}
      <Disclosure as="div" className="border rounded-xl bg-white shadow-sm overflow-hidden">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between bg-red-100 px-4 py-3 text-left text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75 transition-colors">
              <span>{open ? "Ocultar Filtros" : "Mostrar Filtros Avanzados"}</span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-red-500 transition-transform`}
              />
            </Disclosure.Button>
            
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-4 text-sm text-gray-500 bg-red-50 space-y-6">
                
                {/* REGIONES */}
                <RadioGroup value={selectedRegion} onChange={setSelectedRegion}>
                  <RadioGroup.Label className="font-bold text-gray-800 mb-3 block">
                    Región
                  </RadioGroup.Label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <RadioGroup.Option
                        key={region.value}
                        value={region.value}
                        as={Fragment}
                      >
                        {({ checked }) => (
                          <button
                            className={`
                              px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border
                              ${checked 
                                ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" 
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                              }
                            `}
                          >
                            {region.label}
                          </button>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <hr className="border-red-200" />

                {/* TIPOS */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-800">Tipos</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${selectedTypes.length === 2 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {selectedTypes.length}/2 seleccionados
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {typesList.map((type) => {
                      const colors = typeColors[type];
                      const isSelected = selectedTypes.includes(type);
                      const isDisabled = selectedTypes.length >= 2 && !isSelected;

                      return (
                        <button
                          key={type}
                          type="button" // ← También aquí por seguridad
                          onClick={() => handleTypeClick(type)}
                          disabled={isDisabled}
                          className={`
                            px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm capitalize font-medium
                            ${isSelected 
                              ? `${colors.bg} ${colors.text} ${colors.border} border-2 shadow-md scale-105` 
                              : `bg-white text-gray-600 border-gray-200 hover:bg-gray-50`
                            }
                            ${isDisabled ? "opacity-40 cursor-not-allowed grayscale" : "cursor-pointer"}
                          `}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* BOTONES ACCIÓN - CORREGIDOS */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button" // ← Aquí también
                    onClick={handleSearch}
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-2 rounded-lg font-semibold shadow-sm transition-colors"
                  >
                    {loading ? 'Buscando...' : 'Buscar'}
                  </button>
                  <button
                    type="button" // ← Y aquí
                    onClick={handleClearFilters}
                    className="px-6 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg font-medium transition-colors"
                  >
                    Limpiar
                  </button>
                </div>

              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      {/* RESULTADOS */}
      <div className="mt-6">
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Buscando Pokémon...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {}
              {[...Array(15)].map((_, index) => (
                  <PokemonCardSkeleton key={index} />
              ))}
           </div>
        )}

        {!loading && pokemons.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Resultados: {pokemons.length} Pokémon(s) encontrado(s)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </div>
        )}

        {!loading && pokemons.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron Pokémon con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;