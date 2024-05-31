import React, { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export interface IButtonGroupItemProps extends PropsWithChildren {
    className?: string;
    selected?: boolean;
    value: string | number;
    onClick?: (value: IButtonGroupItemProps['value']) => void;
}

export const ButtonGroupItem: FC<IButtonGroupItemProps> = React.memo(({ value, onClick, className, selected = false, children }) => {
    const handleClick = () => {
        onClick?.(value);
    };
    return (
        <div onClick={handleClick} className={[selected ? styles.item_selected : styles.item, className].join(' ')}>
            {children}
        </div>
    );
});