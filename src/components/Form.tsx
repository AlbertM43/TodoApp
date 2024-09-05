import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";
import AddImage from "../assets/add-image.svg"

import style from "./Form.module.css";
import { ListTasks } from "./ListTasks.tsx";
import { NoTaskBox } from "./NoTaskBox.tsx";

interface taskGroupType {
    id: string,
    attachedTask: string,
    isCompleted: boolean
}

export function Form() {
    const typeTaskGroup : taskGroupType[] = [];
    const [task, setTask] = useState("");
    const [taskGroup, setTaskGroup] = useState(typeTaskGroup);

    const isEmptyText = task.length === 0;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTask("")
        setTaskGroup([...taskGroup, {
            id: crypto.randomUUID(),
            attachedTask: task,
            isCompleted: false
        }])
    }

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.setCustomValidity("");
        setTask(event.target.value);
    }

    const handleDeleteTask = (id: string) => {
        const newTaskList = taskGroup.filter(value => {
            if (value.id !== id) return value;
        })
        setTaskGroup(newTaskList);
    }

    const taskStatus = (id: string) => {
        const newTask = taskGroup.map(value => {
            if (value.id === id) {
                value.isCompleted = !value.isCompleted;
            }
            return value;
        })
        setTaskGroup(newTask)
    }

    const addTaskList = () => {
        return (
            <ul className={style.listBox}>
                {taskGroup.map(value => {
                    return <ListTasks
                        key={value.id}
                        content={value.attachedTask}
                        taskStatus={taskStatus}
                        isCompleted={value.isCompleted}
                        id={value.id}
                        handleDeleteTask={handleDeleteTask}
                    />
                })}
            </ul>
        )
    }

    const StatusSearchTask = () => {
        const filteredTasks = taskGroup.filter(value => {
            if (value.isCompleted) return value;
        })
        return filteredTasks.length;
    }

    const handleContentInvalid = (event: InvalidEvent<HTMLInputElement>) => {
        event.target.setCustomValidity("Esse campo é obrigatório!!");
    }

    return (
        <section className={style.container}>
            <form className={style.formContainer} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task"
                    value={task}
                    className={style.inputText}
                    placeholder="Adicione uma nova tarefa"
                    required
                    onChange={handleChangeEvent}
                    onInvalid={handleContentInvalid}
                />
                <button className={style.addTask} disabled={isEmptyText}>
                    <span>Criar</span>
                    <img src={AddImage} />
                </button>
            </form>
            <div className={style.boxTasks}>
                <header className={style.countContainer}>
                    <p>Tarefas criadas <span>{taskGroup.length}</span></p>
                    <p>Concluidas <span>{`${StatusSearchTask()} de ${taskGroup.length}`}</span></p>
                </header>
                <aside>
                    {taskGroup.length === 0 ? <NoTaskBox /> : addTaskList()}
                </aside>
            </div>
        </section>
    )
}