import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon as PokemonInterface } from "./interfaces/pokemon";
import Pokemon from "./components/Pokemon";
import { BounceLoader } from "react-spinners";

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonInterface[]>([]);
  const [generation, setGeneration] = useState({ offset: 0, limit: 151 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemonInformation = async (url: string) => {
      const response = await fetch(url);
      return await response.json();
    };

    setLoading(true);

    const urls: string[] = Array.from(
      { length: generation.limit },
      (_, i) =>
        `https://pokeapi.co/api/v2/pokemon/${i + 1 + generation.offset}/`
    );

    Promise.all(urls.map(getPokemonInformation)).then(
      (newPokemonList: PokemonInterface[]) => {
        newPokemonList.sort((a, b) => {
          return a.id - b.id;
        });
        setPokemonList(newPokemonList);
        setLoading(false);
      }
    );
  }, [generation]);

  return (
    <>
      <div className="generations">
        <button onClick={() => setGeneration({ offset: 0, limit: 151 })}>
          Generation I
        </button>
        <button onClick={() => setGeneration({ offset: 151, limit: 100 })}>
          Generation II
        </button>
        <button onClick={() => setGeneration({ offset: 251, limit: 135 })}>
          Generation III
        </button>
        <button onClick={() => setGeneration({ offset: 386, limit: 107 })}>
          Generation IV
        </button>
        <button onClick={() => setGeneration({ offset: 493, limit: 156 })}>
          Generation V
        </button>
        <button onClick={() => setGeneration({ offset: 649, limit: 72 })}>
          Generation VI
        </button>
        <button onClick={() => setGeneration({ offset: 721, limit: 88 })}>
          Generation VII
        </button>
        <button onClick={() => setGeneration({ offset: 809, limit: 89 })}>
          Generation VIII
        </button>
      </div>
      {loading ? (
        <BounceLoader color={"white"} loading={loading} size={60} />
      ) : (
        <div className="pokemon-list">
          {pokemonList.map(function (pokemon: PokemonInterface) {
            return <Pokemon key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      )}
    </>
  );
}
