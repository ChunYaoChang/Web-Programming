export type Item = {
    id: Number,
    title: String,
    isCompleted: Boolean,
}

export type TodoAddFormProps = {
    placeholderText: String,
    onItemAdd: (x: Item) => void,
}

export type TodoItemProps = {
    title: String,
    style: Object,
    onItemClick: Function,
}

export type FOOTERProps = {
    totalNumber: Number,
    onbtnClick: Function,
    onbtnClickA: Function,
}