import React, { useEffect } from "react";
import "../ui/stylesheets/resultStylesheet.css";
import { useGlobalContext } from "./context";
const Results = () => {
  const { finalTasks, criticalPath } = useGlobalContext();
  useEffect(() => {
    console.log(finalTasks);
    console.log(criticalPath);
  }, [finalTasks]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Activité</th>
            <th>Durée</th>
            <th>Dépendances</th>
            <th>Début au plus tôt</th>
            <th>Début au plus tard</th>
            <th>Fin au plus tôt</th>
            <th>Fin au plus tard</th>
            <th>Marge</th>
            <th className="negative">Critique</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(finalTasks).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.duration}</td>
              <td>{JSON.stringify(value.predecessors)}</td>
              {/* <td>{value.predecessors.map((pred,index)=>{
                <span key={index}>{pred}</span>
              })}</td> */}
              <td>{value.earliestStart}</td>
              <td>{value.latestStart}</td>
              <td>{value.earliestFinish}</td>
              <td>{value.latestFinish}</td>
              <td>0</td>
              <td className="negative">{value.earliestFinish==value.latestFinish?"✅":"❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Durée totale du projet:</div>
      <div>Le chemin critique est : 
        {/* {criticalPath.length!=0?criticalPath.map((task,index)=>{
            JSON.stringify(<div style={{color:"red"}}>{task} ⏩</div>);
        }):""} */}
        {JSON.stringify(criticalPath)}
      </div>
    </div>
  );
};

export default Results;
