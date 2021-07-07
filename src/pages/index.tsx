import Head from "next/head";
import { FormEvent, useState } from "react";

type TodoItem = {
  name: string;
  isCompleted?: boolean;
};

export default function Home() {
  const [tasks, setTaskList] = useState<TodoItem[]>([]);
  const [taskName, setTaskName] = useState("");

  function handleAddToDo(event: FormEvent) {
    event.preventDefault();

    if (taskName === "") {
      alert("Um item não pode ser adicionado sem um título");
    }

    const newTodo: TodoItem = {
      name: taskName,
      isCompleted: false,
    };

    const newtasks = [...tasks, newTodo];

    setTaskList(newtasks);

    setTaskName("");
  }

  function toggleCompleteToDo(taskIndex: number) {
    const updatedTasks = tasks.map((item, index) => {
      if (index === taskIndex) {
        return { ...item, isCompleted: !item.isCompleted };
      }

      return item;
    });

    setTaskList(updatedTasks);

    const task = tasks[taskIndex];

    alert(`Você concluiu a tarefa: ${task.name}!! Parabéns!!`);
  }

  function deleteTask(taskIndex: number) {
    const updatedTasks = [...tasks];

    updatedTasks.splice(taskIndex, 1);

    setTaskList(updatedTasks);

    alert("Um item foi deletado com sucesso");
  }

  return (
    <>
      <Head>
        <title>Todo SENAI</title>
      </Head>

      <main>
        <div>
          <h1>Todo List</h1>

          <form onSubmit={handleAddToDo}>
            <input
              id="todo"
              name="todo"
              required
              value={taskName}
              onChange={(event) => setTaskName(event.target.value.trimStart())}
            />

            <button type="submit">Adicionar Todo</button>
          </form>

          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input
                  id={`item-${index}`}
                  name="isCompleted"
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleCompleteToDo(index)}
                />
                <label htmlFor={`item-${index}`}>{task.name}</label>

                {!task.isCompleted && (
                  <button type="button" onClick={() => deleteTask(index)}>
                    Deletar
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
