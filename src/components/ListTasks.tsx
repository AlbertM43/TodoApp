import style from "./ListTasks.module.css";

import { FaRegCircle} from "react-icons/fa";
import { GrFormCheckmark } from "react-icons/gr";
import { TbTrash } from "react-icons/tb";

interface listTasksProps {
    content: string,
    isCompleted: boolean,
    taskStatus: (id: string) => void;
    id: string,
    handleDeleteTask: (id: string) => void;
}

export function ListTasks({ content, isCompleted, taskStatus, id, handleDeleteTask }: listTasksProps) {

    const classTaskStatus = isCompleted ? "completed" : "incomplete";

    const handleChangeStatusClass = () => {
        taskStatus(id);
    }

    const handleDelete = () => {
        handleDeleteTask(id);
    }

    return (
        <li className={`${style.taskBox} ${style[classTaskStatus]}`}>
            { !isCompleted ? 
            <FaRegCircle 
            className={style.iconUnchecked} 
            onClick={handleChangeStatusClass}
            /> : 
            <GrFormCheckmark 
            className={style.iconChecked}
            onClick={handleChangeStatusClass}
            />}

            <span onClick={handleChangeStatusClass}>{content}.</span>
            <TbTrash 
                className={style.trash}
                onClick={handleDelete}
            />
        </li>
    )
}