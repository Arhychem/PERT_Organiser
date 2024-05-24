import React, { useEffect } from "react";
import "../ui/stylesheets/resultStylesheet.css";
import { useGlobalContext } from "./context";
const Results = () => {
  const { finalTasks, criticalPath } = useGlobalContext();
  useEffect(() => {
    console.log(finalTasks);
    console.log(criticalPath);
  }, [finalTasks]);

  const getProjectDuration = () => {
    const projectDurationKey = Object.keys(finalTasks).filter((key) => {
      return key == criticalPath[criticalPath.length - 1];
    });
    console.log("projectDuration: ", projectDurationKey);
    return (
      <span style={{ color: "red" }}>
        {" "}
        {finalTasks[projectDurationKey].latestFinish}
      </span>
    );
  };
  const getCriticalPath = () => {
    return (
      <div style={{ color: "red" }}>
        {criticalPath.map((element) => (
          <span key={element}>
            <span style={{ color: "Blue" }}>
              <strong> ➜ </strong>
            </span>
            <span style={{ color: "red" }}>{element} </span>
          </span>
        ))}{" "}
      </div>
    );
  };

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
              {
                <td style={{ color: "blue" }}>
                  {value.predecessors.map((pred) => (
                    <span key={pred}>{pred}, </span>
                  ))}{" "}
                </td>
              }
              <td>{value.earliestStart}</td>
              <td>{value.latestStart}</td>
              <td>{value.earliestFinish}</td>
              <td>{value.latestFinish}</td>
              <td></td>
              <td className="negative">
                {value.earliestFinish == value.latestFinish ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {criticalPath.length !== 0 ? (
        <div>
          <div className="info">
            Durée totale du projet:{getProjectDuration()}
          </div>
          <div className="info">
            Le chemin critique est :{getCriticalPath()}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Results;
