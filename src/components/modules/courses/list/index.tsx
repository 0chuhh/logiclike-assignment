import { ICourse } from 'models/course';
import React, { FC } from 'react';
import { CourseCard } from './item';
import styles from './styles.module.scss';

export interface ICourseListProps {
    courses: ICourse[];
}

export const CourseList: FC<ICourseListProps> = React.memo(({ courses }) => {
    return (
        <div className={styles.course_list}>
            {
                courses.map((c, i) => (
                    <CourseCard appearDelay={i * .1} key={c.id} course={c} />
                ))
            }
        </div>
    );
});