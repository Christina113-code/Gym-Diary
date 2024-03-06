
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import './App.css'
import ExerciseList from './Components/ExerciseList'
import ExerciseForm from './Components/ExerciseForm'
import { Button, Form, Modal } from 'react-bootstrap';



function App() {
  const [exercises, setExercises] = useState([])
  const [show, setShow] = useState(false)
  const [currentExercise, setCurrentExercise] = useState({})

  useEffect(()=>{
    fetchExercises()
  },[])
  
  const fetchExercises = async () =>{
    const res = await fetch('http://127.0.0.1:5000/exercises')
    const data = await res.json()
    console.log('fetching')
    setExercises(data.exercises)
    
  }
  
  const closeModal = () =>{
      setShow(false)
      setCurrentExercise({})
  }

  const openCreateModal = () =>{
      if(!show) setShow(true)
  }

  const openEditModal = (ex) =>{
      if(show) return
      setCurrentExercise(ex)
      console.log(currentExercise.name)
      setShow(true)
  }
  const onUpdate = () =>{
    closeModal()
    fetchExercises()
  }

  const filterByMG = (cat) =>{
    // optimize later idc 
    // fetchExercises()
    console.log('filtering')
    setExercises(prevExercises => prevExercises.filter(ex => ex.mgroup == cat))
  }
  // TODO: 
  return (
    <>
     <h1>My Gym Journal</h1>
        {/* Filters */}
        <h4>Search:</h4>
        <Form.Select onChange={(e) => filterByMG(e.target.value)}>
        <option>Muscle Group</option>
                <option value={'Quads'}>Quads</option>
                <option onChange={e=>setmgroup(e.target.value)}value={'Glutes'}>Glutes</option>
                <option onChange={e=>setmgroup(e.target.value)}value={'Chest'}>Chest</option>
                <option onChange={e=>setmgroup(e.target.value)}value={'Back'}>Back</option>
                <option onChange={e=>setmgroup(e.target.value)}value={'Triceps'}>Triceps</option>
                <option onChange={e=>setmgroup(e.target.value)}value={'Biceps'}>Biceps</option>
                
                <option onChange={e=>setmgroup(e.target.value)}value={'Cardio'}>Cardio</option>

        </Form.Select>
        <p>Date Range: to be implemented </p>   
        <p>PRs: also tbi</p>
     <ExerciseList exercises={exercises} updateExercise={openEditModal} updateCallback={onUpdate}/>
     <Button onClick={openCreateModal}>Create New Exercise</Button>
     
      <Modal show={show}onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ExerciseForm existingExercise={currentExercise} updateCallback={onUpdate}/>

        </Modal.Body>
      </Modal>

  
      
      

    

    </>
  )
}

export default App
