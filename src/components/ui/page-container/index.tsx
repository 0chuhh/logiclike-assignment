import {FC, HTMLAttributes} from 'react'
import styles from './styles.module.scss';

export interface IPageContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const PageContainer:FC<IPageContainerProps> = ({children, ...restProps}) => {
    return (
        <div 
            {...restProps}
            className={[restProps.className, styles.container].join(' ')}
        >
            {children}
        </div>
    )
}