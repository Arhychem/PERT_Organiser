import { create } from 'zustand';
import useStore from './store';


const useTasksStore = create((set, get) => {
    const {nodes, edges} = useStore.getState();
    const tasks = edges.map((edge, i) => {
        return {
            edgeId: edge.id,
            name: edge.id,
            duration: edge.data.duration,

        }
    })
    return {
        tasks: tasks
    }
});

export default useTasksStore;

const foo = [
    {
        taskEdgeId: '1',
        taskName: 'A',
        duration: 12,
        previous: ['A', 'B'],
    }
]