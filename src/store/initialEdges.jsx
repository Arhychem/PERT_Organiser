import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from 'reactflow';
export default [
    {
        id: 'e1-2',
        source: '1',
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
        id: 'e2-3',
        source: '2',
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
        id: 'e3-end',
        source: '3',
        target: 'end',
        label: "label",
        type: 'criticalEdge',
        animated: true,
        data: {
            taskName: 'B',
            duration: 9,
            isFictif: true
        },
    }
];