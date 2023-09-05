import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import {useEffect, useState} from 'react'
import Auth from './components/Auth'
import {useCookies} from 'react-cookie'

const App = () => {

  const [cookies, setCookie, removeCookies] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [ tasks, setTasks] = useState(null)

  const getData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken){
      getData()
    }
  }, [])

  console.log(tasks)

  //Sort by Date

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (


    <div className="app" style={{alignItems : !authToken ? 'center' : 'flex-start'}}>


    {!authToken && <Auth/>} 

      {authToken &&

      <div className='main-card'> 
      <ListHeader listName={'To Do List'} getData={getData} />
      <p className='user-email'> Welcome Back, <span className='bold'>{userEmail}</span> </p>
     <div className='todo_list'> {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)} </div>
      </div>}
      
    </div>
  )
}

export default App
