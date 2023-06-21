import styled from "@emotion/styled";
import styles from "../../styles/variables";
import TaskItem from "./TaskItem";
import { Button } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../../store/store";

const selectore = (state) => ({
    tasks: state.tasks
});

export default function TasksPanel() {
    const { tasks } = useStore(selectore, shallow);
    console.log(tasks);
    // const tasks = [];
    const [isAddTaskModalOpen, setIsTaskModalOpen] = useState(false);
    return (
        <PanelWrapper>
            <div className="title">
                <h1>CPM</h1>
            </div>
            <div className="tasksSection">
                <div className="header">
                    <strong>Tâche</strong>
                    <strong style={{ marginLeft: '30px' }}>Durée</strong>
                    <strong style={{ marginLeft: '30px' }}>Antécédant(s)</strong>
                    <strong style={{ marginLeft: '50px' }}>Marge</strong>
                </div>
                <div className="tasks">
                    {
                        tasks.map((task, i) => {
                            return (
                                <TaskItem
                                    taskName={task.name}
                                    duration={task.duration}
                                    previousTasks={task.predecessor}
                                    marge={2}
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
    width: 500px;
    background-color: white;
    height: 100%;
    box-shadow: -2px 0px 19px rgba(0, 0, 0, 0.09);
    flex-shrink: 0;
    .title{
        border-bottom: 1px solid ${styles.colors.gray4};
        padding-left: ${styles.sizes.taskPanelPx};
        padding-right: ${styles.sizes.taskPanelPx};
        height: 50px;
        display: flex;
        align-items: center;
        h1{
            font-size: 24px;
            color: ${styles.colors.blue1};
            font-weight: bold;
        }
    }
    .header{
        max-width: 400px;
        display: flex;
        font-size: 14px;
        padding-left: 30px;
    }
    .tasksSection{
        padding-left: ${styles.sizes.taskPanelPx};
        padding-right: ${styles.sizes.taskPanelPx};
        padding-top: 30px;
    }
`;