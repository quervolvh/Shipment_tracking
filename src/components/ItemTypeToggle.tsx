import React from 'react';
import { classnames } from 'utils';

export const ItemTypeToggle: React.FC<PropType> = ({ items , className }) => {

    return (
        <div
            className={classnames("item-type-toggle", className)}
        >

            {items.map((item) =>
                <p
                    className={item.active ? 'active' : ''}
                    tabIndex={0}
                    key={`item-toggle-${item.label}`}
                    role={'button'}
                    onClick={() => item.onClick && item.onClick()}>
                    {item.label}
                </p>)}

        </div>)
}

type PropType = {
    className?: string,
    items: {
        onClick(): void,
        label: string,
        active?: boolean
    }[]
}
