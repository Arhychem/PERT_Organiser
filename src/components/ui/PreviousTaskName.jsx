import styled from "@emotion/styled";
import styles from "../../styles/variables";

export default function PreviousTaskName({taskName}) {
    return (
        <PreviousTaskNameWrapper className={taskName == 'Deb' ? "deb" : ""}>
            {taskName}
        </PreviousTaskNameWrapper>
    );
}

const PreviousTaskNameWrapper = styled.span` 
    background-color: ${styles.colors.purple};
    color: white;
    font-weight: bold;
    font-size: 14px;
    min-width: 22px;
    width: max-content;
    padding-left: 3px;
    padding-right: 3px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    &.deb{
        background-color: ${styles.colors.orangeHover};
    }
`;
