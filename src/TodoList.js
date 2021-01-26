import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
    let [task, setTask] = useState([]);
    let [inputValor, setinputValor] = useState('');

    //Aqui se añade las tareas al arraeglo task
    const addTask = () => {
        if (inputValor !== '') {
            setTask(task.concat(inputValor));
            document.getElementById("prueba").value = '';
        }
    }

    //Aqui se actualizan los datos del usuario
    const hacerPUT = () => {
        let data = [];
        for (let i = 0; i < task.length; i++) {
            data[i] =
            {
                "label": task[i],
                "done": false
            };
        }
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/Marisleidis84`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                resp.json()
            })
            .then(data => {
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Aqui se elimina una tarea
    const trash = y => {
        const newTasks = [...task];
        newTasks.splice(y, 1);
        setTask(task = newTasks);
        console.log(newTasks)
        console.log(task)
        hacerPUT()
    }
    //Aqui se elimina el sario
    const eliminarUsuario = () => {

        fetch(`https://assets.breatheco.de/apis/fake/todos/user/Marisleidis84`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is were your code should start after the fetch finishes
                console.log(data); //this will print on the console the exact object received from the serve
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }

    return (
        <>
            <div className='container d-flex justify-content-center'>
                <div className='row'>
                    <div className='col-md-12'>
                        <input id='prueba' onChange={(e) => setinputValor(inputValor = e.target.value)} />
                        <button type='button' onClick={addTask} >Agregar </button>
                    </div>
                </div>
            </div>
            <div className='container d-flex justify-content-start'>
                <div className='row'>
                    <div className='col-md-12'>
                        <ul>
                            {
                                task.length > 0 &&
                                task.map((valor, i) => {
                                    return (
                                        <div className='row border'>
                                            <li id="task" key={i} className="list-group-item border-0">{valor}</li>
                                            <i className='fas fa-trash-alt mt-3 ml-4 mr-4' onClick={() => trash(i)} style={{ cursor: 'pointer' }}></i>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='container d-flex justify-content-center'>
                        <button className='justify-content-center' type='button' onClick={hacerPUT} >Actalizar Tareas </button>
                        <button className='justify-content-center' type='button' onClick={eliminarUsuario} >Eliminar Usario </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;