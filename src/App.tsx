import { Flex, Layout } from "antd";
import TodoFilters from "@components/TodoFilters";
import TodoTable from "@components/TodoTable";
function App() {
  return (
    <Flex vertical align="center">
      <TodoFilters />
      <Layout
        style={{
          width: "100%",
          padding: "0 20px",
        }}
      >
        <TodoTable />
      </Layout>
    </Flex>
  );
}

export default App;
