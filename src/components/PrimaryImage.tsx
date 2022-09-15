import { useColor, usePalette } from 'color-thief-react';
import React, { useEffect } from 'react'
interface Props {
    url: string;
}
export const PrimaryImage = ({ url }: Props) => {
    const { data, loading, error } = useColor(url, 'hex', { crossOrigin: 'anonymous', quality: 83 });
    //128


    useEffect(() => {

        document.documentElement.style.setProperty('--primary-color-lh', `${data}33`);
        document.documentElement.style.setProperty('--primary-color', `${data}`);
    }, [loading])


    return (
        <div className='pokemon__image'>
            {
                (url === 'not-image')
                ?
                <img src="" alt="" />
                :
                <img src={url} alt="POKE" />
            }
        </div>
    )
}
