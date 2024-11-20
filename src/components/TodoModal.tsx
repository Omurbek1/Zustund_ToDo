import React, { useEffect } from "react";
import useTodoStore, { Todo } from "../store/todoStore";
import { Button, Form, Input, message, Modal, Select } from "antd";
interface TodoModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  todoToEdit: Todo | null;
}
const TodoModal: React.FC<TodoModalProps> = ({
  isModalOpen,
  closeModal,
  todoToEdit,
}) => {
  const { addTodo, updateTodo } = useTodoStore();
  const [form] = Form.useForm();
  useEffect(() => {
    if (todoToEdit) {
      form.setFieldsValue(todoToEdit);
    } else {
      form.resetFields();
    }
  }, [todoToEdit, form]);
  const handleSubmit = (values: { title: string; status: string }) => {
    if (todoToEdit) {
      updateTodo({ ...todoToEdit, ...values });
      message.success("Todo updated successfully!");
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: values.title,
        status: values.status,
      };
      addTodo(newTodo);
      message.success("Todo added successfully!");
    }
    closeModal();
    form.resetFields();
  };
  return (
    <Modal
      title={todoToEdit ? "Edit Todo" : "Add Todo"}
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input a title!" }]}
        >
          <Input placeholder="Enter todo title" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {todoToEdit ? "Update" : "Add"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TodoModal;
