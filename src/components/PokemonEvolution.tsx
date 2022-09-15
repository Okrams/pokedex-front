import React from 'react'


interface PokemonEvolution {
    speciesName: any;
    min_level: any;
    item: any;
    triggerName: any;
    evolutions: Array<PokemonEvolution>;
}

interface Props {
    data: PokemonEvolution
}
export const PokemonEvolution = ({ data }: Props) => {
    return (
        <ul className='children'>
            <li>
                <div className='pokemon__evolutions-item'>
                    <p className='pokemon__evolutions-name'>{data.speciesName}
                        {/* <span>#{data?.id.toString().padStart(3, '0')}</span> */}
                    </p>
                    <div className='pokemon__evolutions-image'>
                        {/* <img src={data!.sprites.front_default || data?.sprites.other?.['official-artwork'].front_default} alt="POKE" /> */}
                    </div>
                </div>
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
