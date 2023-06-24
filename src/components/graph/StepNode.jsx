import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from 'styled-components';
import styles from '../../styles/variables';

export default function StepNode({ id, data }) {
  const { earliestDate, latestDates } = data;
  return (
    <NodeWrapper>
      <Handle type='target' className='handle target' position={Position.Left} />
      <div className="plusTot">
        <strong>{earliestDate || 0}</strong>
      </div>
      <div className="plusTardList">
        {
          Object.keys(latestDates).map((key, i) => {
            return (
              <div className="plusTard" key={i}>
                <strong>{latestDates[key]}</strong>
                <Handle 
                  type='source' 
                  className='handle source' 
                  position={Position.Right} 
                  id={`${key}`} 
                  style={{
                    // top: 
                  }}
                  />
              </div>
            )
          })
        }
      </div>
    </NodeWrapper>
  )
}

const NodeWrapper = styled.div`
    border: 2px solid ${styles.colors.nodeStroke};
    width: 126px;
    min-height: 70px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: all .2s;
    &:hover{
        border-color: ${styles.colors.purple};
        box-shadow: 0px 4px 12px rgba(115, 15, 123, 0.15);
    }
    .handle{
        &.target{
            width: 9px;
            height: 8px;
            background-color: ${styles.colors.orange};
            border-radius: 0px 10px 10px 0px;
            left: 0;
            border: none;
            border-left: 1px solid white;
        }
        &.source{
            width: 9px;
            height: 9px;
            border: 2px solid ${styles.colors.green};
            background-color: white;
        }
    }
    .plusTot{
        margin-left: 5px;
        strong{
            font-size: 20px;
        }
    }
    .plusTardList{
      /* border: 1px solid red; */
      .plusTard{
        position: relative;
        text-align: right;
        .handle{
          right: -16px;
        }
      }
    }
`;