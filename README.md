<b>This repository contains my semester project for the Full-Stack Development course. The project is a simple budget analyzer web application designed to help users track their income and expenses.</b>

# Features:

	- Add and categorize income and expenses
	- Generate summary statistics and visualizations
	- Track overspending with alerts

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
	- Used switches to toggle between different (Bootstrap) tables (income / spending / overall statistics)
	- Also used dark-themed Bootstrap tables to display filtered statistics on a separate page
- ASP.NET framework for backend:
	- **`Models`** - Initializing the model classes which are used across the project
	- **`Data`** - Includes the main interface for core logic, along with its implementations
	- **`Controllers`** - Provide API endpoints, consumed by the frontend