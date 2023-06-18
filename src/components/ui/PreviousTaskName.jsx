import styled from "@emotion/styled";
import styles from "../../styles/variables";

export default function PreviousTaskName({taskName}) {
    return (
        <PreviousTaskNameWrapper>
            {taskName}
        </PreviousTaskNameWrapper>
    );
}

const PreviousTaskNameWrapper = styled.span` 
    background-color: ${styles.colors.purple};
    color: white;
    font-weight: bold;
    font-size: 14px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;
