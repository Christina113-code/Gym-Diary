
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import './App.css'
import ExerciseList from './ExerciseList'
import ExerciseForm from './ExerciseForm'
import { Button, Modal } from 'react-bootstrap';



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

  // TODO: 
  return (
    <>
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
