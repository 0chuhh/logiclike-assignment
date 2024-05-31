import { ICourse } from "models/course";
import axios from "../axios";

const endpoints = {
    getCourses: () => axios.get<ICourse[]>('courses.json')
};

export default endpoints;