import style from "./NoTaskBox.module.css"
import clipboard from "../assets/clipboard.svg"

export function NoTaskBox() {
    return (
        <div className={style.noTasksContainer}>
            <img src={clipboard} alt="" />
            <p className={style.paragraph}>
                <span><strong>Você ainda não tem tarefas cadastradas</strong></span>
                <span>Crie tarefas e organize seus itens a fazer</span>
            </p>
        </div>
    )
}