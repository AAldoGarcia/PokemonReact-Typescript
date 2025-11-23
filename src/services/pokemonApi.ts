// services/pokemonApi.ts
import axios from "axios";
import type { Pokemon } from '../types/Pokemon';
import type { SearchFilters } from '../types/SearchFilters';

// ⚠️ IMPORTANTE: Verifica que este puerto (5256) sea el mismo que dice tu consola de .NET
const apiClient = axios.create({
    baseURL: "http://localhost:5256/api",
    timeout: 30000,
});

export const pokemonApi = {
    /**
     * Obtiene una lista general de Pokémon.
     * Útil cuando no hay búsqueda por nombre.
     */
    getAllPokemons: async (limit: number = 20): Promise<Pokemon[]> => {
        try {
            const response = await apiClient.get<Pokemon[]>(`/poke?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener lista completa:", error);
            return [];
        }
    },

    /**
     * Busca un Pokémon específico por Nombre o ID directamente en la API.
     */
    getPokemonByTerm: async (term: string | number): Promise<Pokemon | null> => {
        try {
            const response = await apiClient.get<Pokemon>(`/poke/${term}`);
            return response.data;
        } catch (error) {
            // Si es 404 (No encontrado), retornamos null para manejarlo elegantemente
            return null;
        }
    },

    /**
     * FUNCIÓN PRINCIPAL DE BÚSQUEDA
     * Orquesta la lógica entre buscar uno específico o filtrar una lista grande.
     */
    searchPokemons: async (filters: SearchFilters): Promise<Pokemon[]> => {
        let results: Pokemon[] = [];

        // PASO 1: DECIDIR LA ESTRATEGIA DE OBTENCIÓN DE DATOS
        if (filters.searchTerm && filters.searchTerm.trim() !== "") {
            // A) Si el usuario escribió algo, buscamos ESPECÍFICAMENTE ese pokémon
            const foundPokemon = await pokemonApi.getPokemonByTerm(filters.searchTerm);
            
            if (foundPokemon) {
                results = [foundPokemon];
            }
            // Si no se encuentra, results se queda vacío []
        } else {
            // B) Si el usuario NO escribió nombre (solo quiere filtrar por tipos),
            // traemos un lote más grande (151 = Gen 1) para que los filtros tengan sentido.
            // Si trajéramos solo 20, filtrar por "Dragón" probablemente daría vacío.
            results = await pokemonApi.getAllPokemons(151); 
        }

        // PASO 2: APLICAR FILTROS DE TIPO (Client-Side Filtering)
        // Esto filtra lo que sea que hayamos obtenido en el Paso 1.
        return filterResultsLocally(results, filters);
    },
}

/**
 * Función auxiliar para filtrar los resultados en el navegador.
 * Soluciona el problema de Mayúsculas vs Minúsculas.
 */
const filterResultsLocally = (pokemons: Pokemon[], filters: SearchFilters): Pokemon[] => {
    let filtered = pokemons;

    // Filtrar por TIPOS
    if (filters.selectedTypes && filters.selectedTypes.length > 0) {
        filtered = filtered.filter(pokemon => {
            // Verificamos que el pokemon tenga TODOS los tipos seleccionados
            return filters.selectedTypes!.every(selectedType => 
                // Buscamos coincidencia ignorando mayúsculas/minúsculas
                pokemon.types.some(apiType => 
                    apiType.toLowerCase() === selectedType.toLowerCase()
                )
            );
        });
    }

    // Filtrar por REGIÓN (Opcional - Descomentar cuando implementes lógica de regiones)
    /*
    if (filters.selectedRegion && filters.selectedRegion !== "") {
        // Nota: La PokeAPI básica no devuelve la región directamente en el objeto pokemon.
        // Necesitarías lógica extra para deducir la región por ID (ej: ID 1-151 = Kanto).
        
        // Ejemplo simple por rangos de ID:
        if (filters.selectedRegion === "kanto") {
             filtered = filtered.filter(p => p.id <= 151);
        } else if (filters.selectedRegion === "johto") {
             filtered = filtered.filter(p => p.id > 151 && p.id <= 251);
        }
    }
    */

    return filtered;
};