import {useState} from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar'



const ListItem = ({task, getData}) => {
  const[showModal, setShowModal] = useState(false)
  const [checked, setChecked] = useState(false)


  const handleCheck = () => {
    setChecked(!checked)
  }

  const deleteItem = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method:'DELETE'})
      if(response.status === 200) {
        getData()
      }
    }catch (err) {
      console.error(err)
    }
  }
    return (


      <div>
 
      <li className="list-item">

        <div className="info-container">

          <input onChange={handleCheck} className="checkbox" type='checkbox'/>

          <label className="task-title" style={{textDecoration: checked ? 'line-through' : 'none'}}> {task.title} </label> 
          
        </div>

        
        <div className='button-container'>

          <button className='edit' onClick={() => setShowModal(true)}> EDIT </button>
          <button className='delete' onClick={deleteItem}> DELETE </button>

        </div>  

        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} /> }
        
      </li>


     </div>

    )
  }
  
  export default ListItem
  