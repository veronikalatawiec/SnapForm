# Snap Form

## Overview

**Snap Form** empowers freelancers, entrepreneurs, and small businesses with a simple, accessible platform to collect and analyze feedback. Whether businesses need data on customer experiences, product insights, or brand engagement, Snap Form helps businesses move faster and smarter.

## Problem Space

For creators, freelancers, entrepreneurs, and small business owners, user feedback is the lifeblood of their success. They need real-time insights to shape products, refine services, and make impactful decisions to keep their business going. But current feedback tools are full of barriers —like Typeform's complexity, SurveyMonkey's limited free options, or Google Forms' dull design. Time is precious, and these entrepreneurs can't afford to waste it on clunky, overpriced, or inadequate platforms. 

## User Profiles

### Freelance Professional (e.g., Photographer, Designer):

-   Send quick surveys to clients for project feedback and satisfaction ratings.
    
-   Customize forms for client-specific needs without wasting time on unnecessary features.
    
-   Gather feedback for new ideas, services, or product offerings to improve client work.
    
-   Track client feedback over time to improve future services and adjust business strategies.
    

### Small Business Owner:

-   Collect customer feedback and satisfaction ratings to improve products and services.
    
-   Create and distribute simple surveys to customers with just a few clicks.
    
-   Analyze customer responses with visual analytics (charts, graphs) that provide actionable insights.
    
-   Integrate forms seamlessly with the website or social media to engage customers without technical barriers.
    

### Entrepreneur:

-   Create quick, simple feedback forms to gather insights from clients and followers without wasting time on complicated tools.
    
-   Easily customize forms with minimal effort, using pre-built templates that suit different needs (product feedback, market research).
    
-   Share forms with clients through links or social media to collect responses quickly and efficiently.
    
-   Access easy-to-understand analytics to make fast decisions and improve their business operations.

## Features

-   As a user, I want to be able to easily create an account, so I can start making forms.
    
-   As a user, I want to be able to login to my account, to create and manage my forms.
    
-   As a user, I want to access the platform on mobile devices, so I can manage forms and responses while on the go.
    
-   As a logged in user, I want to create a simple form quickly, so I can start collecting feedback without wasting time.
    
-   As a logged in user, I want to easily launch/share my form with others via a link, so I can collect responses quickly and efficiently.

-   As a logged in user, I want to be able to take down/private my existing form at any point, so I can stop receiving responses .
    
-   As a logged in user, I want to customize my form's design, so it aligns with my brand or preferences without complexity.

## Implementation

### Tech Stack

#### React
 - JavaScript(ES6)
   
  - MySQL
   
 -   Express
   
   - Node.js

#### Client Libraries

 - React-Router
   
  - Axios
   
   - Vite

   - jwt-decode
   
   - Pragmatic Drag-and-Drop
   
  -  React-colorful

#### Server Libraries

- CORS

- Knex.js

 - argon2

- jsonwebtoken(JWT)

### API's

There is currently no plan to link Snap Form to an external API.

### Sitemap

-   Sign up
    
-   Sign In

-   User Home
    
	-   Form Create
    
	-   Form Edit
    
	-   Form Responses
- Hosted/Active Form
 
 - *IF TIME form completion  
- *IF TIME form analytics
- *IF TIME Promo (Page before signin portal to describe product)
- *IF TIME Forgot Password
- *IF TIME User Settings

### Mockups

