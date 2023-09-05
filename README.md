# Auchan Project

Login with React JS, Express JS and PostgreSQL

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Application](#running-the-application)
  - [Running the application with Docker](#running-the-application-with-docker)

## Project Overview

This project provides 3 pages:
- Login
- Register
- Home

Main functionality is to communicate with backend server, register and login an user and keep the user authentication status using Redux.
## Prerequisites

List any prerequisites or dependencies that users need to have installed before they can use your project. Include links to installation guides or relevant resources.

- Node.js and npm
- Docker
- PostgreSQL (if not using Docker)

## Getting Started

To get started, pull the code into a separate folder into your computer. Once everything is pulled you can proceed with installing dependencies.

### Installing Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

## Running the application (local)

```bash
# Start the frontend development server
cd backend
npm start

cd ..

# Start the frontend development server
cd frontend
npm start
```

## Running the application with Docker
### Building images

```bash
docker-compose build
```

### Running docker containers
```bash
docker-compose up
```

# Bug

* I modified the program with the bug and named it as bug.js file
* I added comments in the code to highlight the issues
* The bug appears when there are issues on file read/write and I tried to fix them using proper callback params