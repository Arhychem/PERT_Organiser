import { create } from 'zustand';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import initialNodes from './initialNodes';
import initialEdges from './initialEdges';
import StepNode from '../components/graph/StepNode';
import TaskEdge from '../components/graph/TaskEdge';


const useStore = create((set, get) => {
    return {
        nodeId: 0,
        nodes: initialNodes,
        edges: initialEdges,
        nodeTypes: {stepNode: StepNode },
        edgeTypes: {taskEdge: TaskEdge},
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
                edges: addEdge({...connection, type: 'taskEdge'}, get().edges)
            })
        },
        addNode: () => {
            const id = --get().nodeId;
            const newNode = {
                id: `${id}`,
                data: { label: 'New node' + id, nb: 20 },
                position: { x: 250, y: 25 },
                type: 'stepNode'
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