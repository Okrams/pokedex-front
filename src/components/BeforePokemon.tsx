import React, { useEffect, useState } from 'react'
import { Pokemon } from '../interface/Pok';
import Icons from '../assets/icons.svg';


interface Props {
    id: number;
    setPokemonId: React.Dispatch<React.SetStateAction<number>>
}
export const BeforePokemon = ({ id, setPokemonId }: Props) => {
    const [data, setData] = useState<Pokemon>();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (id >= 1) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(resp => resp.json())
                .then(rp => {
                    setData(rp);
                    setLoading(false);
                })
                .catch(err => {
                    setIsError(true);
                })
        }

    }, [loading, id])

    if (id < 1) {
        return (
            <div>Not pokemon</div>
        )
    }

    return (
        <section className='box__page right' onClick={() => setPokemonId(id)}>

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
            <svg className='box__page-icon'>
                <use xlinkHref={`${Icons}#icon-chevron-small-right`}></use>
            </svg>
            <div className='float-image'>
                {
                    loading
                        ?
                        <p>L</p>
                        :
                        <img className='image' width={100} src={data!.sprites.front_default} alt="POKE" />
                }
            </div>
        </section>
    )
}
