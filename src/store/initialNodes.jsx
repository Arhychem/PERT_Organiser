export default [
    {
        id: '0',
        data: { label: 'Pancake', nb: 20 },
        position: { x: 50, y: 250 },
        type: 'startNode'
    },
    {
        id: '1',
        data: { label: 'Pancake', nb: 20 },
        position: { x: 250, y: 250 },
        type: 'stepNode'
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <strong>Ketchup</strong>, nb: 20 },
        position: { x: 600, y: 300 },
        type: 'stepNode'
    },
    {
        id: '3',
        data: { label: 'Mayo', nb: 20 },
        position: { x: 950, y: 250 },
        type: 'stepNode'
    },
    {
        id: 'end',
        data: { label: 'Pancake', nb: 20 },
        position: { x: 1150, y: 250 },
        type: 'endNode'
    },
];