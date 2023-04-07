import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../../store/tasks-actions";

const TaskDetail = () => {
	const { id } = useParams();
    useEffect(() => {
        const getTaskHandler = async () => {
            console.log(id);
            const task = await getTask(id)
            console.log(task);
        }

        getTaskHandler()
    }, [id])
	return <h1>ELO</h1>;
};

export default TaskDetail;
