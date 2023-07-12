import styled from "@emotion/styled";
import styles from "../../styles/variables";
import TaskItem from "./TaskItem";
import { Button } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../../store/store";
import TaskPanelHeader from "./TaskPanelHeader";

const selector = (state) => ({
    tasks: state.tasks
});

export default function TasksPanel() {
    const { tasks } = useStore(selector, shallow);
    const [isAddTaskModalOpen, setIsTaskModalOpen] = useState(false);
    return (
        <PanelWrapper>
            <TaskPanelHeader/>
            <div className="tasksSection">
                <div className="header">
                    <strong>Tâche</strong>
                    <strong style={{ marginLeft: '40px' }}>Durée</strong>
                    <strong style={{ marginLeft: '50px' }}>Antécédant(s)</strong>
                </div>
                <div className="tasks">
                    {
                        tasks.map((task, i) => {
                            return (
                                <TaskItem
                                    taskName={task.name}
                                    duration={task.duration}
                                    previousTasks={task.predecessors}
                                    key={i}
                                />
                            )
                        })
                    }
                </div>
                <Button
                    colorScheme='blue'
                    variant='outline'
                    width={'100%'}
                    style={{ marginTop: '30px' }}
                    leftIcon={<BsPlusSquare style={{ fontSize: '20px' }} />}
                    onClick={() => { setIsTaskModalOpen(true) }}
                >
                    NOUVELLE TACHE
                </Button>
                <AddTaskModal isOpen={isAddTaskModalOpen} setIsOpen={setIsTaskModalOpen} />
            </div>
        </PanelWrapper>
    );
}

const PanelWrapper = styled.div`
    width: 450px;
    background-color: white;
    height: 100%;
    box-shadow: -2px 0px 19px rgba(0, 0, 0, 0.09);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    .header{
        max-width: 400px;
        display: flex;
        font-size: 14px;
        padding-left: 30px;
    }
    .tasksSection{
        padding-left: ${styles.sizes.taskPanelPx};
        padding-right: ${styles.sizes.taskPanelPx};
        padding-bottom: 40px;
        padding-top: 30px;
        height: 100%;
        overflow-y: auto;
    }
`;