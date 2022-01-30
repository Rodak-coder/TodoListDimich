import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]);

    let removeTodolist = (todolistId:string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist);
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    function changeTodoListTitle (id:string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todolists]);
        }
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Katya', isDone: true},
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Stone', isDone: true},
            {id: v1(), title: 'Storm', isDone: true},
        ]
    });

    function addTodolist(title: string){
        let todolist: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
        [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map((tl) => {

                        let taskForTodoList = tasksObj[tl.id];

                        if (tl.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone === true);
                        }
                        if (tl.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone === false);
                        }

                        return <TodoList key={tl.id}
                                         id={tl.id}
                                         title={tl.title}
                                         tasks={taskForTodoList}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         changeTaskStatus={changeStatus}
                                         changeTaskTitle={changeTaskTitle}
                                         filter={tl.filter}
                                         removeTodolist={removeTodolist}
                                         changeTodoListTitle={changeTodoListTitle}
                        />
                    }
                )
            }

        </div>
    );
}


export default App;
