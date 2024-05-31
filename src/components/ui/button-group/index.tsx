import { useCallback, useEffect, useState } from 'react';
import { ButtonGroupItem } from './item';
import styles from './styles.module.scss';
import { typedMemo } from 'services/utils/typed-memo';

export interface IButtonGroupProps<T> {
    labels: T[];
    defaultValue?: T;
    value?: T,
    onChange?: (value: T) => void;
}

export const ButtonGroup = <T,>({ defaultValue, value, onChange, labels }: IButtonGroupProps<T>) => {
    const [selected, setSelected] = useState<T>(() => {
        if (value) return value;
        if (defaultValue) return defaultValue;
        return labels[0];
    });

    const itemClick = useCallback((value: T) => {
        onChange?.(value);
        //don't change state if value provided
        if(value) return;
        setSelected(value);
    }, [onChange]);

    //memoized generic component
    const MemoButtonItem = typedMemo(ButtonGroupItem);

    //change selected button by value
    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    return (
        <div className={styles.list}>
            {
                labels.map((label, index) =>
                    <MemoButtonItem<T>
                        key={`${index}${label}`}
                        selected={label === selected}
                        value={label}
                        onClick={itemClick}
                    >
                        {label as string}
                    </MemoButtonItem>
                )
            }
        </div>
    );
};