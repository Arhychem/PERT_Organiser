import React from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from 'styled-components';
import useStore from '../store/store';

export default function TextUpdaterNode({ id, data }) {
    const updateNodeColor = useStore((state) => state.updateNodeColor)
    const onChange = (e) => {
        console.log(e.target.value);
    }

    const handleColorChange = (e) => {
        updateNodeColor(id, e.target.value);
    }
    return (
        <NodeWrapper style={{borderColor: data.color || '#834DF0'}}>
            <Handle type='target' position={Position.Left} className='handle target left' />
            <Handle type='target' position={Position.Top} id="c" className='handle target top' />
            <div>
                <label htmlFor="text">Text:</label>
                <input type="text" name="text" id="text" onChange={onChange} className='nodrag' />
                <strong>{data.label}</strong>
                <p>
                    value: {data.nb}
                </p>
                <input type="color" name="color" onChange={handleColorChange}/>
            </div>
            <Handle type='source' position={Position.Right} id='a' className='handle right' />
            <Handle type='source' position={Position.Bottom} id='b' className='handle bottom' />
        </NodeWrapper>
    )
}

const NodeWrapper = styled.div`
    border-radius: 7px;
    border: 2px solid #834DF0;
    background-color: #F9F6FE;
    min-height: 90px;
    width: 150px;
    color: black;
    padding: 10px;
    font-size: 14px;
    *{
        box-sizing: border-box;
    }
    .handle{
        width: 12px;
        height: 12px;
        background-color: white;
        border: 2px solid orange;
        &.left{
            left: -6px;
        }
        &.right{
            right: -6px;
        }
        &.bottom{
            bottom: -6px;
        }
        &.top{
            bottom: -6px;
        }
        &.target{
            border-color: orange;
        }
        &.source{
            border-color: green;
        }
    }
    &>div{
        label{
            font-weight: bold;
        }
        input{
            width: 100%;
            background-color: white;
            border: 1px solid #834DF0;
            outline: 0;
            border-radius: 5px;
            color: black;
            height: 30px;
            padding: 0 5px;
        }
    }
`;