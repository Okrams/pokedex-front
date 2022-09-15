import React from 'react'
import { Pokemon } from './Pokemon';


interface PokemonEvolution {
    url: string;
    speciesName: string;
    min_level: number;
    item: string;
    evolutions: Array<PokemonEvolution>;
}

interface Props {
    data: PokemonEvolution
}

export const PokemonEvolution = ({ data }: Props) => {
    return (
        <ul className='children'>
            <li>
                <Pokemon name={data.speciesName} url={data.url} />
                {/* <Elements types={data!.types} /> */}
                <ul className='children'>
                    {
                        data.evolutions.map(evo => (
                            <li>
                                <PokemonEvolution data={evo}/>
                            </li>
                        ))
                    }
                </ul>

            </li>
        </ul>
    )
}
