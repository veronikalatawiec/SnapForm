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

-   As a user, I want to be learn about SnapForm before creating an account.
-   
-   As a user, I want to be able to easily create an account, so I can start making forms.
    
-   As a user, I want to be able to login to my account, to create and manage my forms.
    
-   As a user, I want to access the platform on mobile devices, so I can manage forms and responses while on the go.
    
-   As a logged in user, I want to create a form, so I can start collecting feedback.
	-  As a logged in user, I want to add headers and paragraphs to forms to better inform responders.
	-  As a logged in user, I want to add long and short text input questions to my form.
	-  As a logged in user, I want to add multiple choice questions.
 	-  As a logged in user, I want to add checkbox questions.
    
-   As a logged in user, I want to easily launch/share my form with others via a link, so I can collect responses quickly and efficiently.

-   As a logged in user, I want to be able to take down/private my existing form at any point, so I can stop receiving responses .
    
-   As a logged in user, I want to be able to delete a form I am no longer using.

-   As a logged in user, I want to be able to view the responses for a specific form.

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
   

#### Server Libraries

- CORS

- Knex.js

 - argon2

- jsonwebtoken(JWT)

### API's

There is currently no plan to link Snap Form to an external API.

### Sitemap

-   Landing Page

-   Sign up
    
-   Sign In

-   User Home
    
	-   Form Create
    
	-   Form Responses

- Hosted/Active Form

- Thank you For Submitting Page
 
### Mockups

![low-fi-wireframes](https://github.com/user-attachments/assets/e8a61870-4e4d-48bb-8ac7-11a77bb9085f)

### Data

<img width="1321" alt="sql-diagram" src="https://github.com/user-attachments/assets/171b09b0-9227-4e0a-b86c-a7df7e2e009c" />


# API Endpoints

## POST /users

**Description:**  
Creates a new user and returns the authentication token.

**Parameters:**  
- **email**: User’s email as a string  
- **password**: User’s password as a string  

**Response:**
```
{
  "message": "Successfully created user",
  "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
## POST /users/login

**Description:**  
Authenticates a user sign in and returns the JWT for other requests.

**Parameters:**  
- **email**: User’s email as a string  
- **password**: User’s password as a string  

**Response:**
```
{
  "message": "Successfully signed in",
  "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
## GET /:user_id/forms

**Description:**  
Retrieves all forms created by the logged in user.

**Parameters:**  
- **Authentication token**: (in header)  
- **user_id**: User’s ID as an integer  

**Response:**
```
[
  {
    "form_id": 1,
    "name": "Customer Feedback",
    "status": true,
    "design_object": { "theme": "default" },
    "total_responses": 10,
    "created": "2025-01-01T12:00:00Z",
    "updated": "2025-01-02T12:00:00Z",
    "sections": [
      { "type": "text", "label": "What did you like about the product?", "options": null },
      { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"] }
    ]
  },
  { ... }
]
```
## GET /:user_id/forms/:id

**Description:**  
Retrieves details of a specific form for the logged in user.

**Parameters:**  
- **Authentication token**: (in header)  
- **user_id**: User’s ID as an integer  
- **id**: Form’s ID as an integer  

**Response:**
```
{
  "form": {
    "form_id": 1,
    "name": "Customer Feedback",
    "status": true,
    "design_object": { "theme": "default" },
    "total_responses": 10,
    "created": "2025-01-01T12:00:00Z",
    "updated": "2025-01-02T12:00:00Z"
  },
  "sections": [
    { "type": "text", "label": "What did you like about the product?", "options": null },
    { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"] }
  ]
}
```
## GET /forms/live/:user_id/:id

**Description:**  
Retrieves a live version of a specific form for public access by the logged in user.

**Parameters:**  
- **user_id**: User’s ID as an integer  
- **id**: Form’s ID as an integer  

**Response:**
```json
{
  "form": {
    "form_id": 1,
    "name": "Customer Feedback",
    "status": true
  },
  "sections": [
    { "type": "text", "label": "What did you like about the product?", "options": null, "id": 1 },
    { "type": "radio", "label": "Would you recommend this product?", "options": ["Yes", "No"], "id": 2 }
  ]
}
```
## POST /:user_id/forms

**Description:**  
Creates a new form associated with the user.

**Parameters:**  
- **Authentication token**: (in header)  
- **name**: Name of the form as a string  
- **status**: Form’s "active" state as a boolean  
- **sections**: Array of form section objects  
- **design_object**: Design aspects as an object  

**Response:**
```
{ "form_id": 1 }
```
## PUT /:user_id/forms/:id

**Description:**  
Updates an existing form associated with the user.

**Parameters:**  
- **Authentication token**: (in header)  
- **id**: Form’s ID as an integer  
- **name**: Name of the form as a string  
- **status**: Form’s "active" state as a boolean  
- **sections**: Array of form section objects  
- **design_object**: Updated design aspects as an object  

**Response:**
```
{
  "message": "Form successfully updated",
  "form_id": 1,
  "form": { ...updated form object... }
}
```
## DELETE /:user_id/forms/:id

**Description:**  
Deletes an existing form associated with the user.

**Parameters:**  
- **Authentication token**: (in header)  
- **id**: Form’s ID as an integer  

**Response:**
```json
{ "message": "Form deleted successfully" }
```
## GET /forms/response/:user_id/:id

**Description:**  
Retrieves the responses for a specific form for the logged in user.

**Parameters:**  
- **Authentication token**: (in header)  
- **user_id**: User’s ID as an integer  
- **id**: Form’s ID as an integer  

**Response:**
```json
{
  "totalResponses": 5,
  "responses": [
    {
      "form_id": 1,
      "form_section_id": 2,
      "content": "User response here"
    },
    { ... }
  ]
}
```
## POST /forms/response/:user_id/:id

**Description:**  
Submits responses for a public form.

**Parameters:**  
- **In the request body:**  
  - **responses**: An array of objects where each object contains:  
    - **form_section_id**: Form section ID as an integer  
    - **content**: User's response as a string  

**Response:**
```json
{
  "message": "Responses submitted successfully",
  "responses": [
    {
      "form_section_id": 1,
      "content": "Answer 1",
      "created": "2025-01-01T12:00:00Z"
    },
    { ... }
  ]
}
```

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

-  Form Editing
-  Form Analytics
-  Modernize site layout/UI
-  Form Templates for a quick start (3-5 initially?)
-  Individual response detailed view
    
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
