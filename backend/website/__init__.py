from flask import Flask, jsonify, jsonify, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

import datetime
from .models import db, nurse,user, vaccination_schedule,nurse_schedule,vaccination_record, patient, time_slot, vaccine, user_role
DB_NAME = "vaccinesystem"


def create_app():
    
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/vaccinesystem'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    bcrypt = Bcrypt(app)

    db.init_app(app)    

    from .auth import auth
   
    # app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    # signup a patient
    @app.route('/api/signup', methods=['POST'])
    def signup():
        try:
            data = request.json

            email = data.get('email')
            password = data.get('password')
            role_type = 'PATIENT'  # 'patient', 'nurse', or 'admin'

        # Check if the email is already taken
            existing_user = models.user.query.filter_by(email=email).first()

            if existing_user:
                return jsonify({'message': 'Email is already taken'}), 400

            role = models.user_role.query.filter_by(role_type=role_type).first()

        # Hash the password before storing it
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

            new_user = models.user(
            password=hashed_password,
            email=data['email'],
            first_name=data['first_name'],
            role_id=role.role_id
            )

            db.session.add(new_user)
            db.session.commit()

            new_patient = models.patient(
            ssn=data['ssn'],
            first_name=data['first_name'],
            middle_name=data['middle_name'],
            last_name=data['last_name'],
            age=data['age'],
            gender=data['gender'],
            race=data['race'],
            occupation_class=data['occupation_class'],
            medical_history_description=data['medical_history_description'],
            phone_number=data['phone_number'],
            address=data['address'],
            user_id=new_user.id
            )

            db.session.add(new_patient)
            db.session.commit()

            user_info = {'id': new_patient.ssn, 'email': new_user.email, 'role': new_user.user_role.role_type}
            return jsonify(user_info), 201

        except Exception as e:
        # Handle any exception that might occur during the signup process
            db.session.rollback()  # Rollback the transaction in case of an error
            return jsonify({'message': f'Error during signup: {str(e)}'}), 500

# user login
    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.json

        email = data.get('email')
        password = data.get('password')

    # Check if the user exists
        existing_user = models.user.query.filter_by(email=email).first()
        if not existing_user or not bcrypt.check_password_hash(existing_user.password, password):
            return jsonify({'message': 'Invalid email or password'}), 401
        print('hello')
        print(existing_user.nurse)
    # Return user information 
        if existing_user.user_role.role_type=='PATIENT':
           role_based_id=existing_user.patient[0].ssn
        elif existing_user.user_role.role_type=='NURSE':
            role_based_id=existing_user.nurse[0].nurse_id
        elif existing_user.user_role.role_type=='ADMIN':
            role_based_id=existing_user.id
        

       
        user_info = {'id': existing_user.id, 'role_based_id': role_based_id, 'email': existing_user.email, 'role': existing_user.user_role.role_type}
        return jsonify(user_info), 200



