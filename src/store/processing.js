// Définition de la structure des tâches
const tasks = [
  { name: "A", duration: 3, predecessors: [] },
  { name: "B", duration: 1.1, predecessors: ["A"] },
  { name: "C", duration: 5, predecessors: ["A"] },
  { name: "D", duration: 6, predecessors: ["B"] },
  { name: "E", duration: 4, predecessors: ["B"] },
  { name: "F", duration: 2, predecessors: ["C","I","D"] },
  { name: "G", duration: 9, predecessors: ["E","F"] },
  { name: "H", duration: 5, predecessors: [] },
  { name: "I", duration: 8, predecessors: ["H"] },
  { name: "J", duration: 2, predecessors: ["H"] },
  { name: "K", duration: 3, predecessors: ["I"] },
  { name: "L", duration: 7, predecessors: ["K", "J"] }
];

// Fonction pour ajouter une tâche au diagramme de PERT
function addTaskToPERT(task, pert) {
  pert[task.name] = {
    duration: task.duration,
    predecessors: task.predecessors,
    successors: [], // Ajout de la liste des successeurs
    earliestStart: 0,
    latestStart: Number.MAX_SAFE_INTEGER,
    earliestFinish: task.duration,
    latestFinish: Number.MAX_SAFE_INTEGER
  };
}

// Fonction pour calculer les temps de début et de fin au plus tôt
function calculateEarliestTimes(pert) {
  let changed;
  do {
    changed = false;
    for (const taskName in pert) {
      const task = pert[taskName];
      let maxPredecessorFinish = 0;
      task.predecessors.forEach(predecessorName => {
        const predecessorFinish = pert[predecessorName].earliestFinish;
        if (predecessorFinish > maxPredecessorFinish) {
          maxPredecessorFinish = predecessorFinish;
        }
      });
      if (task.earliestStart < maxPredecessorFinish) {
        task.earliestStart = maxPredecessorFinish;
        task.earliestFinish = maxPredecessorFinish + task.duration;
        changed = true;
      }
    }
  } while (changed);
}

function calculateLatestTimes(pert, endProjectTime) {
  // Initialiser les temps de fin au plus tard pour les tâches sans successeurs
  for (const taskName in pert) {
    const task = pert[taskName];
    if (task.successors.length === 0) { // Si la tâche n'a pas de successeurs
      task.latestFinish = endProjectTime;
      task.latestStart = endProjectTime - task.duration;
    }
  }

  let changed;
  do {
    changed = false;
    for (const taskName in pert) {
      const task = pert[taskName];
      let minSuccessorStart = Number.MAX_SAFE_INTEGER;
      task.successors.forEach(successorName => {
        const successorStart = pert[successorName].latestStart;
        if (successorStart < minSuccessorStart) {
          minSuccessorStart = successorStart;
        }
      });
      if (task.successors.length > 0 && task.latestFinish > minSuccessorStart) {
        task.latestFinish = minSuccessorStart;
        task.latestStart = minSuccessorStart - task.duration;
        changed = true;
      }
    }
  } while (changed);
}

// Fonction pour construire le diagramme de PERT
export function createPERT(tasks) {
  const pert = {};
  tasks.forEach(task => addTaskToPERT(task, pert));
  updateSuccessors(pert); // Mettre à jour les successeurs
  calculateEarliestTimes(pert);
  // Supposons que le projet se termine avec la tâche ayant la fin au plus tôt la plus tardive
  const endProjectTime = Math.max(...Object.values(pert).map(task => task.earliestFinish));
  calculateLatestTimes(pert, endProjectTime);
  return pert;
}

// Mettre à jour la liste des successeurs pour chaque tâche
function updateSuccessors(pert) {
  for (const taskName in pert) {
    const task = pert[taskName];
    task.predecessors.forEach(predecessorName => {
      pert[predecessorName].successors.push(taskName);
    });
  }
}


export function findCriticalPath(pert) {
  let currentTasks2 = [];
  /* let currentTasks = Object.values(pert).filter(task => task.latestFinish === task.earliestFinish);
  console.log("current tasks: ",currentTasks); */
  for (const task in pert){
    console.log("task ",task);
    if (pert[task].latestFinish===pert[task].earliestFinish){
      currentTasks2.push({...pert[task],name:task});
    }
  }
  console.log("Ct: ",currentTasks2," longueur ",currentTasks2.length);
  const criticalTasksOrdered = currentTasks2.sort((task1,task2)=>{
    return task1.earliestStart-task2.earliestStart;
  });

  const criticalPath = criticalTasksOrdered.reduce((taskNames,task)=>{
    return [...taskNames,task.name];
  },[])

  console.log("cp ",criticalTasksOrdered);
 /*  while (currentTasks2.length > 0) {
    currentTasks2.forEach(task => {
      console.log(task.name);
      if (task.earliestStart === task.latestStart) {
        criticalPath.push(task.name);
        // Trouver les prédécesseurs qui sont aussi sur le chemin critique
        currentTasks2 = task.predecessors.map(predName => pert[predName]).filter(predTask => predTask.latestFinish === predTask.earliestFinish);
      }
    });
  } */
  
  return criticalPath;
}
 // Création du diagramme de PERT
/* const pertDiagram = createPERT(tasks);
console.log("Pert diagram: ",pertDiagram);

// Utilisation de la fonction findCriticalPath pour obtenir le chemin critique
const criticalPath = findCriticalPath(pertDiagram);
console.log('Chemin critique:', criticalPath);  */