import { useState } from "react";
import "./index.css";
const TodoList = ({
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
  if (onEdit) {
    return (
      <div className="list">
        <div className="listItems">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </div>
        <span>
          <div className="buttons">
            <button id="edit" className="save" onClick={() => handleSave(id)}>
              Save
            </button>
            <button
              id="Delete"
              className="delete"
              onClick={() => handleDelete(id)}
            >
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

export default TodoList;
