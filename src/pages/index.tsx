import { FormEvent, useState } from "react";
import Head from "next/head";
import { FiTrash } from "react-icons/fi";
import {
  useToast,
  useDisclosure,
  Button,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import styles from "../styles/pages/home.module.scss";

type TodoItem = {
  name: string;
  isCompleted?: boolean;
};

export default function Home() {
  const toast = useToast();

  const [tasks, setTaskList] = useState<TodoItem[]>([]);
  const [taskName, setTaskName] = useState("");
  const [task, setTask] = useState<number>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Push notification whan a new task is added
  const pushNewTaskNotification = () => {
    toast({
      title: `Sucesso`,
      description: `Você adicionou uma nova tarefa!!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Push notification when a task is completed
  const pushCompletedTaskNotification = (taskIndex: number) => {
    const task = tasks[taskIndex];

    toast({
      title: `Sucesso`,
      description: `Você concluiu a tarefa: ${task.name}!! Parabéns!!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Push notification when a task is completed
  const pushDeletedTaskNotification = () => {
    toast({
      title: "Sucesso",
      description: "Um item foi deletado!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Function add a task to List
  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (taskName === "") {
      alert("Um item não pode ser adicionado sem um título");

      event.stopPropagation();
    }

    const newTodo: TodoItem = {
      name: taskName,
      isCompleted: false,
    };

    const newtasks = [...tasks, newTodo];

    setTaskList(newtasks);

    setTaskName("");

    pushNewTaskNotification();
  }

  // Toggle state if a task is 0r isn't completed
  function toggleIsTaskCompleted(taskIndex: number) {
    const isCompleted = tasks[taskIndex].isCompleted;

    const updatedTasks = tasks.map((item, index) => {
      if (index === taskIndex) {
        return { ...item, isCompleted: !item.isCompleted };
      }

      return item;
    });

    setTaskList(updatedTasks);

    if (!isCompleted) {
      pushCompletedTaskNotification(taskIndex);
    }
  }

  // Delete a task by index
  function deleteTask(taskIndex: number) {
    const updatedTasks = [...tasks];

    updatedTasks.splice(taskIndex, 1);

    setTaskList(updatedTasks);
    setIsConfirmModalOpen(false);

    pushDeletedTaskNotification();
  }

  return (
    <>
      <Head>
        <title>Todo SENAI</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1>Todo List</h1>

          <div className={styles.content}>
            <form onSubmit={handleAddNewTask}>
              <input
                id="todo"
                name="todo"
                required
                value={taskName}
                onChange={(event) =>
                  setTaskName(event.target.value.trimStart())
                }
              />

              <button type="submit">Adicionar Item</button>
            </form>

            <ul>
              {tasks.length < 1 && <p>Não há nenhuma tarefa cadastrada!</p>}

              {tasks.map((task, index) => (
                <li key={index}>
                  <div className={styles.formControl}>
                    <input
                      id={`item-${index}`}
                      name="isCompleted"
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleIsTaskCompleted(index)}
                    />
                    <label htmlFor={`item-${index}`}>{task.name}</label>
                  </div>

                  {!task.isCompleted && (
                    <button
                      type="button"
                      onClick={() => {
                        setTask(index);
                        setIsConfirmModalOpen(true);
                      }}
                    >
                      <FiTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Portal>
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Você deseja deltar a tarefa?</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              Lembre-se que essa ação não pode ser desfeita, e sua tarefa será
              deltada para sempre!
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  deleteTask(task);
                }}
              >
                Deletar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  );
}
