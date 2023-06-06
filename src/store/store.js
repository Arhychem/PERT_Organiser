import { create } from 'zustand';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import initialNodes from './nodes';
import initialEdges from './edges';
import TextUpdaterNode from '../components/TextUpdaterNode';


const useStore = create((set, get) => {
    return {
        nodeId: 0,
        nodes: initialNodes,
        edges: initialEdges,
        nodeTypes: { textUpdater: TextUpdaterNode },
        onNodesChange: (changes) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes)
            });
        },
        onEdgesChange: (changes) => {
            set({
                edges: applyEdgeChanges(changes, get().edges)
            })
        },
        onConnect: (connection) => {
            set({
                edges: addEdge(connection, get().edges)
            })
        },
        addNode: () => {
            const id = --get().nodeId;
            const newNode = {
                id: `${id}`,
                data: { label: 'New node' + id, nb: 20 },
                position: { x: 250, y: 25 },
                type: 'textUpdater'
            }
            set({
                nodes: [...get().nodes, newNode]
            })
        },
        updateNodeColor: (nodeId, color) => {
            set({
                nodes: get().nodes.map((node) => {
                    if(node.id == nodeId) {
                        node.data = {...node.data, color}
                    }
                    return node;
                })
            })
        }
    }
})

export default useStore;