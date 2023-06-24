import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from 'reactflow';
export default [
    {
        id: 'A',
        source: '1',
        sourceHandle: 'A',
        target: '2',
        type: 'taskEdge',
        data: {
            name: 'A',
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
        sourceHandle: 'B',
        target: '3',
        label: "label",
        type: 'taskEdge',
        data: {
            name: 'B',
            duration: 9,
            isFictif: true
        },
    },
    {
        id: 'C',
        source: '3',
        sourceHandle: 'C',
        target: 'end',
        label: "label",
        type: 'criticalEdge',
        animated: true,
        data: {
            name: 'B',
            duration: 9,
            isFictif: false
        },
    }
];