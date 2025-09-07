<b>This repository contains my semester project for the Full-Stack Development course. The project is a simple budget analyzer web application designed to help users track their income and expenses.</b>

# Features:

	- Add and categorize income and expenses
	- Generate summary statistics and visualizations
	- Track overspending with alerts
	- Predict income / spending based on the user's previous data (under development) 

<i>Semester project's official description: </i>

https://github.com/siposm/oktatas-fullstack/blob/master/semester-project/semester-project.md#-k%C3%B6lts%C3%A9gvet%C3%A9si-elemz%C5%91

<hr>

## Techniques used throughout the project:
- Bootstrap framework for better UI/UX experience:
	- The main page contains four form-boxes with the following Bootstrap attributes:
		- **`mx-auto`** - places the form in the center horizontally
		- **`w-50`** - takes up 50% width in the current div
		- **`p-3`** - used for padding (1rem) 
		- **`mb-3`** - margin bottom to have more space between fields
		- **`border`** - gives border to the form
		- **`rounded`** - makes the previously created border rounded
		- **`shadow`** - adds subtle shadow effect to the box
	- The description page uses cards to provide additional information about project:
		- **`container`** - centers the child elements horizontally
		- **`py-5`** - adds padding on the y-axis
		- **`top-0 start-0`** - positioning the element at the top left corner
		- **`g-4`** - sets gutter (spacing), padding between the cards
		- **`col-md-4`** - resize cards when page is shrinked
		- **`list-group-flush`** - removes borders around list cells
		- **`my-5`** - adds margin on the y-axis
	- Used switches to toggle between different (Bootstrap) tables (income / spending / overall statistics)
	- Also used dark-themed Bootstrap tables to display filtered statistics on a separate page
- ASP.NET framework for backend (main endpoints):
	- **`Models`** - Initializing the model classes which are used across the project
	- **`Data`** - Includes the main interface for core logic, along with its implementations
	- **`Controllers`** - Provides API endpoints, consumed by the frontend
- Flask framework for prediction and calculations
	- **`Calculation`** - Calculate spending and income data using Pandas
	- **`Constants`** - Commonly used constants for Python calculations
	- **`Functions`** - Commonly used functions for Python calculations
	- **`Routes`** - Endpoints triggered by the ASP.NET backend

## How to run?

The app can currently be ran on your local device and from Docker.

- local device:
	- start ASP.NET backend:
		- open terminal
		- type: cd \path\to\your\csharp\backend -> example: \..\..\..\KOLTSEGVETESIELEMZO\BACKEND\KOLTSEGVETESIELEMZO.BACKEND
		- type: dotnet run
		- after a few seconds the C# backend will be up and running
	- start the Flask backend:
		- open terminal
		- type: cd \path\to\your\python\backend -> example: \..\..\..\..\KOLTSEGVETESIELEMZO\BACKEND\KOLTSEGVETESIELEMZO.BACKEND\Predict
		- type: py -m pip install -r requirements.txt
		- type: py main.py
	- after both servers are running, the app can be found on http://127.0.0.1:5001

- Docker
	- open terminal and Docker desktop (install if necessary: https://docs.docker.com/engine/install/)
	- type: docker-compose up --build
	- or docker-compose build then docker-compose up
	- after building and running, the app will be available on http://127.0.0.1:5001