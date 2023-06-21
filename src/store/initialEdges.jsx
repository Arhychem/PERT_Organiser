import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from 'reactflow';
export default [
    {
        id: 'A',
        source: '1',
        sourceHandle: '1-0',
        target: '2',
        type: 'taskEdge',
        data: {
            taskName: 'A',
            duration: 24,
            isFictif: false
        },
        markerEnd:{
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#1C73C4',
        }
    },
    {
        id: 'B',
        source: '2',
        sourceHandle: '2-2',
        target: '3',
        label: "label",
        type: 'taskEdge',
        data: {
            taskName: 'B',
            duration: 9,
            isFictif: true
        },
    },
    {
        id: 'C',
        source: '3',
        sourceHandle: '3-1',
        target: 'end',
        label: "label",
        type: 'criticalEdge',
        animated: true,
        data: {
            taskName: 'B',
            duration: 9,
            isFictif: false
        },
    }
];