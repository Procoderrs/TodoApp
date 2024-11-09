import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id)
    setTodo(t.todo)
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = {
        id: uuidv4(),
        todo,
        isCompleted: false,
        timestamp: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} , ${new Date().toLocaleDateString()}`, // Time first, then date
      };
      setTodos([...todos, newTodo]);
      setTodo("");
      saveToLS();
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    const index = todos.findIndex(item => item.id === id)
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="todolist mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-[#f7f8ff] min-h-[100vh] md:w-[50%]">
        <h1 className='font-black text-[#666978] text-center text-3xl'>TODO LIST</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-medium bg-[#616fed] max-w-40 text-center p-2 rounded-md text-white'>Add Task</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-[#616fed] mx-2 rounded-full p-6 py-2 text-lg font-bold text-white'>Save</button>
          </div>
        </div>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold text-[#666978] p-2'>Your Todos</h2>

        <div className='bg-[#ebecf5] p-6 rounded-3xl'>
          <div className="todos">
            {todos.length === 0 && <div className='m-5 text-xl font-bold  text-[#666978] text-center'>No Todos to display</div>}
            {todos.map(item => (
              <div key={item.id} className="todo flex my-3 justify-between p-4 bg-white rounded-md text-lg">
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-5'>
                    <input className='checkbox ' type="checkbox"
                      name={item.id} onChange={handleCheckbox} checked={item.isCompleted}  />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className='text-lg text-gray-500'>
                     {item.timestamp}
                  </div>
                </div>
                <div className="buttons flex h-full  p-4">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-slate-200 p-3 py-1 text-xl font-bold rounded-md mx-1 text-[#666978]'><FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-slate-200 p-3 py-1 text-xl font-bold text-[#666978] rounded-md mx-1'><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
