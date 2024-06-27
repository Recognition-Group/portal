from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recognitiongroup.db'
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
class MusicTrack(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # Additional fields like genre, release_date, etc.

class Distribution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('music_track.id'), nullable=False)
    platform = db.Column(db.String(150), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    # Additional fields as necessary
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='artist')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # Additional form fields like name can be added here

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already registered.', 'warning')
            return redirect(url_for('register'))

        # Hash the password for secure storage
        hashed_password = generate_password_hash(password, method='sha256')

        # Create new user instance
        new_user = User(email=email, password=hashed_password)
        # Add additional fields as necessary

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful. Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')  # Render the registration page

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            session['user_id'] = user.id
            flash('You were successfully logged in', 'success')
            return redirect(url_for('home'))  # Redirect to the home page or dashboard
        else:
            flash('Invalid email or password', 'danger')
    
    return render_template('login.html')  # Render the login page again with error

    @app.route('/upload', methods=['GET', 'POST'])
    def upload_music():
        # Implement music upload logic

    @app.route('/my_music')
    def my_music():
        # Implement logic to display user's music

@app.route('/upload', methods=['GET', 'POST'])
def upload_music():
    # Implement music upload logic

@app.route('/my_music')
def my_music():
    # Implement logic to display user's music

    @app.route('/distribute/<int:track_id>', methods=['GET', 'POST'])
    def distribute(track_id):
        # Implement distribution logic

        @app.route('/')
        def home():
            return render_template('home.html')

            if __name__ == '__main__':
                db.create_all()
                app.run(debug=True)