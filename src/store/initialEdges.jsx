import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from 'reactflow';
export default [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'taskEdge',
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
        animated: true,
        label: "label",
        type: 'taskEdge',
    }
];