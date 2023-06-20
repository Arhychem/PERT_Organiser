import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from 'styled-components';
import styles from '../../styles/variables';
import {TbFlagFilled} from 'react-icons/tb'

export default function EndNode({ id, data }) {
    return (
        <NodeWrapper>
            <div className="title">
                <TbFlagFilled className='icon'/>
                <strong>fin</strong>
            </div>
            <Handle type='target' className='handle target' position={Position.Left} />
            <div className="plusTot">
                <strong>{data.earliestDate || 0}</strong>
            </div>
        </NodeWrapper>
    )
}

const NodeWrapper = styled.div`
    border: 2px solid #13b105;
    width: 80px;
    min-height: 70px;
    border-radius: 15px;
    background-color: ${styles.colors.greenHover};
    box-shadow: 0px 4px 12px rgba(3, 204, 3, 0.425);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: all .2s;
    color: white;
    &:hover{
        border-color: ${styles.colors.orange};
        box-shadow: 0px 4px 12px rgba(10, 173, 10, 0.15);
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
        .icon{
            font-size: 14px;
        }
        strong{
            margin-left: 5px;
        }
    }
    .handle{
        &.target{
            width: 10px;
            height: 10px;
            background-color: ${styles.colors.orange};
            border-radius: 0px 10px 10px 0px;
            left: 0;
            /* border: none; */
            border: 2px solid white;
            border-left: none;
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
`;