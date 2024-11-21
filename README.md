# **Zustand ToDo App**

🎯 A simple yet powerful ToDo application built using **Zustand**, **Ant Design**, **Redux DevTools**, and **Persist**.

---

## **Features**

- 🛠️ **Add, edit, and delete tasks.**
- 🔍 **Search and filter tasks by status.**
- 💾 **Persist data between page reloads using `persist`.**
- 📊 **Debug state changes with Redux DevTools.**
- 🎨 **Sleek UI with Ant Design.**

---

## **Demo**

🚀 Try the application: [Zustand ToDo Demo](https://github.com/your-username/zustand-todo-app)

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zustand-todo-app.git
   cd zustand-todo-app
2. Install dependencies:
   ```bash
  npm install
3. Run the application:
   ```bash
  npm start

 ## **Technologies**
-  Zustand: State management library for simplicity and performance.
- Zustand/middleware: Enhances Zustand with persist and devtools.
- Ant Design: Elegant UI components for a modern look.
- TypeScript: Ensures type safety and scalability.

 ## **How It Works**
-  Zustand Store: Manages global state for tasks, search, and filters.
-  Persist Middleware: Saves the application state in localStorage to ensure tasks persist across reloads.
-  Redux DevTools: Tracks state changes and actions for debugging.

 ## **Store Configuration**
 The following example demonstrates how Zustand is configured with persist and devtools middleware for state management and persistence:
 
 ```bash
 import { create } from "zustand";
 import { devtools, persist } from "zustand/middleware";

export interface Todo {
  id: number;
  title: string;
  status: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  search: string;
  setSearch: (search: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
        updateTodo: (updatedTodo) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            ),
          })),
        deleteTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),
        search: "",
        setSearch: (search) => set({ search }),
        filter: "all",
        setFilter: (filter) => set({ filter }),
      }),
      {
        name: "todo-storage",
        partialize: (state) => ({
          todos: state.todos,
          filter: state.filter,
          search: state.search,
        }),
      }
    ),
    { name: "TodoStore" }
  )
);

 export default useTodoStore;
```
## Usage
- Add a Task: Use the input field to add a new task to the list.
- Edit a Task: Click the edit button on any task to modify it.
- Delete a Task: Remove tasks with a single click.
- Search: Quickly search for tasks by their title.
- Filter: Filter tasks by their status (Pending, Completed).

