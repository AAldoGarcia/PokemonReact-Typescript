export const typeColors: { [key: string]: { bg: string; text: string; border: string } } = {
  normal: { bg: "bg-gray-400", text: "text-gray-800", border: "border-gray-500" },
  fire: { bg: "bg-red-500", text: "text-white", border: "border-red-600" },
  water: { bg: "bg-blue-500", text: "text-white", border: "border-blue-600" },
  electric: { bg: "bg-yellow-400", text: "text-gray-800", border: "border-yellow-500" },
  grass: { bg: "bg-green-500", text: "text-white", border: "border-green-600" },
  ice: { bg: "bg-cyan-300", text: "text-gray-800", border: "border-cyan-400" },
  fighting: { bg: "bg-orange-600", text: "text-white", border: "border-orange-700" },
  poison: { bg: "bg-purple-500", text: "text-white", border: "border-purple-600" },
  ground: { bg: "bg-amber-600", text: "text-white", border: "border-amber-700" },
  flying: { bg: "bg-indigo-400", text: "text-white", border: "border-indigo-500" },
  psychic: { bg: "bg-pink-500", text: "text-white", border: "border-pink-600" },
  bug: { bg: "bg-lime-500", text: "text-white", border: "border-lime-600" },
  rock: { bg: "bg-stone-500", text: "text-white", border: "border-stone-600" },
  ghost: { bg: "bg-violet-500", text: "text-white", border: "border-violet-600" },
  dragon: { bg: "bg-purple-600", text: "text-white", border: "border-purple-700" },
  dark: { bg: "bg-gray-700", text: "text-white", border: "border-gray-800" },
  steel: { bg: "bg-slate-400", text: "text-gray-800", border: "border-slate-500" },
  fairy: { bg: "bg-pink-300", text: "text-gray-800", border: "border-pink-400" },
};

export const regions = [
  { value: "", label: "Todas las regiones" },
  { value: "kanto", label: "Kanto" },
  { value: "johto", label: "Johto" },
  { value: "hoenn", label: "Hoenn" },
  { value: "sinnoh", label: "Sinnoh" },
  { value: "unova", label: "Unova" },
  { value: "kalos", label: "Kalos" },
  { value: "alola", label: "Alola" },
  { value: "galar", label: "Galar" },
  { value: "paldea", label: "Paldea" },
];

export const typesList = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
  "dragon", "dark", "steel", "fairy"
];