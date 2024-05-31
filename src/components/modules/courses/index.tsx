import { useSessionStorage } from "hooks/use-session-storage";
import { ICourse, Tag } from "models/course";
import { useCallback, useEffect, useState } from "react";
import { API } from "services";
import { CoursesCategories } from "./courses-categories";
import { CourseList } from "./list";
import styles from './styles.module.scss';
import React from "react";

export const CoursesModule = React.memo(() => {
    const [tags, setTags] = useSessionStorage<Tag[]>('tags', []);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Tag>();
    const [coursesToShow, setCoursesToShow] = useState<ICourse[]>([]);

    //get set of courses tags
    const getTags = useCallback((courses: ICourse[]) => {
        const tempTags: Tag[] = [];
        courses.forEach(c => {
            tempTags.push(...c.tags.filter(t => !tempTags.includes(t)));
        });
        if (JSON.stringify(tags) !== JSON.stringify(tempTags)) {
            setTags(tempTags);
        }
        setSelectedCategory(tempTags[0]);
    },[setTags, tags]);

    //fetch courses
    const getCourses = useCallback( async () => {
        const { data } = await API.courses.getCourses();
        setCourses(data);
        getTags(data);
    },[getTags]);

    const onCategoryChange = useCallback((value: Tag) => {
        setSelectedCategory(value);
    },[]);

    //change courses state to current category
    useEffect(() => {
        if(selectedCategory){
            const newCoursesToShow = courses.filter(c => c.tags.includes(selectedCategory));
            if (JSON.stringify(coursesToShow) !== JSON.stringify(newCoursesToShow)) {
                setCoursesToShow(newCoursesToShow);
            }
        }
    }, [courses, coursesToShow, selectedCategory]);

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div className={styles.wrapper}>
            <CoursesCategories value={selectedCategory} onChange={onCategoryChange} labels={tags ? tags : []} />
            <CourseList courses={coursesToShow} />
        </div>
    );
});