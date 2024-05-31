import { ICourse } from 'models/course';
import React, { FC } from 'react';
import styles from './styles.module.scss';

export interface ICourseCardProps {
    course: ICourse;
    appearDelay?: number;
}

export const CourseCard: FC<ICourseCardProps> = React.memo(({ course, appearDelay }) => {
    return (
        <div className={styles.card} style={{ animationDelay: `${appearDelay}s` }}>
            <div className={styles.img_wrapper} style={{ background: course.bgColor }}>
                <img src={course.image} alt={course.name} />
            </div>
            <div className={styles.title}>{course.name}</div>
        </div>
    );
});