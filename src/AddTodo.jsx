const AddTodo = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.name.value);
    e.target.name.value = "";
  };
  return (
    <div className="add">
      <form onSubmit={handleSubmit}>
        <h1>TODO LIST</h1>
        <div className="add-content">
          <input placeholder="Add Todo items" name="name" required />
          <button onSubmit={handleSubmit} className="add-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
