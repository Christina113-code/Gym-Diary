from config import db 

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    sets = db.Column(db.Integer, unique=False, nullable=False)
    reps = db.Column(db.Integer, unique=False, nullable=False)
    weight = db.Column(db.Integer, unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    mgroup = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return{
            'id': self.id,
            'name': self.name,
            'sets': self.sets,
            'reps': self.reps,
            'weight': self.weight,
            'date': self.date,
            'mgroup':self.mgroup
        }