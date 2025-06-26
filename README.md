<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Backend Repository with RBAC Implementation

This repository contains the backend implementation of a project built using **NestJS**. The backend features a Role-Based Access Control (RBAC) system to manage access and permissions dynamically. The backend is deployed on the **DigitalOcean App Platform** for reliable and scalable hosting.

Project Link --> [https://rbac-nextjs-ry8w2.ondigitalocean.app](https://rbac-nextjs-ry8w2.ondigitalocean.app/)

---

## Key Features

- **RBAC System**:
  - **Admin**: 
    - Can view and update all users.
    - Has the ability to change user roles (e.g., switching a Manager to a User and vice versa).
  - **Manager**:
    - Can only view users within the department they manage.
  - **User**:
    - Can view only their own profile details.
- **Database Integration**:
  - Roles, departments, and user details are stored in the database (SQLite).
- **Dummy Data**:
  - **Faker.js** was used to populate the database with dummy data, including users, departments, and other necessary entities for testing and demonstration.
- **Secure Hosting**:
  - Deployed on **DigitalOcean App Platform** for scalability and security.

---

## Test Users

You can log in to the application using the following test credentials:

- **Admin**:  
  Email: `terry.colby@e-corp.com`  
  Password: `newpass`

- **Manager**:  
  Email: `tyrell.wellick@e-corp.com`  
  Password: `pwned`

- **User**:  
  Email: `Bailee_Williamson82@e-corp.com`  
  Password: `pwned`

---

## Tech Stack

- **Framework**: NestJS
- **Database**: SQLite
- **Database Driver**: Prisma
- **Hosting**: DigitalOcean App Platform
- **Data Population**: Faker.js

Frontend Repository Link ---> [https://github.com/NxtNinja/admin-ui-RBAC](https://github.com/NxtNinja/admin-ui-RBAC)