# post vaccine
    @app.route('/api/vaccines', methods=['POST'])
    def create_vaccine():
        try:
            data = request.json

            new_vaccine = vaccine(
                name=data['name'],
                company_name=data['company_name'],
                description=data['description'],
                quantity=data['quantity'],
                doses_required=data['doses_required']
            )

            db.session.add(new_vaccine)
            db.session.commit()

            return jsonify({'message': 'Vaccine created successfully', 'vaccine_id': new_vaccine.vaccine_id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
            
# get all vaccine
    @app.route('/api/vaccines', methods=['GET'])
    def get_all_vaccines():
        vaccines = models.vaccine.query.all()

        vaccine_list = []
        for vaccine in vaccines:
            vaccine_data = {
            'vaccine_id': vaccine.vaccine_id,
            'name': vaccine.name,
            'company_name': vaccine.company_name,
            'description': vaccine.description,
            'quantity': vaccine.quantity,
            'on_hold_count': vaccine.on_hold_count,
            'doses_required': vaccine.doses_required
            }
            vaccine_list.append(vaccine_data)

        return jsonify({'vaccines': vaccine_list})

    @app.route('/api/vaccines/<int:vaccine_id>', methods=['PUT'])
    def edit_vaccine(vaccine_id):
        vaccine_data = vaccine.query.get(vaccine_id)
        if vaccine_data:
            data = request.json
            vaccine_data.name = data.get('name', vaccine_data.name)
            vaccine_data.company_name = data.get('company_name', vaccine_data.company_name)
            vaccine_data.description = data.get('description', vaccine_data.description)
            vaccine_data.quantity = data.get('quantity', vaccine_data.quantity)
            vaccine_data.on_hold_count = data.get('on_hold_count', vaccine_data.on_hold_count)
            vaccine_data.doses_required = data.get('doses_required', vaccine_data.doses_required)
        
            db.session.commit()
        
            return jsonify({"message": "Vaccine details updated successfully"}), 200
        else:
            return jsonify({"message": "Vaccine not found"}), 404

    # NURSES APIS
    @app.route('/api/nurses', methods=['POST'])
    def register_nurse():
        data = request.json
        password=data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = user( 
        password=hashed_password,
        email=data['email'],
        first_name=data['first_name'],
        role_id=data['role_id'] 
        )

        
        db.session.add(new_user)
        db.session.commit()
        print(new_user)
        new_nurse = nurse(
        first_name=data['first_name'],
        middle_name=data['middle_name'],
        last_name=data['last_name'],
        age=data['age'],
        gender=data['gender'],
        phone_number=data['phone_number'],
        address=data['address'],
        user_id=new_user.id
        )

        db.session.add(new_nurse)
        db.session.commit()

        return jsonify({'message': 'Nurse registered successfully'}), 201
    
    

    @app.route('/api/nurses', methods=['GET'])
    def get_all_nurses():
       
        nurses = models.nurse.query.all() 
        nurses_details = []
        for nurse in nurses:
            nurse_details = {
            'nurse_id': nurse.nurse_id,
            'first_name': nurse.first_name,
            'middle_name': nurse.middle_name,
            'last_name': nurse.last_name,
            'age': nurse.age,
            'gender': nurse.gender,
            'phone_number': nurse.phone_number,
            'address': nurse.address,
        
            }
            nurses_details.append(nurse_details)

        return jsonify({'nurses': nurses_details})
    
    @app.route('/api/nurses/<int:nurse_id>', methods=['GET'])
    def get_nurse_by_nurse_id(nurse_id):
        nurse = models.nurse.query.get_or_404(nurse_id)
        user=nurse.user
        nurse_info = {
        'nurse_id': nurse.nurse_id,
        'first_name': nurse.first_name,
        'middle_name': nurse.middle_name,
        'last_name': nurse.last_name,
        'age': nurse.age,
        'gender': nurse.gender,
        'phone_number': nurse.phone_number,
        'address': nurse.address,
        'email':user.email,
        
        }

        return jsonify({'nurse': nurse_info})
    

    @app.route('/api/nurses/<int:nurse_id>', methods=['PUT'])
    def update_nurse(nurse_id):
        nurse = models.nurse.query.get(nurse_id)
    
        if not nurse:
            return jsonify({'error': 'Nurse not found'}), 404

    
        nurse_data = request.json
        nurse.first_name = nurse_data.get('first_name', nurse.first_name)
        nurse.middle_name = nurse_data.get('middle_name', nurse.middle_name)
        nurse.last_name = nurse_data.get('last_name', nurse.last_name)
        nurse.age = nurse_data.get('age', nurse.age)
        nurse.gender = nurse_data.get('gender', nurse.gender)
        nurse.phone_number = nurse_data.get('phone_number', nurse.phone_number)
        nurse.address = nurse_data.get('address', nurse.address)
        
        user = models.user.query.get(nurse.user_id)
    # If the nurse is associated with a user, update user details
        if nurse.user:
            user.email = nurse_data.get('email', user.email)
            user.password = nurse_data.get('password', user.password)
            user.first_name = nurse_data.get('first_name', user.first_name)

        db.session.commit()

        return jsonify({'message': 'Nurse details updated successfully'})
    
     
    @app.route('/api/patients', methods=['GET'])
    def get_all_patients():
        patients = patient.query.all()
        patient_list = []
        for p in patients:
            patient_data = {
                "ssn": p.ssn,
                "first_name": p.first_name,
                "last_name": p.last_name,
                "age": p.age,
                "gender": p.gender,
                "race": p.race,
                "occupation_class": p.occupation_class,
                "medical_history_description": p.medical_history_description,
                "phone_number": p.phone_number,
                "address": p.address,
                "user_id": p.user_id
            }
            patient_list.append(patient_data)
        return jsonify({"patients": patient_list})
        


    @app.route('/api/patients/<int:ssn>', methods=['GET'])
    def get_patient_by_id(ssn):
        patient_data = patient.query.get(ssn)
        if patient_data:
            patient_info = {
                "ssn": patient_data.ssn,
                "first_name": patient_data.first_name,
                "last_name": patient_data.last_name,
                "age": patient_data.age,
                "gender": patient_data.gender,
                "race": patient_data.race,
                "occupation_class": patient_data.occupation_class,
                "medical_history_description": patient_data.medical_history_description,
                "phone_number": patient_data.phone_number,
                "address": patient_data.address,
                "user_id": patient_data.user_id
             }
            return jsonify(patient_info)
        else:
            return jsonify({"message": "Patient not found"}), 400

    
    
    @app.route('/api/timeslots/patients/available', methods=['GET'])
    def view_available_timeslots_patients():
        try:
    
            
            available_timeslots = time_slot.query.filter(time_slot.max_patient_capacity < 100 ).all()

       
            timeslots_data = []
            for timeslot in available_timeslots:
                timeslots_data.append({
                    'time_slot_id': timeslot.t_id,
                    'date': timeslot.date.strftime('%Y-%m-%d'),
                    'start_time': timeslot.start_time.strftime('%H:%M:%S'),
                    'end_time': timeslot.end_time.strftime('%H:%M:%S'),
                    'max_patient_capacity': timeslot.max_patient_capacity,
                    'nurse_count': timeslot.nurse_count
                })

            return jsonify({'timeslots': timeslots_data}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # //show this for nurse
    @app.route('/api/timeslots/available', methods=['GET'])
    def view_available_timeslots():
        try:
        # Query timeslots with less than 12 nurses
            available_timeslots = time_slot.query.filter(time_slot.nurse_count < 12).all()

        # Convert the results to a list of dictionaries
            timeslots_data = []
            for timeslot in available_timeslots:
                timeslots_data.append({
                    'time_slot_id': timeslot.t_id,
                    'date': timeslot.date.strftime('%Y-%m-%d'),
                    'start_time': timeslot.start_time.strftime('%H:%M:%S'),
                    'end_time': timeslot.end_time.strftime('%H:%M:%S'),
                    'max_patient_capacity': timeslot.max_patient_capacity,
                    'nurse_count': timeslot.nurse_count
                })

            return jsonify({'timeslots': timeslots_data}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    
    # API to view vaccination schedule by patient ID with details of time slot and vaccine
    @app.route('/api/vaccination-schedule/<int:patient_id>', methods=['GET'])
    def get_vaccination_schedule(patient_id):
        try:
            schedules = vaccination_schedule.query.filter_by(patient_id=patient_id).all()

            schedules_data = [{
            'schedule_id': schedule.schedule_id,
            'vaccine_id': schedule.vaccine_id,
            'time_slot_id': schedule.time_slot_id,
            'status': schedule.status,
            'dose_no': schedule.dose_no,
            'time_slot': {
                'date': schedule.time_slot.date.strftime('%Y-%m-%d'),
                'start_time': schedule.time_slot.start_time.strftime('%H:%M:%S'),
                'end_time': schedule.time_slot.end_time.strftime('%H:%M:%S'),
                'max_patient_capacity': schedule.time_slot.max_patient_capacity,
                'nurse_count': schedule.time_slot.nurse_count
            },

            'vaccine': {
                'name': schedule.vaccine.name,
                'company_name': schedule.vaccine.company_name,
                'description': schedule.vaccine.description,
                'quantity': schedule.vaccine.quantity,
                'on_hold_count': schedule.vaccine.on_hold_count,
                'doses_required': schedule.vaccine.doses_required
            }
            } for schedule in schedules]

            return jsonify({'schedules': schedules_data}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500


    @app.route('/api/vaccination-schedules/<int:time_slot_id>', methods=['GET'])
    def get_vaccination_schedules_by_time_slot(time_slot_id):
        try:
            schedules = vaccination_schedule.query.filter_by(time_slot_id=time_slot_id,status='Scheduled').all()
            
            
            schedules_data = []
            for schedule in schedules:
                schedule_data = {
                'schedule_id': schedule.schedule_id,
                'patient_id': schedule.patient_id,
                'vaccine_id': schedule.vaccine_id,
                'status': schedule.status,
                'dose_no': schedule.dose_no,
                'patient_name':schedule.patient.first_name,
                'vaccine_name':schedule.vaccine.name,
                'start_time':str(schedule.time_slot.start_time),
                'end_time':str(schedule.time_slot.end_time),
                'email':schedule.patient.user.email
                # Add more fields as needed
                }
                schedules_data.append(schedule_data)

            return jsonify({'schedules': schedules_data})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    
    @app.route('/api/nurse-schedule/<int:nurse_id>', methods=['GET'])
    def view_nurse_schedule(nurse_id):
        try:
      
            nurse_schedule_data = nurse_schedule.query.filter_by(nurse_employee_id=nurse_id).all()

       
            schedule_data = []
            for schedule in nurse_schedule_data:
                timeslot_data = {
                    'schedule_id':schedule.schedule_id,
                    'time_slot_id': schedule.time_slot_id,
                    'date': schedule.time_slot.date.strftime('%Y-%m-%d'),
                    'start_time': schedule.time_slot.start_time.strftime('%H:%M:%S'),
                    'end_time': schedule.time_slot.end_time.strftime('%H:%M:%S'),
                    'max_patient_capacity': schedule.time_slot.max_patient_capacity,
                    'nurse_count': schedule.time_slot.nurse_count
                }
                schedule_data.append(timeslot_data)

            return jsonify({'nurse_schedule': schedule_data}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500


    @app.route('/api/patients/<int:ssn>', methods=['PUT'])
    def update_patient(ssn):
        try:
        # Get the patient from the database using the provided SSN
            patient = models.patient.query.get(ssn)

            if not patient:
                return jsonify({'error': 'Patient not found'}), 400

        # Extract updated information from the request
            data = request.json
            patient.first_name = data.get('first_name', patient.first_name)
            patient.middle_name = data.get('middle_name', patient.middle_name)
            patient.last_name = data.get('last_name', patient.last_name)
            patient.age = data.get('age', patient.age)
            patient.gender = data.get('gender', patient.gender)
            patient.race = data.get('race', patient.race)
            patient.occupation_class = data.get('occupation_class', patient.occupation_class)
            patient.medical_history_description = data.get('medical_history_description', patient.medical_history_description)
            patient.phone_number = data.get('phone_number', patient.phone_number)
            patient.address = data.get('address', patient.address)

        # Commit the changes to the database
            db.session.commit()

            return jsonify({'message': 'Patient details updated successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/record-vaccination', methods=['POST'])
    def record_vaccination():
            try:
                data = request.json

        # Extract data from the request
                vaccine_schedule_id=data['vaccine_schedule_id']
                patient_id = data['patient_id']
                dose_number = data['dose_number']
                # vaccination_time = datetime.datetime.utcnow
                nurse_id = data['nurse_id']
                vaccine_id = data['vaccine_id']

        # Check if the vaccine is available and not on-hold
                vaccine = models.vaccine.query.get(vaccine_id)
                if vaccine and vaccine.quantity > 0 and vaccine.on_hold_count < vaccine.quantity:
            # Update vaccine quantity and on-hold count
                    vaccine.quantity -= 1
                    vaccine.on_hold_count -= 1

            # Create a new vaccination record
                    new_record = vaccination_record(
                        patient_id=patient_id,
                        dose_number=dose_number,
                        # vaccination_time=vaccination_time,
                        nurse_id=nurse_id,
                        vaccine_id=vaccine_id
                 )
                    db.session.add(new_record )
                    db.session.commit()
            # Mark the vaccination schedule as completed
                    vaccination_schedule =models.vaccination_schedule.query.get(vaccine_schedule_id)

                    if vaccination_schedule:
                        vaccination_schedule.status = 'Completed'

            # Commit changes to the database
                    db.session.commit()

                    return jsonify({'message': 'Vaccination recorded successfully'}), 200
                else:
                    return jsonify({'error': 'Vaccine not available or on-hold'}), 400

            except Exception as e:
                db.session.rollback()
                return jsonify({'error': str(e)}), 500

    
    @app.route('/api/vaccination-records', methods=['POST'])
    def register_vaccination_record():
        try:
            data = request.json

           
            new_record = vaccination_record(
                patient_id=data['patient_id'],
                dose_number=data['dose_number'],
                nurse_id=data['nurse_id'],
                vaccine_id=data['vaccine_id']
            )

            db.session.add(new_record)
            db.session.commit()

            return jsonify({'message': 'Vaccination record registered successfully'}), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500


# API to view vaccination records by nurse ID with details of patient and vaccine
    @app.route('/api/vaccination-records/nurse/<int:nurse_id>', methods=['GET'])
    def get_vaccination_records_by_nurse(nurse_id):
        try:
           

            # Validate nurse_id
            
            if nurse_id:
         
                records= models.vaccination_record.query(nurse_id == nurse_id).all()

          
                records_data = [{
                'record_id': record.record_id,
                'patient': {
                    'patient_id': record.patient.ssn,
                    'first_name': record.patient.first_name,
                    'last_name': record.patient.last_name,
                    'age': record.patient.age,
                    'gender': record.patient.gender,
                    'race': record.patient.race,
                    'occupation_class': record.patient.occupation_class,
                    'medical_history_description': record.patient.medical_history_description,
                    'phone_number': record.patient.phone_number,
                    'address': record.patient.address
                },
                'dose_number': record.dose_number,
                'vaccination_time': record.vaccination_time.strftime('%Y-%m-%d %H:%M:%S'),
                'vaccine': {
                    'vaccine_id': record.vaccine.vaccine_id,
                    'name': record.vaccine.name,
                    'company_name': record.vaccine.company_name,
                    'description': record.vaccine.description,
                    'quantity': record.vaccine.quantity,
                    'on_hold_count': record.vaccine.on_hold_count,
                    'doses_required': record.vaccine.doses_required
                }
                } for record in records]

                return jsonify({'vaccination_records': records_data}), 200
            else:
                return jsonify({'message': 'Nurse schedule not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        

    @app.route('/api/vaccination-records/patient/<int:patient_id>', methods=['GET'])
    def get_vaccination_records_by_patient(patient_id):
        try:
           

            # Validate nurse_id
            
            if patient_id:
            # Join with patient and vaccine tables to fetch details
                records= models.vaccination_record.query(patient_id==patient_id).all()

           
                records_data = [{
                'record_id': record.record_id,
                'patient': {
                    'patient_id': record.patient.ssn,
                    'first_name': record.patient.first_name,
                    'last_name': record.patient.last_name,
                    'age': record.patient.age,
                    'gender': record.patient.gender,
                    'race': record.patient.race,
                    'occupation_class': record.patient.occupation_class,
                    'medical_history_description': record.patient.medical_history_description,
                    'phone_number': record.patient.phone_number,
                    'address': record.patient.address
                },
                'dose_number': record.dose_number,
                'vaccination_time': record.vaccination_time.strftime('%Y-%m-%d %H:%M:%S'),
                'vaccine': {
                    'vaccine_id': record.vaccine.vaccine_id,
                    'name': record.vaccine.name,
                    'company_name': record.vaccine.company_name,
                    'description': record.vaccine.description,
                    'quantity': record.vaccine.quantity,
                    'on_hold_count': record.vaccine.on_hold_count,
                    'doses_required': record.vaccine.doses_required
                }
                } for record in records]

                return jsonify({'vaccination_records': records_data}), 200
            else:
                return jsonify({'message': 'Nurse schedule not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500


    @app.route('/api/cancel-vaccination-schedule/<int:schedule_id>', methods=['PUT'])
    def cancel_vaccination_schedule(schedule_id):
        try:
            schedule = vaccination_schedule.query.get(schedule_id)
            if schedule:
                vaccine = models.vaccine.query.get(schedule.vaccine_id)
                if vaccine and vaccine.on_hold_count > 0:
                    vaccine.on_hold_count -= 1

                # Decrease max patient capacity in the time_slot table
                time_slot = models.time_slot.query.get(schedule.time_slot_id)
                if time_slot and time_slot.max_patient_capacity > 0:
                    time_slot.max_patient_capacity -= 1
                schedule.status = 'Cancelled'
                db.session.commit()
                return jsonify({'message': 'Vaccination schedule cancelled successfully'}), 200
            else:
                return jsonify({'error': 'Vaccination schedule not found'}), 400

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500



# get all vaccination records
    @app.route('/api/vaccination-records', methods=['GET'])
    def get_all_vaccination_records():
        try:
        # Retrieve all vaccination records from the database
            records = models.vaccination_record.query.all()

        # Map the records to a list of dictionaries
            records_data = [{'record_id': record.record_id,
                         'patient_id': record.patient_id,
                         'dose_number': record.dose_number,
                         'vaccination_time': record.vaccination_time.strftime('%Y-%m-%d %H:%M:%S'),
                         'nurse_id': record.nurse_id,
                         'vaccine_id': record.vaccine_id}
                        for record in records]

            return jsonify({'vaccination_records': records_data}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # //to be tested
   

    @app.route('/api/nurses/<int:nurse_id>', methods=['DELETE'])
    def delete_nurse(nurse_id):
        nurse = models.nurse.query.get(nurse_id)
       
        if not nurse:
            return jsonify({'message': 'Nurse not found'}), 404
        user= models.user.query.get(nurse.user_id)
        # Delete the nurse
        db.session.delete(nurse)
        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'Nurse deleted successfully'}), 200


    @app.route('/api/nurse/nurse-schedule/<int:schedule_id>', methods=['DELETE'])
    def cancel_nurse_time(schedule_id):
        try:
           
           

        # Find the NurseSchedule record by ID
            nurse_schedule = models.nurse_schedule.query.get(schedule_id)
            
            if nurse_schedule:
            # Delete the NurseSchedule record
                time_slot= models.time_slot.query.get(nurse_schedule.time_slot_id)
                if time_slot.nurse_count>0:
                    time_slot.nurse_count-=1
                    
                db.session.delete(nurse_schedule)
                db.session.commit()
                return jsonify({'message': 'Time canceled successfully'}), 200
            else:
                return jsonify({'message': 'Nurse schedule not found'}), 404
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

# add status in nurse schedule

# create,get all, get  by id nurse, fetch nurse schedule, delete nurse, 
# update address and phone, record a vaccination schedule , vaccination record

#  cancel a nurse schedule, view the nurse schedul

    

    @app.route('/admin/add_timeslot', methods=['POST'])
    def add_timeslot():
        try:

            data = request.json

            new_timeslot = time_slot(
            date=data['date'],
            start_time=data['start_time'],
            end_time=data['end_time'],
            max_patient_capacity=100
        )

            db.session.add(new_timeslot)
            db.session.commit()

            return jsonify({'message': 'Time slot added successfully'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

  
    @app.route('/api/nurse-schedule/register', methods=['POST'])
    def register_schedule():
        try:
            data = request.json

           
            nurse_employee_id = data['nurse_employee_id']

           
            time_slot_id = data['time_slot_id']

           
            existing_schedule = nurse_schedule.query.filter_by( nurse_employee_id= nurse_employee_id, time_slot_id=time_slot_id).first()

            if existing_schedule:
                return jsonify({'message': 'Nurse is already scheduled for this time slot'}), 400

           
            time_slot_selected = time_slot.query.get(time_slot_id)
            

            if time_slot_selected.nurse_count >12:
                return jsonify({'message': 'Maximum capacity for this time slot reached'}), 400
            
       
            new_schedule = nurse_schedule(
                nurse_employee_id= nurse_employee_id,
                time_slot_id=time_slot_id
            )

            db.session.add(new_schedule)
            db.session.commit()

            time_slot_selected.nurse_count+=1
            db.session.commit()

            return jsonify({'message': 'Schedule registered successfully'}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    
    @app.route('/api/patients/create', methods=['POST'])
    def create_patient():
        try:
            data = request.json

            new_user = user( 
            password=data['password'],
            email=data['email'],
            first_name=data['first_name'],
            role_id=data['role_id'] 
           
            )

        
            db.session.add(new_user)
            db.session.commit()
            print(new_user)

            new_patient = patient(
                first_name=data['first_name'],
                middle_name=data['middle_name'],
                last_name=data['last_name'],
                age=data['age'],
                gender=data['gender'],
                race=data['race'],
                occupation_class=data['occupation_class'],
                medical_history_description=data['medical_history_description'],
                phone_number=data['phone_number'],
                address=data['address'],
                user_id=new_user.id
            )

            db.session.add(new_patient)
            db.session.commit()

            return jsonify({'message': 'Patient created successfully'}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @app.route('/api/patient/vaccination-schedule', methods=['POST'])
    def register_vaccination_schedule():
        try:
            data = request.json
            print(data)
       
            patient_id = data['patient_id']
            vaccine_id = data['vaccine_id']
            time_slot_id = data['time_slot_id']
            status = "Scheduled"
            dose_no = data['dose_no']

           
        
            vaccine = models.vaccine.query.get(vaccine_id)

            if vaccine and vaccine.on_hold_count == vaccine.quantity:
                return jsonify({'message': 'Time slot cant be scheduled, try looking some other vaccination'}), 400
            
            time_slot = models.time_slot.query.get(time_slot_id)
            if time_slot:
                value = (time_slot.nurse_count) * 10
                if (time_slot.max_patient_capacity <  value) and (time_slot.max_patient_capacity < 100):
                    new_schedule = vaccination_schedule(
                    patient_id=patient_id,
                    vaccine_id=vaccine_id,
                    time_slot_id=time_slot_id,
                    status=status,
                    dose_no=dose_no
                    )
                    print(new_schedule)
                    db.session.add(new_schedule)
                    db.session.commit()

                    time_slot.max_patient_capacity +=  1
                    
                    if vaccine:
                         vaccine.on_hold_count  +=  1

                    db.session.commit()
                    return jsonify({'message': 'Vaccination schedule registered successfully'}), 201
                else:
                    return jsonify({'message': 'Invalid conditions for scheduling'}), 400
            else:
                return jsonify({'message': 'Invalid time slot'}), 400

        except Exception as e:
            return jsonify({'error': str(e)}), 500





    from .models import user, user_role, vaccine,nurse,time_slot,patient,vaccination_record,nurse_schedule,vaccination_schedule
    migrate = Migrate(app, db)
    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return user.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')
