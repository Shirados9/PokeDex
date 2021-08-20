import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon as PokemonInterface } from "./interfaces/pokemon";
import Pokemon from "./components/Pokemon";
import { BounceLoader } from "react-spinners";
import { Button } from "./components/Button";
import bannerSVG from "./assets/banner.svg";

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
      <div className="banner">
        <img src={bannerSVG} alt="Pokémon Banner" />
      </div>
      <div className="content">
        <div className="generations">
          <Button
            onClick={() => setGeneration({ offset: 0, limit: 151 })}
            text="Generation I"
            name="first"
          />
          <Button
            onClick={() => setGeneration({ offset: 151, limit: 100 })}
            text="Generation II"
            name="second"
          />
          <Button
            onClick={() => setGeneration({ offset: 251, limit: 135 })}
            text="Generation III"
            name="third"
          />
          <Button
            onClick={() => setGeneration({ offset: 386, limit: 107 })}
            text="Generation IV"
            name="fourth"
          />
          <Button
            onClick={() => setGeneration({ offset: 493, limit: 156 })}
            text="Generation V"
            name="fifth"
          />
          <Button
            onClick={() => setGeneration({ offset: 649, limit: 72 })}
            text="Generation VI"
            name="sixth"
          />
          <Button
            onClick={() => setGeneration({ offset: 721, limit: 88 })}
            text="Generation VII"
            name="seventh"
          />
          <Button
            onClick={() => setGeneration({ offset: 809, limit: 89 })}
            text="Generation VIII"
            name="eight"
          />
        </div>
        {loading ? (
          <div className="loader">
            <BounceLoader color={"white"} loading={loading} size={60} />
          </div>
        ) : (
          <div className="pokemon-list">
            {pokemonList.map(function (pokemon: PokemonInterface) {
              return <Pokemon key={pokemon.id} pokemon={pokemon} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
