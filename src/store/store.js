import { create } from 'zustand';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import initialNodes from './initialNodes';
import initialEdges from './initialEdges';
import StepNode from '../components/graph/StepNode';
import StartNode from '../components/graph/StartNode';
import EndNode from '../components/graph/EndNode';
import TaskEdge from '../components/graph/TaskEdge';
import CriticalEdge from '../components/graph/CriticalEdge';


const useStore = create((set, get) => {
    const initialTasks = initialEdges.map((edge, i) => {
        return {
            edgeId: edge.id,
            name: edge.id,
            duration: edge.data.duration,
            predecessor: ['A', 'B'],
        }
    })
    return {
        nodeId: 0,
        nodes: initialNodes,
        edges: initialEdges,
        tasks: [
            // {
            //     edgeId: 'Deb',
            //     name: 'Deb',
            //     duration: 0,
            //     predecessor: [],
            // },
            ...initialTasks
        ],
        nodeTypes: { stepNode: StepNode, startNode: StartNode, endNode: EndNode },
        edgeTypes: { taskEdge: TaskEdge, criticalEdge: CriticalEdge },
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
                edges: addEdge(
                    {
                        ...connection,
                        type: 'taskEdge',
                        data: {
                            taskName: 'A',
                            duration: 24,
                            isFictif: false
                        }
                    }, get().edges)
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
        addTask: (newTask) => {
            set({
                tasks: [...get().tasks, newTask]
            });
            
        },
        removeTask: (taskName) => {
            set({
                tasks: get().tasks.filter(t => t.name != taskName)
            })
        },
    }
})

export default useStore;