![low-fi-wireframes](https://github.com/user-attachments/assets/e8a61870-4e4d-48bb-8ac7-11a77bb9085f)

### Data

<img width="1321" alt="sql-diagram" src="https://github.com/user-attachments/assets/171b09b0-9227-4e0a-b86c-a7df7e2e009c" />


### Endpoints

**POST /users**

-   Creates a new user and returns the authentication token.  

    **Parameters**
	-   email: User’s email as a string
	-   password: User’s password as a string  

 **Response**
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
**POST /users/login**

-   Authenticates a user sign in and returns the JWT for other requests

    **Parameters**
	-   email: User’s email as a string
	-   password: User’s password as a string  

 **Response**
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
**POST /:user_id/forms**

-   Creates a new form associated with that user

    **Parameters**
	-   Authentication token
	- name: Of form as a string
	-   status: Forms "active" state as boolean  
	-  sections: form content, as array of objects
	- design: design aspects, as an object(or array of objects)

	 **Response**
	- Success message
	- Id of new form
	{ "form_id": 1 }

**PUT /:user_id/forms/:id**

-   Updates an existing form associated with that user

    **Parameters**
	-   Authentication token
	- id: Of form as an integer
	- name: of form, as string
	-   status: Forms "active" state as boolean  
	-  sections: form content, as array of objects
	- design: updated design aspects, as an object

	 **Response**
	- Success message
	- Updated form object
	{ "form_id": 1, "name": "Customer Feedback", "sections": [ { "type": "text", "label": "What did you like about the product?" }, { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"] } ] }

**GET /:user_id/forms**

-   Get all created forms of a logged in user

    **Parameters**
	-   Authentication token

	 **Response**
	- Array of form objects
[{ "form_id": 1, "name": "Customer Feedback", "sections": [ { "type": "text", "label": "What did you like about the product?" }, { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"] } ] },{}]

**GET /:user_id/forms/:id**

-   Get details of a specific form for the logged in user

    **Parameters**
	-   Id: of form, as int
	-   Authentication token

	 **Response**
	- form(object)
{ "form_id": 1, "name": "Customer Feedback", "sections": [ { "type": "text", "label": "What did you like about the product?" }, { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"] } ] }

**GET /:user_id/forms/:id/responses**

-   Get the responses of a specific form for the logged in user

    **Parameters**
	-   Authentication token
	- Id: of form, as int

	 **Response**
	- form responses object
{ "form_id": 1, "section_1": "Yes", "section_2": "yes",}

**POST /forms/public_id**

-   Posts a response for a public form

    **Parameters**
	-   public_id: Unique identifier for the public form (provided when the form is created).
	-   sections: Array of objects containing answers for the form sections.
		-   Each object in sections contains:
			-   id: The form section ID.
			-   answer: The user's response.

	 **Response**
	- Success message
	{
  "message": "Responses successfully submitted"
}

**GET /forms/public_id**

-   Get the details of a specific form for public access (anyone with the link can access).

    **Parameters**
	-   public_id: Unique identifier for the public form (provided when the form is created).

	 **Response**
	- form object
{
  "form_id": 1,
  "name": "Customer Feedback",
  "status": true,
  "design_object": {"theme": "dark"},
  "sections": [
    {
      "form_section_id": 1,
      "type": "text",
      "label": "What did you like about the product?"
    },
    {
      "form_section_id": 2,
      "type": "radio",
      "label": "Would you recommend this product?",
      "options": ["Yes", "No"]
    }
  ]
}

## Roadmap
(Perhaps an optimistic one)

**Week 1 (March 11 - March 16)**

1.  **(March 11) Project Setup & Basic Structure**
    
    -   Set up the React project with JavaScript (ES6).
    -   Initialize the backend with Express and Node.js.
    -   Set up MySQL database and create essential tables (Users, Forms, Fields, Responses).
    -   Install and configure key libraries (React-Router, Axios, Knex.js, bcrypt.js, CORS).
    -   Set up Vite for faster development.
    -   Basic routing setup for the app (landing page, login page).
    -   
2.  **(March 12) User Authentication: Register & Login**
    
    -   Implement user registration (POST /users/register).
    -   Implement user login (POST /users/login).
    -   Store JWT in localStorage for persistent authentication.
    -   Test basic user authentication flow (register, login, and JWT).
    -   
3.  **(March 13) Form Creation: POST API & Backend Setup**
    
    -   Implement POST /forms endpoint to create forms.
    -   Set up basic form structure in the database (Fields table, relate it to the Forms table).
    -   Implement basic field types (text, radio, checkbox).
    -   Test form creation API (ensure the form is saved to MySQL).

4.  **(March 14) Form Builder UI Setup**
    
    -   Set up form builder UI using Pragmatic Drag-and-Drop.
    -   Create basic form fields (text, radio, checkbox).
    -   Integrate SurveyJS(?) for dynamic form creation (begin with adding form fields).
    -   Connect form builder UI with the backend to send data (store fields in MySQL).
    -   Basic form layout with draggable elements for fields.

**Weekend Work (March 15 & 16)**

-   Implement GET /forms/:id endpoint to view form details.
-   Enable form editing functionality to modify fields and layout.
-   Set up UI for displaying created forms and editing them.
-   Test form creation, editing, and saving.
-   Review and troubleshoot.
-   Finish any incomplete tasks from the week.

----------

**Week 2 (March 17 - March 23)**

6.  **(March 17) Form Authentication & User Access**
    
    -   Implement JWT authentication middleware to protect form routes.
    -   Ensure users can only access and edit their own forms (authorization checks).
    -   Test authorization flow (logged-in user access to their forms).
  
7.  **(March 18) Form Sharing & Links**
    
    -   Implement POST /forms/:formId/share to generate shareable links for forms.
    -   Add UI for managing form sharing options (copy link, social media sharing).
    -   Test the form sharing functionality (ensure links work and are user-friendly).
  
8.  **(March 19) Form Customization**
    
    -   Implement basic form customization options (color, font).
    -   Use React-colorful for color picker functionality.
    -   Allow users to save and apply customizations (colors, fonts) to their forms.
    -   Test customization functionality.

9.  **(March 20) Form Privacy & Management**
    
    -   Implement POST /forms/:formId/take-down to take down or privatize forms.
    -   Enable form management options in the user dashboard (view, edit, delete forms).
    -   Ensure forms can be marked as private to stop receiving responses.
  
10.  **(March 21) Privacy + Final Testing & Debugging**
    
-   Implement GET /forms/:id/responses endpoint to retrieve form responses.
-   Display basic visual analytics
-   Test analytics to ensure correct representation of form responses.
-   Finish anything that is incomplete from week.
-   Perform thorough testing of all features (form creation, sharing, analytics, customization).
-   Fix bugs and issues discovered during testing.
-   Test mobile responsiveness to ensure accessibility on various devices.

**Buffer Time (March 22-23)**

-   Address any last-minute issues and polish up the app.

## Future Implementations

-  As a logged in user, I want to view visual analytics on launched forms, so I can easily understand feedback and make data-driven decisions.
-  Form Templates for a quick start (3-5 initially?)
    
-   Form themes for easy customization(3-5 initially?)
    
-   Integration with Social Media and Websites
    
-   Conditional Logic for Forms
    
-   Team Collaboration Features
    
-   Unlimited form submissions for scalability
    
-   Customizable Form Widgets for unique answers
    
-   Response notifications
    
-   Export report data to CSV/PDF
    
-   Social media integration(sharing api)
    
-   Email sending (api integration to send link/form in email)
# SnapForm
