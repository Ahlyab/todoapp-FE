import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const baseUrl = "https://todo-backend-akrz.onrender.com/todos";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data.allTodos))
      .catch((err) => {
        console.log(err);
      });
  };

  const onAdd = async (name) => {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({
        title: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((todos) => [...todos, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id) => {
    await fetch(baseUrl + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setTodos(
            todos.filter((todo) => {
              return todo._id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTodos = async (editvalue, id) => {
    await fetch(baseUrl + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: editvalue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((todos) => [...todos, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const switchComplete = async (id) => {
  const todo = todos.find((todo) => todo._id === id);
  if (!todo) {
    alert("Invalid ID");
    return;
  }

  try {
    const response = await fetch(baseUrl + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: todo.title,  // Keep title the same
        completed: !todo.completed,  // Toggle completed status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to update the todo");
    }

    const updatedTodo = await response.json();

    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t._id === id ? { ...t, completed: updatedTodo.completed } : t
      )
    );
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

  return (
    <div className="App">
      <br />
      <AddTodo onAdd={onAdd} />
      <div className="allList">
        {todos.map((todo) => (
          <TodoList
            id={todo._id}
            key={todo._id}
            title={todo.title}
            completed={todo.completed}
            onDelete={onDelete}
            handleEditTodos={handleEditTodos}
            checkComplete={switchComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
