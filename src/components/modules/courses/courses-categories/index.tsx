import { ButtonGroup, IButtonGroupProps } from 'components/ui/button-group';
import { Tag } from 'models/course';
import React, {FC} from 'react'
import styles from './styles.module.scss';

export interface ICoursesCategoriesProps extends IButtonGroupProps<Tag> {}

export const CoursesCategories:FC<ICoursesCategoriesProps> = React.memo(({...restProps}) => {
    return (
        <div className={styles.wrapper}>
            <ButtonGroup<Tag> {...restProps}/>
        </div>
    )
})