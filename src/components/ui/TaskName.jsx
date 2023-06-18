import styled from "@emotion/styled";
import styles from "../../styles/variables";

export default function TaskName({taskName}){
    return (
        <TaskNameWrapper>
            {taskName}
        </TaskNameWrapper>
    )
}

const TaskNameWrapper = styled.span`
    background-color: ${styles.colors.blue1};
    color: white;
    font-weight: bold;
    width: 31px;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;