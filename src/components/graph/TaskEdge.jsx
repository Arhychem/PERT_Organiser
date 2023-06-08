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
    markerEnd
}) {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition
    })

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    strokeWidth: 2,
                    stroke: '#1C73C4',
                }} />
            <EdgeLabelRenderer>
                <EdgeLabelWrapper
                    className="nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`
                    }}
                >
                    <div className="taskDetails">
                        <span className="taskName">A</span>
                        <span className="taskDuration">35</span>
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