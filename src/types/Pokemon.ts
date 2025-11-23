export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  // 🔮 FUTURO: Agregar región cuando la implementes en el backend
  // region?: string;
}