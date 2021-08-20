import "./Pokemon.css";
import { Pokemon as PokemonInterface } from "../interfaces/pokemon";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Pokemon({ pokemon }: { pokemon: PokemonInterface }) {
  const name = capitalizeFirstLetter(pokemon.name);

  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={name}></img>
      <h3>{name}</h3>
      <div className="type-list">
        {pokemon.types.map(function ({ type }) {
          return (
            <span key={type.name} className={`type ${type.name}`}>
              {type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
