from flask import request, jsonify
from config import app, db
from models import Exercise
from flask_cors import cross_origin
@app.route('/exercises',methods=['GET'])
@cross_origin()
def get_exercises():
    exercises = Exercise.query.all()
    json_exercises = list(map(lambda x: x.to_json(),exercises))
    return jsonify({'exercises':json_exercises})

@app.route('/create_exercise', methods=['POST'])
@cross_origin()
def create_exercise():
    name=request.json.get('name')
    sets = request.json.get('sets')
    reps = request.json.get('reps')
    weight = request.json.get('weight')
    date = request.json.get('date')

    if not (name or sets or reps or weight or date):
        return(
            jsonify({
                'message':'Must include all info'
            }),400
        )
    new_exercise = Exercise(name=name, sets=sets, reps=reps, weight=weight, date=date)
    try:
        db.session.add(new_exercise)
        db.session.commit()
    except Exception as e:
        return jsonify({'message':str(e)}),400
    return jsonify({'message':'Exercise created successfully! :)'}),201


@app.route('/update_exercise/<int:exercise_id>', methods=['PUT'])
@cross_origin()
def update_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)

    if not exercise:
        return jsonify({'message':'Exercise not found'}), 404
    
    data = request.json
    exercise.name = data.get('name', exercise.name)
    exercise.reps = data.get('reps', exercise.reps)
    exercise.sets = data.get('sets', exercise.sets)
    exercise.weight = data.get('weight', exercise.weight)
    exercise.date = data.get('date', exercise.date)

    db.session.commit()

    return jsonify({'message':
                    'Exercise updated :)'
                    }),200


@app.route('/delete_exercise/<int:exercise_id>', methods=['DELETE'])
@cross_origin()
def delete_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)

    if not exercise:
        return jsonify({'message':'Exercise not found'}), 404
    
    db.session.delete(exercise)
    db.session.commit()

    return jsonify({'message':
                    'Exercise deleted :)'
                    }),200







if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)