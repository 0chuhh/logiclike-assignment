import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export interface IButtonGroupItemProps<T> extends PropsWithChildren {
    className?: string;
    selected?: boolean;
    value: T;
    onClick?: (value: T) => void;
}

export const ButtonGroupItem = <T,>({ value, onClick, className, selected = false, children }: IButtonGroupItemProps<T>) => {
    const handleClick = () => {
        onClick?.(value);
    };

    return (
        <div onClick={handleClick} className={[selected ? styles.item_selected : styles.item, className].join(' ')}>
            {children}
        </div>
    );
};