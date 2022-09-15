import React, { useEffect, useState } from 'react'
import Icons from '../assets/icons.svg';
import { ChainLink } from '../interface';
import { PokemonSpecies } from '../interface';
import { Elements } from './Elements';
import { PokemonEvolution } from './PokemonEvolution';


interface PokemonEvolution {
    speciesName: any;
    min_level: any;
    item: any;
    triggerName: any;
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
        setLoading(true);
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
            speciesName: chain.species.name,
            min_level: chain.evolution_details[0] ? chain.evolution_details[0].min_level : 1,
            item: chain.evolution_details[0] ? chain.evolution_details[0].item?.name || null : null,
            triggerName: chain.evolution_details[0] ? chain.evolution_details[0].trigger.name : null,
            evolutions: chain.evolves_to.map(evo => {
                return getEvolution(evo);
            })
        };
    }

    return (
        <div className='pokemon__evolutions'>
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
