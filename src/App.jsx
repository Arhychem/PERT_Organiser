import React from 'react';
import ReactFlow, {MiniMap, Controls, Background, Panel } from 'reactflow';

import 'reactflow/dist/style.css';
import {shallow} from 'zustand/shallow';
import useStore from './store/store';


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  nodeTypes: state.nodeTypes
})
export default function App() {

  const {nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, nodeTypes} = useStore(selector, shallow)

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{hideAttribution: true}}
      >
        <MiniMap />
        <Controls />
        <Background variant='dots' />
        <Panel position='top-center'>
          <button onClick={addNode}>Add node</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}