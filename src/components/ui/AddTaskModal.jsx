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
  Select
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';


export default function AddTaskModal({ isOpen, setIsOpen }) {
  const [taskName, setTaskName] = useState("");
  const [taskDuration, setTaskDuration] = useState(1);
  const [previousTasks, setPreviuousTasks] = useState([]);
  const handleModalOnClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalOnClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle tache</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <ModalWrapper>
              <form action="">
                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel width={'150px'}>Nom</FormLabel>
                  <Input 
                    type='text' 
                    size={'sm'} 
                    required 
                    variant={'filled'} 
                    value={taskName}
                    onChange={(e) => {setTaskName(e.target.value)}}
                    />
                </FormControl>

                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel width={'150px'}>Durée</FormLabel>
                  <Input 
                    type='number' 
                    size={'sm'} 
                    placeholder='2 jours' 
                    required 
                    variant={'filled'} 
                    value={taskDuration}
                    onChange={(e) => {setTaskDuration(e.target.value)}}
                    />
                </FormControl>

                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel width={'150px'}>Antécédant(s)</FormLabel>
                  <Select size={'sm'} placeholder='Nouvel antécédant' required variant={'filled'}>
                    <option value="debut">Début</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </Select>
                </FormControl>
              </form>
            </ModalWrapper>

          </ModalBody>
          <ModalFooter>
            <Button variant='outline' mr={3} onClick={handleModalOnClose}>
              Annuler
            </Button>
            <Button  colorScheme='blue'>Ajouter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ModalWrapper = styled.div`
  form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;