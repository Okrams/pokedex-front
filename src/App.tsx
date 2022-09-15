import { createContext, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header';
import { PrimaryImage } from './components/PrimaryImage';
import { Elements } from './components/Elements';
import { AfterPokemon } from './components/AfterPokemon';
import { BeforePokemon } from './components/BeforePokemon';
import { Pokemon } from './interface';
import { Stats } from './components/Stats';

export const MyPokemon = createContext({
  pokemonId: 1,
  setPokemonId: (id: number) => {}
});

function App() {

  const [data, setData] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  const [pokemonId, setPokemonId] = useState(4);

  const value = useMemo(
    () => ({pokemonId, setPokemonId}),
    [pokemonId]
  );


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(resp => resp.json())
      .then(rp => {
        setData(rp);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })

  }, [pokemonId])


  return (
    <MyPokemon.Provider value={value}>
      <div className='box'>

        <AfterPokemon />

        <section className='pokemon'>
          {
            loading
              ?
              <p>Cargando...</p>
              :
              <>
                <Header id={data!.id} name={data!.name} />
                <Elements types={data!.types} isBig={true} />

                <PrimaryImage url={data!.sprites.other?.['official-artwork'].front_default || data!.sprites.front_default || 'not-image'} />

                {/* <p className='sub-header'>Evolutions</p> */}

                {/* <Evolutions id={pokemonId} /> */}

                <p className='sub-header'>Stats</p>
                <Stats stats={data?.stats} />

              </>
          }
        </section>

        <section className='description'>
          {
            loading
              ?
              <p>Cargando...</p>
              :
              <>
                <nav>
                  <ul className='description__nav'>
                    <li className='active'>
                      About
                    </li>
                    <li>Moves</li>
                    <li>Games</li>
                    <li>Evolutions</li>
                  </ul>
                </nav>

                {/* <Evolutions id={pokemonId} /> */}

                <p className='sub-header'>Basic information</p>
                <div className='description__information'>
                  <div className='description__information-item'>
                    <span className='description__information-title'>Height:</span>
                    <span className='description__information-value'>
                      {(data?.height || 0) / 10} mts
                    </span>
                  </div>
                  <div className='description__information-item'>
                    <span className='description__information-title'>Weight:</span>
                    <span className='description__information-value'>
                      {(data?.weight || 0) / 10} kg
                    </span>
                  </div>
                  <div className='description__information-item'>
                    <span className='description__information-title'>Base experience:</span>
                    <span className='description__information-value'>
                      {(data?.base_experience)} pts
                    </span>
                  </div>
                </div>

                <p className='sub-header'>Abilities</p>
                <div className='description__abilities'>
                  {
                    data?.abilities.map(ability => (
                      <div className='description__abilities-item'>
                        {ability.ability.name.replace('-', ' ')}
                      </div>
                    ))
                  }
                </div>

              </>
          }


          <div className='ball primary' style={{ width: '280px', height: '280px' }}>
            <div className='ball-content primary'></div>
          </div>

        </section>

        <BeforePokemon id={pokemonId + 1} setPokemonId={setPokemonId} />
      </div>
      <div className='ball secondary' style={{ width: '420px', height: '420px' }}>
        <div className='ball-content secondary'></div>
      </div>
    </MyPokemon.Provider>
  )
}

export default App
