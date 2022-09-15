import React, { useContext, useEffect, useState } from 'react'
import { Pokemon } from '../interface';
import Icons from '../assets/icons.svg';
import { MyPokemon } from '../App';


interface Props {
    id: number;
    setPokemonId: React.Dispatch<React.SetStateAction<number>>
}
export const AfterPokemon = () => {
    const {pokemonId, setPokemonId} = useContext(MyPokemon);
    const [data, setData] = useState<Pokemon>();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (pokemonId > 1) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}`)
                .then(resp => resp.json())
                .then(rp => {
                    setData(rp);
                    setLoading(false);
                })
                .catch(err => {
                    setIsError(true);
                })
        }

    }, [loading, pokemonId])

    if (pokemonId <= 1) {
        return (
            <div>Not pokemon</div>
        )
    }

    return (
        <section className='box__page left' onClick={() => setPokemonId(pokemonId - 1 )}>

            <svg className='box__page-icon'>
                <use xlinkHref={`${Icons}#icon-chevron-small-left`}></use>
            </svg>

            <div className='box__page-content'>
                <p className='box__page-number'>
                    #
                    {
                        loading
                            ?
                            ''
                            :
                            (data!.id).toString().padStart(3, '0')
                    }
                </p>
                <span className='box__page-text'>
                    {
                        loading
                            ?
                            ''
                            :
                            (data?.name)
                    }
                </span>
            </div>

            <div className='float-image'>
                {
                    loading
                    ?
                    <p>L</p>
                    :
                    <img className='image' width={100} src={data!.sprites.front_default || ''} alt="POKE" />
                }
            </div>
        </section>
    )
}
