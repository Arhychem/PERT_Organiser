import styled from "@emotion/styled";
import styles from "../../styles/variables";
import { MdDragHandle } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi"
import TaskName from "./TaskName";
import PreviousTaskName from "./PreviousTaskName";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'

export default function TaskItem({ taskName, duration, previousTasks }) {
    return (
        <TaskItemWrapper>
            <div className="left">
                <div className="dragHandle">
                    <MdDragHandle />
                </div>
                <div className="taskName">
                    <TaskName taskName={taskName} />
                </div>
            </div>
            <div className="duration">
                <strong>{duration} j</strong>
            </div>
            <div className="previous">
                {
                    previousTasks.map((task, i) => {
                        return <PreviousTaskName taskName={task} key={i} />
                    })
                }
            </div>
            <Menu className="menu">
                <MenuButton className="menuButton" as={Button} size='xs' fontSize={'md'} variant={'ghost'}>
                    <HiDotsVertical />
                </MenuButton>
                <MenuList className="menuList">
                    <MenuItem>Modifier</MenuItem>
                    <MenuItem color={'red'}>Supprimer</MenuItem>
                </MenuList>
            </Menu>
        </TaskItemWrapper>
    )
}

const TaskItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${styles.colors.nodeStroke};
    min-height: 45px;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 10px;
    padding: 5px;
    color: ${styles.colors.gray3};
    &>*{
        /* border: 1px solid red; */
        text-align: center;
    }
    .left{
        display: flex;
        align-items: center;
        justify-content: left;
        .dragHandle{
            width: 20px;
            font-size: 17px;
            line-height: 17px;
            opacity: .7;
            /* border: 1px solid red; */
        }
        .taskName{
            width: 50px;
            text-align: initial;
            margin-left: 5px;
        }
    }
    .duration{
        width: 50px;
        font-size: 14px;
    }
    .previous{
        width: 100px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-left: 30px;
    }
    .marge{
        width: 100px;
        font-size: 14px;
    }
    .menuList{
        min-width: 130px;
    }
    
`;