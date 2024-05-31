import React, { FC, useCallback, useState } from 'react';
import { ButtonGroupItem, IButtonGroupItemProps } from './item';
import styles from './styles.module.scss';

export interface IButtonGroupProps {
    labels: string[];
    defaultValue?: IButtonGroupItemProps['value'];
    onChange?: (value: IButtonGroupItemProps['value']) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = React.memo(({ defaultValue, onChange, labels }) => {
    const [selected, setSelected] = useState<string | number>(defaultValue ? defaultValue : labels[0]);

    const itemClick = useCallback((value: IButtonGroupItemProps['value']) => {
        onChange?.(value);
        setSelected(value);
    }, [onChange]);

    return (
        <div className={styles.list}>
            {
                labels.map((label, index) =>
                    <ButtonGroupItem
                        key={`${index}${label}`}
                        selected={label === selected}
                        value={label}
                        onClick={itemClick}
                    >
                        {label}
                    </ButtonGroupItem>
                )
            }
        </div>
    );
});