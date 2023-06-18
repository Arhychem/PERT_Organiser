import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';
import useStore from './store/store';
import styled from '@emotion/styled';
import TasksPanel from './components/ui/TasksPanel';
import { ChakraProvider } from '@chakra-ui/react'


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  nodeTypes: state.nodeTypes,
  edgeTypes: state.edgeTypes
})
export default function App() {

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, nodeTypes, edgeTypes } = useStore(selector, shallow)

  return (
    <ChakraProvider>
      <AppWrapper>
        <div className='visualizer'>
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
            <MiniMap />
            <Controls />
            <Background variant='dots' gap={40} />
            <Panel position='top-center'>
              <button onClick={addNode}>Add node</button>
            </Panel>
          </ReactFlow>
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
  .visualizer{
    width: 100%;
    height: 100%;
    background-color: #F8FAFB;
  }
`;