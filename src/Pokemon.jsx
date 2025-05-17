import { useEffect, useState, useMemo} from "react";
import PokemonCard from "./PokemonCard";
import "./pokemon.css";
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=1000";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const PokemonIndividualData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedData = await Promise.all(PokemonIndividualData);
      setPokemon(detailedData);
      setLoading(false)
    } catch (err) {
      console.log(err.message);
    }
  };
  // search functionality
  
  const searchData = useMemo(() => {
  return pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
}, [pokemon, search]);


  useEffect(() => {
    fetchPokemon();
  }, []);
  setTimeout(() => {
      console.log(pokemon)
  }, 4000);
  return (
    <>
      <nav className="navbar">
        <h1 onClick={()=> setSearch('')} className="heading">Catch Your Pokemon</h1>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search pokemons"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </nav>

      <div className="pokemon-container">
        {loading && <div style={{display:"flex",justifyContent:'center',alignItems:'center',}} className="loading">
                  <img src="../public/loading.gif" alt="" />
                </div> }
        {searchData &&
          searchData.map((currElement) => {
            console.log(currElement);
            const image = currElement?.sprites?.other.dream_world.front_default;

            const name = currElement.species.name;
            const type = [];
            currElement.types.map((typeList) => {
              const typeName = typeList.type.name;
              type.push(typeName);
              return;
            });
            return (
              <>
              <div className="pokemon-card-container">

                {
                  <PokemonCard
                  setSearch={setSearch}
                  stats={currElement.stats}
                  abilities={currElement.abilities}
                  audio={currElement.cries.latest}
                  experience={currElement.base_experience}
                  height={currElement.height}
                  weight={currElement.weight}
                  key={name}
                  name={name}
                  image={image}
                  type={type}
                  />
                }
               
                  </div>
              </>
            );
          })}
      </div>
    </>
  );
};
export default Pokemon;
