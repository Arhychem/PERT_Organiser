import styled from "@emotion/styled";
import styles from "../../styles/variables";
import { Button } from "@chakra-ui/react";
import { GrGraphQl } from "react-icons/gr";
import useStore from "../../store/store";
import { shallow } from "zustand/shallow";
import { HiOutlineSave } from "react-icons/hi";
import { findCriticalPath, createPERT } from "../../store/processing";
import { parseBadTasks } from "../../store/parser";
import { useGlobalContext } from "./context";

const selector = (state) => ({
  isTasksEdited: state.isTasksEdited,
  setIsTasksEdited: state.setIsTasksEdited,
  tasks: state.tasks,
  calculateGraph: state.calculateGraph,
  loadFromLocalStorage: state.loadFromLocalStorage,
});

export default function TaskPanelHeader() {
  const {
    isTasksEdited,
    setIsTasksEdited,
    tasks,
    calculateGraph,
    loadFromLocalStorage,
  } = useStore(selector);
  const {setFinalTasks,setCriticalPath } = useGlobalContext();
  const handleGenerate = () => {
    setIsTasksEdited(false);
    console.log(JSON.stringify(tasks));
    console.log("Initial tasks", tasks);
    const goodtasks = parseBadTasks(tasks);
    console.log("formated tasks tasks", goodtasks);
    const myTasks = createPERT(goodtasks);
    console.log("pert network", myTasks);
    setFinalTasks(myTasks);
    const path = findCriticalPath(myTasks);
    console.log("Path: ", path);
    setCriticalPath(path);
    /*  calculateGraph().then(res => {
      console.log("vita");
    }) */
  };
  return (
    <Wrapper>
      <h1>CPM</h1>
      <div className="right">
        <Button
          colorScheme="gray"
          variant="solid"
          isDisabled={false}
          onClick={loadFromLocalStorage}
        >
          <HiOutlineSave />
        </Button>
        <Button
          leftIcon={<GrGraphQl />}
          colorScheme="purple"
          variant="solid"
          isDisabled={false}
          onClick={handleGenerate}
        >
          Générer
        </Button>
      </div>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  border-bottom: 1px solid ${styles.colors.gray4};
  padding-left: ${styles.sizes.taskPanelPx};
  padding-right: ${styles.sizes.taskPanelPx};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 24px;
    color: ${styles.colors.blue1};
    font-weight: bold;
  }
  .right {
    display: flex;
    gap: 10px;
  }
`;
