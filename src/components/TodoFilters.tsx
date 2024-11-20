import useTodoStore from "../store/todoStore";
import { Flex, Input, Select } from "antd";
import React from "react";

const TodoFilters: React.FC = () => {
  const { search, setSearch, filter, setFilter } = useTodoStore();
  return (
    <Flex gap="middle" align="center">
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "200px" }}
      />
      <Select
        defaultValue="all"
        value={filter}
        style={{ width: 120 }}
        onChange={(value) => setFilter(value)}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
      </Select>
    </Flex>
  );
};

export default TodoFilters;
