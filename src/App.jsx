import React, { useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import useStore from "./store/store";
import styled from "@emotion/styled";
import TasksPanel from "./components/ui/TasksPanel";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Wrapper } from "./components/ui/TaskPanelHeader";
import Results from "./components/ui/Results";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  nodeTypes: state.nodeTypes,
  edgeTypes: state.edgeTypes,
});
const selector2 = (state) => ({
  existingTasks: state.tasks,
  addTask: state.addTask,
  setIsTasksEdited: state.setIsTasksEdited,
  saveToLocalStorage: state.saveToLocalStorage,
});
export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    edgeTypes,
  } = useStore(selector, shallow);
  const { existingTasks, addTask, setIsTasksEdited, saveToLocalStorage } =
  useStore(selector2);
  useEffect(()=>{
    console.log(existingTasks)
  },[existingTasks]);
  return (
    <ChakraProvider>
      <AppWrapper>
        <div className="visualizer">
          <ReactFlow
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            proOptions={{ hideAttribution: true }}
          >
              <h1>Table</h1>
              <Results existingTasks={existingTasks} />
            <MiniMap />
            <Controls />
            <Background variant="dots" gap={40} />
            <Panel position="top-center"></Panel>
          </ReactFlow>

          {/* {
            nodes.length === 0 &&
            (<Alert status='info' className='alert'>
              <AlertIcon />
              <AlertTitle>Pas encore de graphe à visualiser!</AlertTitle>
              <AlertDescription>Creez des taches ensuite générez le</AlertDescription>
            </Alert>)
          } */}
        </div>
        <TasksPanel className="tasksPanel" />
      </AppWrapper>
    </ChakraProvider>
  );
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  .visualizer {
    width: 100%;
    height: 100%;
    background-color: #f8fafb;
    position: relative;
    .alert {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 800px;
    }
  }
`;
