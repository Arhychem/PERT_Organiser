import styled from "@emotion/styled";
import styles from "../../styles/variables"
import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from 'reactflow';

export default function TaskEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data
}) {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition
    });

    const {name, duration, isFictif} = data;

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    strokeWidth: 2,
                    stroke: isFictif ? styles.colors.nodeStroke : '#1C73C4',
                }} />
            <EdgeLabelRenderer>
                <EdgeLabelWrapper
                    className="nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`
                    }}
                >
                    <div className="taskDetails" style={{
                        backgroundColor: isFictif ? 'white' : styles.colors.blue1,
                        color: isFictif ? styles.colors.bodyColor : 'white',
                        border: isFictif ? `2px solid ${styles.colors.nodeStroke}` : 'none',
                        justifyContent: isFictif ? 'center' : 'space-between'
                    }}>
                        {!isFictif && <span className="taskName">{name == 'Fin' ? "" : name}</span>}
                        <span className="taskDuration">{duration || 0}</span>
                    </div>
                </EdgeLabelWrapper>
            </EdgeLabelRenderer>
        </>
    );

}

const EdgeLabelWrapper = styled.div`
    position: absolute;
    pointer-events: all;
    .taskDetails{
        height: 28px;
        min-width: 60px;
        border-radius: 30px;
        background-color: ${styles.colors.blue1};
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
`;