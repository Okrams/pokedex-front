import React, { useEffect, useState } from 'react'
import { PokemonSpecies, ChainLink } from '../../interface';
import { PokemonEvolution } from './PokemonEvolution';



interface PokemonEvolution {
    url: string;
    speciesName: string;
    min_level: number;
    item: string;
    evolutions: Array<PokemonEvolution>;
}

interface Props{
    id: number;
}

export const Evolutions = ( {id}: Props) => {

    const [species, setSpecies] = useState<PokemonSpecies>();
    const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);

    const [data, setData] = useState<PokemonEvolution>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsLoadingSpecies(true);
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(resp => resp.json())
            .then(rp => {
                setSpecies(rp);
                setIsLoadingSpecies(false);
            })
            .catch(err => {
                console.log(err);
            })

    }, [id]);

    useEffect(() => {
        if (!isLoadingSpecies && species) {
            fetch(species.evolution_chain.url)
                .then(resp => resp.json())
                .then(rp => {
                    // console.log(rp);
                    let evoData = rp.chain;
                    const term = getEvolution(evoData);
                    setData(term);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [isLoadingSpecies])

    const getEvolution = (chain: ChainLink): PokemonEvolution => {
        return {
            url: chain.species.url.split('/')[chain.species.url.split('/').length-2],
            speciesName: chain.species.name,
            min_level:   1,
            item: 'not item',
            evolutions: chain.evolves_to.map(evo => {
                return getEvolution(evo);
            })
        };
    }

    return (
        <div className='description__evolutions'>
            {
                (isLoadingSpecies || loading)
                    ?
                    <p>Cargando...</p>
                    :
                    <>
                        {
                            <PokemonEvolution data={data!} />
                        }
                    </>
            }
        </div>
    )
}
