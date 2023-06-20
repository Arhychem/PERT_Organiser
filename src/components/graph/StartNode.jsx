import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from 'styled-components';
import styles from '../../styles/variables';
import { BsStarFill } from 'react-icons/bs'

export default function StartNode({ id, data }) {
  const { earliestDate, latestDates } = data;
  return (
    <NodeWrapper>
      <div className="title">
        <BsStarFill />
        <strong>début</strong>
      </div>
      <div className="plusTot">
        <strong>{earliestDate || 0}</strong>
      </div>
      <div className="plusTardList">
        {
          latestDates.map((date, i) => {
            return (
              <div className="plusTard" key={i}>
                <strong>{date}</strong>
                <Handle
                  type='source'
                  className='handle source'
                  position={Position.Right}
                  id={`${id}-${i}`}
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
    border: 2px solid #ff8800;
    width: 126px;
    min-height: 70px;
    border-radius: 15px;
    background-color: ${styles.colors.orange};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: all .2s;
    color: white;
    &:hover{
        border-color: ${styles.colors.purple};
        box-shadow: 0px 4px 12px rgba(179, 70, 7, 0.253);
    }
    .title{
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        position: absolute;
        top: 5px;
        left: 18px;
        display: flex;
        align-items: center;
        strong{
            margin-left: 5px;
        }
    }
    .handle{
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