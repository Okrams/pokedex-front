import React from 'react';

interface Props {
    name: string;
    id: number;
}
export const Header = ({name, id}: Props) => {
    return (
        <div className='pokemon__title'>
            <p>
                {name}
            </p>
            <span>#{id.toString().padStart(3, '0')}</span>
        </div>
    )
}
