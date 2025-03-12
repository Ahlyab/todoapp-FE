import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:3000/todos";
  // const baseUrl = "https://todo-backend-akrz.onrender.com/todos";

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("");
      console.log("Fetched todos:", response.data);
      setTodos(response.data.allTodos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Failed to load todos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async (name) => {
    try {
      setLoading(true);
      const response = await api.post("", { title: name });
      console.log("Added todo:", response.data);

      // Check if we're getting the expected response structure
      if (response.data && response.data._id) {
        setTodos((prevTodos) => [...prevTodos, response.data]);
      } else {
        // If the response structure is unexpected, refresh the full list
        fetchData();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      setLoading(true);
      const response = await api.delete(`/${id}`);
      console.log("Delete response:", response);

      if (response.status === 200) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        // If there's an unexpected response, refresh the list
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo. Please try again.");
      // Refresh the list to ensure UI is in sync with server
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const handleEditTodos = async (editValue, id) => {
    try {
      setLoading(true);
      // First find the current todo to preserve any fields we're not changing
      const currentTodo = todos.find((todo) => todo._id === id);

      if (!currentTodo) {
        console.error("Todo not found for editing");
        return;
      }

      const response = await api.put(`/${id}`, {
        title: editValue,
        completed: currentTodo.completed,
      });

      console.log("Edit response:", response.data);

      if (response.data && response.data._id) {
        // Update the todo in our state
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? response.data : todo))
        );
      } else {
        // If response structure is unexpected, refresh the list
        fetchData();
      }
    } catch (error) {
      console.error("Error editing todo:", error);
      alert("Failed to update todo. Please try again.");
      // Refresh to ensure UI is in sync
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const switchComplete = async (id) => {
    try {
      setLoading(true);
      const todo = todos.find((todo) => todo._id === id);

      if (!todo) {
        console.error("Todo not found for status update");
        return;
      }

      console.log("Updating completion status for:", todo);
      console.log("completed:", todo.completed);

      const response = await api.put(`/${id}`, {
        completed: !todo.completed,
      });

      console.log("Update status response:", response.data);

      if (response.data && response.data._id !== undefined) {
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t._id === id ? response.data : t))
        );
      } else {
        // If response structure is unexpected, refresh the list
        fetchData();
      }
    } catch (error) {
      console.error("Error updating completion status:", error);
      alert("Failed to update todo status. Please try again.");
      // Refresh to ensure UI is in sync
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <br />
      <AddTodo onAdd={onAdd} />
      <div className="allList">
        {loading && <p className="loading-state">Loading...</p>}
        {!loading && todos.length === 0 && (
          <p className="no-todos">No todos yet. Add one above!</p>
        )}
        {!loading &&
          todos.map((todo) => (
            <TodoList
              id={todo._id}
              key={todo._id}
              title={todo.title}
              completed={todo.completed || false}
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
