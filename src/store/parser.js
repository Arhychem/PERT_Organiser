const tasks = [
  { name: "A", duration: 3, predecessors: [] },
  { name: "B", duration: 1.1, predecessors: ["A"] },
  { name: "C", duration: 5, predecessors: ["A"] },
  { name: "D", duration: 6, predecessors: ["B"] },
  { name: "E", duration: 4, predecessors: ["B"] },
  { name: "F", duration: 2, predecessors: ["C", "I", "D"] },
  { name: "G", duration: 9, predecessors: ["E", "F"] },
  { name: "H", duration: 5, predecessors: [] },
  { name: "I", duration: 8, predecessors: ["H"] },
  { name: "J", duration: 2, predecessors: ["H"] },
  { name: "K", duration: 3, predecessors: ["I"] },
  { name: "L", duration: 7, predecessors: ["K", "J"] },
];

const BadForTasks = [
  { name: "A", duration: 3, predecessors: [] },
  { name: "B", duration: 1.1, predecessors: ["A"] },
  { name: "C", duration: 5, predecessors: ["A"] },
  { name: "D", duration: 6, predecessors: ["B"] },
  { name: "E", duration: 4, predecessors: ["B"] },
  { name: "F", duration: 2, predecessors: ["C"] },
  { name: "F", duration: 2, predecessors: ["I"] },
  { name: "F", duration: 2, predecessors: ["D"] },
  { name: "G", duration: 9, predecessors: ["E"] },
  { name: "G", duration: 9, predecessors: ["F"] },
  { name: "H", duration: 5, predecessors: [] },
  { name: "I", duration: 8, predecessors: ["H"] },
  { name: "J", duration: 2, predecessors: ["H"] },
  { name: "K", duration: 3, predecessors: ["I"] },
  { name: "L", duration: 7, predecessors: ["K"] },
  { name: "L", duration: 7, predecessors: ["J"] }
];
export function parseBadTasks(badTasks) {
  const parsedTasks = [];
  const taskMap = {};

  // Créer un map des tâches pour faciliter la recherche
  for (const task of badTasks) {
    if (!taskMap[task.name]) {
      taskMap[task.name] = {
        name: task.name,
        duration: task.duration,
        predecessors: [],
      };
      parsedTasks.push(taskMap[task.name]);
    }
    for (const predecessor of task.predecessors) {
      if (!taskMap[predecessor]) {
        taskMap[predecessor] = {
          name: predecessor,
          duration: 0,
          predecessors: [],
        };
        parsedTasks.push(taskMap[predecessor]);
      }
      taskMap[task.name].predecessors.push(taskMap[predecessor].name);
    }
  }

  return parsedTasks;
}

/* const parsedTasks = parseBadTasks(BadForTasks);
console.log(parsedTasks); */
