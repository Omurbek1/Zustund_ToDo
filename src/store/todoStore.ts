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
