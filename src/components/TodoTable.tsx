import { Button, FloatButton, message, Space, Table } from "antd";
import useTodoStore, { Todo } from "../store/todoStore";
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TodoModal from "./TodoModal";
const TodoTable: React.FC = () => {
  const { todos, deleteTodo, search, filter } = useTodoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const openModal = (todo: Todo | null = null) => {
    setTodoToEdit(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTodoToEdit(null);
    setIsModalOpen(false);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || todo.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_: unknown, record: Todo) => (
        <Space size="middle" align="center">
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              deleteTodo(record.id);
              message.success("Todo deleted successfully!");
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <FloatButton onClick={() => openModal()} icon={<PlusCircleOutlined />} />
      <Table
        dataSource={filteredTodos}
        columns={columns}
        rowKey="id"
        style={{ marginTop: "20px" }}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <TodoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        todoToEdit={todoToEdit}
      />
    </div>
  );
};

export default TodoTable;
