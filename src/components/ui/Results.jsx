import React, { useEffect } from "react";
import "../ui/stylesheets/resultStylesheet.css";
import { useGlobalContext } from "./context";
const Results = () => {
  const { finalTasks, setFinalTasks } = useGlobalContext();
    useEffect(()=>{
        console.log(finalTasks);
    },[finalTasks])
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
          <tr>
            <td>T1</td>
            <td>5</td>
            <td>T2</td>
            <td>15</td>
            <td>17</td>
            <td>20</td>
            <td>20</td>
            <td>-3</td>
            <td className="negative">-3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
