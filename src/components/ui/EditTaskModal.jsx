import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useStore from '../../store/store';
import PreviousTaskName from './PreviousTaskName';

const selector = (state) => ({
  existingTasks: state.tasks,
  setIsTasksEdited: state.setIsTasksEdited,
  saveToLocalStorage: state.saveToLocalStorage,
  editTask: state.editTask,
})


export default function EditTaskModal({ isOpen, setIsOpen, taskToEdit }) {
  const [taskName, setTaskName] = useState("");
  const [taskDuration, setTaskDuration] = useState(1);
  const [previousTasks, setPreviousTasks] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const { existingTasks, addTask, setIsTasksEdited, saveToLocalStorage, editTask } = useStore(selector);
  const [tasks, setTasks] = useState([{
    edgeId: 'Deb',
    name: 'Deb',
  }]);
  useEffect(() => {
    if (taskToEdit) {
      const task = existingTasks.find(t => t.name == taskToEdit);
      setTaskName(task.name);
      setTaskDuration(task.duration);
      setPreviousTasks(task.predecessors);
      setTasks([
        ...existingTasks.filter(t => (t.name != taskToEdit && !task.predecessors.includes(t.name)))
      ])
    }
  }, [isOpen])
  const toast = useToast();

  const handleModalOnClose = () => {
    setIsOpen(false);
    resetForm();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      duration: taskDuration,
      predecessors: previousTasks
    }
    editTask(taskToEdit, newTask);
    toast({
      title: 'Tache modifiée',
      status: 'success',
    });
    setIsOpen(false);
    resetForm();
    setIsTasksEdited(true);
    saveToLocalStorage();
  }

  const resetForm = () => {
    setTaskName("");
    setTaskDuration(1);
    setPreviousTasks([]);
    setTasks([{
      edgeId: 'Deb',
      name: 'Deb',
      duration: 0,
      predecessors: [],
    },
    ...existingTasks])
  }
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setPreviousTasks(old => [...old, selected]);
    // setSelectValue("");
    setTasks(tasks.filter(task => (task.name != selected && task.name != 'Deb')));
  }

  useEffect(() => {
    if (previousTasks.length == 0 && tasks[0].name != 'Deb') {
      setTasks([{
        edgeId: 'Deb',
        name: 'Deb',
      }, ...tasks])
    }
  }, [previousTasks])

  const removePreviousTask = (taskToRemove) => {
    setPreviousTasks(previousTasks.filter(t => t != taskToRemove));
    if (taskToRemove == 'Deb' || previousTasks.length == 0) {
      setTasks(old => [{ name: 'Deb' }, ...old]);
    } else {
      setTasks(old => [...old, { name: taskToRemove }]);
    }

  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalOnClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier une tache</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>

              <ModalWrapper>
                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel width={'190px'}>Nom</FormLabel>
                  <Input
                    type='text'
                    size={'sm'}
                    required
                    variant={'filled'}
                    value={taskName}
                    onChange={(e) => { setTaskName(e.target.value) }}
                  />
                </FormControl>

                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel width={'190px'}>Durée</FormLabel>
                  <Input
                    type='number'
                    size={'sm'}
                    placeholder='2 jours'
                    required
                    variant={'filled'}
                    value={taskDuration}
                    onChange={(e) => { setTaskDuration(e.target.value) }}
                  />
                </FormControl>

                <FormControl className='selectFormControl' display={'flex'} alignItems={'center'}>
                  <FormLabel width={'190px'}>Antécédant(s)</FormLabel>
                  <div className='right'>
                    <Select
                      size={'sm'}
                      placeholder='Nouvel antécédant'
                      required={previousTasks.length < 1}
                      disabled={previousTasks.length > 0 && previousTasks[0] == 'Deb'}
                      variant={'filled'}
                      value={selectValue}
                      onChange={handleSelectChange}
                    >
                      {
                        tasks.map((task, i) => {
                          return (
                            <option value={task.name} key={i}>{task.name}</option>
                          )
                        })
                      }
                    </Select>
                    <div className="previousTasks">

                      {
                        previousTasks.map((task, i) => {
                          return <Tag
                            size='lg'
                            key={i}
                            borderRadius='full'
                            variant='subtle'
                            colorScheme='purple'
                          >
                            <PreviousTaskName taskName={task} />
                            <TagCloseButton onClick={() => removePreviousTask(task)} />
                          </Tag>
                        })
                      }
                    </div>
                  </div>
                </FormControl>
              </ModalWrapper>

            </ModalBody>
            <ModalFooter>
              <Button variant='outline' mr={3} onClick={handleModalOnClose}>
                Annuler
              </Button>
              <Button colorScheme='blue' type='submit'>Modifier</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .selectFormControl{
    align-items: start;
    .right{
      width: 100%;
      .previousTasks{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
  }
`;