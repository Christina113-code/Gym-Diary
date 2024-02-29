import React, { useState } from 'react'
import {FaTrashCan} from 'react-icons/fa6'
import Table from 'react-bootstrap/Table'
import { Button, Form } from 'react-bootstrap'
const ExerciseList = ({exercises, updateExercise, updateCallback}) => {

    


   const onDelete = async (id) =>{
        try{
            const options = {
                method: 'DELETE'
            }
            const res = await fetch(`http://127.0.0.1:5000/delete_exercise/${id}`,options)
            if (res.status === 200){
                updateCallback()
            }else{
                console.error('failed to delete')
            }
        
        
        } catch(error){
            alert(error)
        }  

    }
  return (
    <div>
       
        



        <Table striped hover bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Sets</th>
                    <th>Weight</th>
                    <th>Date</th>
                    <th>Muscle Group</th>

                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise=>(
                    <tr key={exercise.id}>
                        <td>{exercise.name}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.weight}</td>
                        <td>{exercise.date}</td>
                        <td>{exercise.mgroup}</td>
                        <td>
                            <Button onClick={()=>updateExercise(exercise)}>Edit</Button>
                            <span style={{'padding':'.2rem'}}></span>
                            <Button onClick={()=>onDelete(exercise.id)}><FaTrashCan/></Button>
                            
                        </td>
                       
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default ExerciseList