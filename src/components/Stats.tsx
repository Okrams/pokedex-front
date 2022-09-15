import React from 'react'
import { PokemonStat } from '../interface'

interface Props{
    stats: PokemonStat[] | undefined;
}

export const Stats = ({stats}: Props) => {
    return (
        <div className='pokemon__stats'>
            {
                stats?.map(stat => (
                    <div className='pokemon__stats-item'>
                        <div className='pokemon__stats-text'>
                            <span className='stat-description'>{stat.stat.name.replace('-', ' ')}</span>
                            <span className='stat-value'>{stat.base_stat}</span>
                        </div>
                        <div className='pokemon__stats-percentage'>
                            <div className='' style={{
                                width: `${stat.base_stat}%`, height: '100%', backgroundColor: (stat.base_stat <= 50) ? '#f09393' : '#a5f093'
                            }}></div>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}
