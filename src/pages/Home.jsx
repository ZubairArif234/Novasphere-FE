import React from "react";
import { useExampleStore } from "../stores/example.store";
import { useShallow } from "zustand/react/shallow";
import { Button, Container, Flex } from "@mantine/core";

const Home = () => {
  const { state, increment, decrement, reset } = useExampleStore(
    useShallow((state) => state)
  );

  return (
    <Container fluid>
      <Flex direction={"column"} gap={10}>
        <div>Play around with state the: {state}</div>
        <Flex gap={10}>
          <Button onClick={() => increment()}>Increment</Button>
          <Button onClick={() => decrement()}>Decrement</Button>
          <Button onClick={() => reset()}>Reset</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
