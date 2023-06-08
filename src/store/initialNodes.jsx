export default [
    {
        id: '1',
        data: { label: 'Pancake', nb: 20 },
        position: { x: 150, y: 250 },
        type: 'stepNode'
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <strong>Ketchup</strong>, nb: 20 },
        position: { x: 500, y: 300 },
        type: 'stepNode'
    },
    {
        id: '3',
        data: { label: 'Mayo', nb: 20 },
        position: { x: 850, y: 250 },
        type: 'stepNode'
    },
];