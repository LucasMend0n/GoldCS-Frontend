import React from 'react'
import './UIButton.css'

export const UIButton = ({
    children,
    className,
    component: Component,
    ...restProps
}) => {
    return (
        <Component className={`ui-button ${className}`}{...restProps}>
            {children}
        </Component>
    )
}
