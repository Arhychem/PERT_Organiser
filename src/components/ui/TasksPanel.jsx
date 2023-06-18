import styled from "@emotion/styled";
import styles from "../../styles/variables";
import TaskItem from "./TaskItem";
import { Button } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"

export default function TasksPanel() {

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
                    <TaskItem
                        taskName="A"
                        duration={12}
                        previousTasks={['A', 'B']}
                        marge={2}
                    />
                    <TaskItem
                        taskName="B"
                        duration={12}
                        previousTasks={['A']}
                        marge={1}
                    />
                </div>
                <Button 
                    colorScheme='blue' 
                    variant='outline' 
                    width={'100%'} 
                    style={{marginTop: '30px'}}
                    leftIcon={<BsPlusSquare style={{fontSize: '20px'}} />
                    }>
                    NOUVELLE TACHE
                </Button>
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