import React, { useEffect, useState } from 'react'
import { Pokemon as PK } from '../../interface';
import { Elements } from '../Elements';

interface Props {
    url: string;
    name: string;
}

// TODO: se puede cambiar la imagen por `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`
export const Pokemon = ({ url, name }: Props) => {

    const [data, setData] = useState<PK>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${url}`)
            .then(resp => resp.json())
            .then(rp => {
                setData(rp);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })

    }, [url])

    return (
        <div className='description__evolutions-item'>
            <p className='description__evolutions-name'>{name}
                {
                    loading
                        ?
                        <span>#...</span>
                        :
                        <span>#{data?.id.toString().padStart(3, '0')}</span>
                }
            </p>
            <div className='description__evolutions-image'>
                {
                    loading
                        ?
                        <p>Loading</p>
                        :
                        <img src={data!.sprites.front_default || data?.sprites.other?.['official-artwork'].front_default || ''} alt="POKE" />
                }
            </div>
            {
                loading
                ?
                <p>Loading</p>
                :
                <Elements types={data!.types} />
            }
        </div>
    )
}
