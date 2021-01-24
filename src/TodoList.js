import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
    const [task, setTask] = useState([]);
    let [inputValor, setinputValor] = useState('');

     
    //Aqui se agrega un nevo suario
    const addTask = () => {
        let data = [{
            "label": "Hacer mercado",
            "done": false
        },
        {
            "label": "Pasear al perro",
            "done": false
        },
        {
            "label": "Limpiar la cocina",
            "done": false
        },
        {
            "label": "Sacar la basura",
            "done": false
        }];
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${inputValor}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp);
                return resp.json();
            })
            .then(data => {
                if (inputValor !== '') {
                    setTask(task.concat(inputValor));
                    data = task;
                }
                document.getElementById("prueba").value = '';
            })
            .catch(error => {
                console.log(error);
            });
    }
   
    // Aqui se elimina el suario
    const trash = y => {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${task[y]}`, {
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
            console.log(data); //this will print on the console the exact object received from the server
            const newTasks = [...task];
        newTasks.splice(y, 1);
        setTask(newTasks);
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
                </div>
            </div>
        </>
    )
}

export default TodoList;