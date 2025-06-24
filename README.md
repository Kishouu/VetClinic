Veterinary Clinic Management System
Project Overview
    Goal
        The objective of this project is to develop a complete system for managing 
        appointments in a veterinary clinic. The system will facilitate efficient clinic 
        operations for both patients (animals) and medical staff.
        Scope
The system will provide functionalities for:
    • Patient (Animal) Management: Creating and editing patient records, storing 
    medical history, and owner details.
    • Appointment Scheduling: Allowing staff to book appointments, manage 
    doctors' schedules, and send notifications.
    • Medical Documentation: Enabling doctors to enter/edit medical notes, visit 
    details, and prescribed treatments.
    • User Authentication & Role Management: Implementing login, authentication, 
    and role-based permissions.
User Types
    1. Doctors: Access patient records, enter/edit medical documentation, view 
    schedules.
    2. Receptionists: Book appointments, manage schedules, maintain patient 
    records.
    3. Administrators: Oversee system settings, manage users, and ensure data 
    integrity.
2. Group Role Assignments
    Team Members and Roles
        Name                            Role
    Stepan Turani Project Manager / Backend Developer
    Sviatoslav Diachuk Database Manager / Full Stack Developer
    Volha Silmanovich UI/UX Designer / Tester
3. System Structure
Key Pages & User Journey
    1. Home Page: Overview of services, login/signup option.
    2. Login Page: Authentication for staff members.
    3. Dashboard: Different views for doctors, receptionists, and admins.
    4. Patient Records: Add/patient details, view history.
    5. Appointment Booking: Schedule appointments.
    6. Medical Documentation: Doctors input diagnosis, treatments.
    7. Admin Panel: Manage users, roles, and system settings.
4. Functionalities
    • User Authentication: Secure login for staff.
    • Patient Management: CRUD operations for patient data.
    • Appointment System: Booking, modifying, canceling appointments.
    • Medical Documentation: Secure storage of medical records.
    • Role-Based Access: Permission control for different users.
5. Responsibilities
    • Project Manager: Coordinate tasks, track progress, oversee final presentation.
    • UI/UX Designer: Design wireframes and user-friendly interfaces in Figma.
    • Full Stack Developer: Implement UI and ensure responsiveness , Develop 
    server-side logic, authentication, and integrations.
    • Backend Developer: Develop server-side logic, authentication, and integrations.
    • Database Manager: Maintain database structure, ensure security and backups.
    • Tester: Perform testing, document features, and fix bugs

Instruction how to run:
    1. git clone https://github.com/Kishouu/VetClinic.git 
    2. run npm install
    3. enter /server dir
    4. run npm install
    5. init prisma
    6. run node prisma/seed.js
    7. open 3 terminal
        1. run node index.js in /server
        2. run npx prisma studion in /server
        3. run npm start in root
    8.enter http://localhost:3000/ in your browser   
