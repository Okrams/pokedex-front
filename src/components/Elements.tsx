import React from 'react'
import { Type } from '../interface/Pok'
interface Props{
    types: Array<Type>;
    isBig?: boolean;
}
export const Elements = ({types, isBig}: Props) => {
    return (
        <div className='pokemon__types'>
            {
                types.map(type =>
                    <>
                        <button className={`btn-element ${isBig && 'btn-element-big'}`} element-type={type.type.name}>
                            {type.type.name}
                            <div className='brignes'></div>
                        </button>
                    </>
                )
            }
        </div>
    )
}
