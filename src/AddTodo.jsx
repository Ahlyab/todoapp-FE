// TodoList.jsx
import { useState } from "react";
import "./index.css";

export const TodoList = ({
  id,
  title,
  completed,
  onDelete,
  checkComplete,
  handleEditTodos,
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEdit = () => {
    setOnEdit(true);
  };

  const handleSave = () => {
    setOnEdit(false);
    if (editValue) {
      handleEditTodos(editValue, id);
    } else {
      setEditValue(title);
    }
  };

  // Make sure we update the editValue if the title prop changes
  // This prevents stale state when todos are refreshed from the server
  useState(() => {
    setEditValue(title);
  }, [title]);

  if (onEdit) {
    return (
      <div className="list">
        <div className="listItems">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
        </div>
        <span>
          <div className="buttons">
            <button id="edit" className="save" onClick={handleSave}>
              Save
            </button>
            <button id="Delete" className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </span>
      </div>
    );
  } else {
    return (
      <div className="list">
        <div className="listItems">
          <label>
            <input
              type="checkbox"
              name=""
              id={id}
              checked={completed}
              onChange={() => checkComplete(id)}
              className="checkbox"
            />
            <span className={completed ? "cross-title" : "title"}>{title}</span>
          </label>
        </div>
        <span>
          <div className="buttons">
            <button
              id="edit"
              className={completed ? "cross" : "edit"}
              onClick={handleOnEdit}
              disabled={completed}
            >
              Edit
            </button>
            <button className="delete" id="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </span>
      </div>
    );
  }
};

const AddTodo = ({ onAdd }) => {
  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoName.trim()) {
      onAdd(todoName);
      setTodoName("");
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit}>
        <h1>TODO LIST</h1>
        <div className="add-content">
          <input
            placeholder="Add Todo items"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            required
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
