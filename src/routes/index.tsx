import { CoursesPage } from "pages/courses";
import { Route, Routes } from "react-router-dom";


export const Routing = () => {
	return (
		<Routes>
            <Route path="/" element={<CoursesPage/>}/>
		</Routes>
	);
};
