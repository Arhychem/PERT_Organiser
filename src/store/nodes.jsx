export default [
    {
        id: '1',
        data: { label: 'Pancake', nb: 20 },
        position: { x: 250, y: 25 },
        type: 'textUpdater'
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <strong>Ketchup</strong>, nb: 20 },
        position: { x: 100, y: 125 },
        type: 'textUpdater'
    },
    {
        id: '3',
        data: { label: 'Mayo', nb: 20 },
        position: { x: 250, y: 250 },
        type: 'textUpdater'
    },
    {
        id: '4',
        data: { label: 'Hello', nb: 20 },
        position: { x: 350, y: 250 },
        type: 'default',
    },
];