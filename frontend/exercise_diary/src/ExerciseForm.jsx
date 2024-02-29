import { Button, Form } from "react-bootstrap"
import { useState } from "react"
const ExerciseForm = ({existingExercise={},updateCallback}) => {
    const todays_date = new Date().toISOString().substring(0,10)

    const [name, setName] = useState(existingExercise.name || '')
    const [sets,setSets] = useState(existingExercise.sets || 1)
    const [reps, setReps] = useState(existingExercise.reps || 1)
    const [weight, setWeight] = useState(existingExercise.weight || 10)
    const [date, setDate] = useState(existingExercise.date ||todays_date)
    const [type, settype] = useState(existingExercise.type ||'')
    // If object is not empty we are updating
    const updating = Object.entries(existingExercise).length !==0

    
    // Change date formatting later 

    const onSubmit = async (e) => {
        e.preventDefault()

        const data ={
            name,
            sets,
            reps,
            weight,date,type
        }
        //Add updating later 
        const url = 'http://127.0.0.1:5000/' + (updating? `update_exercise/${existingExercise.id}`: 'create_exercise')

        const options={
            method: updating? 'PUT':'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const res = await fetch(url, options)
        if (res.status !== 201 && res.status !==200){
            // if res unsuccessful
            const data = await res.json()
            alert(data.message)

        }else{
            updateCallback()
        }
    }

  return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name of Exercise: </label>
            <input
            required 

            type="text"
            id="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            />
             <label htmlFor="sets">sets of Exercise: </label>
            <input
            required 
            type="number"
            id="sets"
            value={sets}
            onChange={e=>setSets(e.target.value)}
            />
             <label htmlFor="reps">reps of Exercise: </label>
            <input
            required 
            type="number"
            id="reps"
            value={reps}
            onChange={e=>setReps(e.target.value)}
            />
             <label htmlFor="weight">Weight of Exercise (lbs): </label>
            <input
            required 
            type="number"
            id="weight"
            value={weight}
            onChange={e=>setWeight(e.target.value)}
            />
             <label htmlFor="date">date of Exercise: </label>
             
            <input
            required 
            type="date"
            id="date"
            value={date}
            onChange={e=>setDate(e.target.value)}
            />
            <br></br>
             <Form.Select aria-label='Select Muscle Group'>
                <option>Muscle Group</option>
                <option onChange={e=>settype(e.target.value)}value={'Quads'}>Quads</option>
                <option onChange={e=>settype(e.target.value)}value={'Glutes'}>Glutes</option>
                <option onChange={e=>settype(e.target.value)}value={'Chest'}>Chest</option>
                <option onChange={e=>settype(e.target.value)}value={'Back'}>Back</option>
                <option onChange={e=>settype(e.target.value)}value={'Arms'}>Arms</option>
                <option onChange={e=>settype(e.target.value)}value={'Cardio'}>Cardio</option>



             </Form.Select>
             
           
        </div>
    
    <Button type='submit' variant="primary">{updating? 'Update': 'Create'}</Button>
    </form>
  )
}

export default ExerciseForm