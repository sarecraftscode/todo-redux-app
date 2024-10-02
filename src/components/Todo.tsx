

const Todo = (props) => {
    const {todo, handleToggleComplete, handleDelete} = props;
    return (
        <>
            <div
                className=""
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none'
                }}
            >{todo.text}{" "}
                <button className="btn btn-success" onClick={() => handleToggleComplete(todo.id)}>
                    {" "}
                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                {" "}
                <button className="btn btn-warning" onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
        </>
    )
}

export default Todo;