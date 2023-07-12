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
import axios from 'axios';
import FictifNode from '../components/graph/FicitifNode';


const useStore = create((set, get) => {
    const initialTasks = initialEdges.map((edge, i) => {
        return {
            edgeId: edge.id,
            name: edge.id,
            duration: edge.data.duration,
            predecessors: ['A', 'B'],
        }
    })
    return {
        nodeId: 0,
        nodes: [],
        edges: [],
        tasks: [],
        nodeTypes: { stepNode: StepNode, startNode: StartNode, endNode: EndNode, fictifNode: FictifNode },
        edgeTypes: { taskEdge: TaskEdge, criticalEdge: CriticalEdge },
        isTasksEdited: false,
        setIsTasksEdited: (state) => {
            set({
                isTasksEdited: state
            })
        },
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
        editTask: (taskName, newTask) => {
            let tasks = get().tasks;
            let taskIndex = tasks.findIndex(t => t.name == taskName);
            tasks[taskIndex] = newTask;
            set({
                tasks: [...tasks]
            });
        },
        removeTask: (taskName) => {
            //remove the task
            let filteredTasks = get().tasks.filter(t => t.name != taskName);
            //remove the task from the predecessors list if the list contains the removed task
            filteredTasks.forEach(task => {
                task.predecessors = task.predecessors.filter(t => t != taskName);
                if(task.predecessors.length == 0) {
                    task.predecessors.push('Deb')
                }
            });

            set({
                tasks: filteredTasks
            })
        },
        calculateGraph:  () => {
            return axios.post("http://localhost:8000/calculate", {
                tasks: get().tasks
            }).then(res => {
                console.log(res.data);
                set({
                    edges: res.data.edges.map(edge=>{
                        return {
                            ...edge, 
                            sourceHandle: edge.data.name,
                            id: edge.source+"-"+edge.target
                        }

                    }),
                    nodes: res.data.nodes.map((node, i) => {
                        return {
                            id: node.name,
                            data: {
                                earliestDate: node.es,
                                latestDates: node.list_lf
                            },
                            position: { x: 50 + i*100, y: 250 + 100*Math.pow(-1, i) },
                            type: node.type
                        }
                    })
                });
                //remove not connected nodes
                const edges = get().edges;
                const nodes = get().nodes;

            }).catch(err => {
                console.log(err);
            });
        },
        saveToLocalStorage: () => {
            localStorage.setItem('tasks', JSON.stringify(get().tasks))
        },
        loadFromLocalStorage: () => {
            const tasks = localStorage.getItem('tasks');
            if(tasks){
                set({
                    tasks: JSON.parse(tasks)
                });
                return true;
            } else{
                return false;
            }
        }
    }
})

export default useStore;