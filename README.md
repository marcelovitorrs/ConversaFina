Project: ConversaFina
Chatbot aimed at financial education

Description
ConversaFina is a comprehensive service designed to provide personalized financial advice through an interactive chat. The frontend offers a fluid and responsive user experience, while the backend ensures secure and efficient data management.

The project integrates modern technologies such as React, TypeScript, Vite, Express, Firebase, JWT, MongoDB and Ollama to offer a robust and scalable solution.

Features
Frontend:

User Interface for Financial Conversations
Backend integration via REST API
Responsive Design
Interactive Components with TailwindCSS
User authentication with Firebase
Backend:

User Authentication and Authorization with JWT
Secure and Realtime Storage with Firestore
RESTful API
Integration with AI Models via Ollama
Documentation
For detailed documentation, see Documentation (link will be added).

To access documentation locally:

Clone the project.

Follow the setup instructions below.

📝 Index
Starting
How to Run
Development
Authors
🚀 Starting
Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

📋 Prerequisites
Make sure you have installed:

Git
Node.js
npm
Hello
Ollama Models
🔧 Installation
Clone the repository:

git clone https://github.com/marcelovitorrs/ConversaFina.git
Navigate to the project folder:

cd ConversaFina
Install frontend dependencies:

cd ../financial-advice-chat-frontend
npm install
Install backend dependencies

cd ../financial-advice-chat-backend
npm install
Configure the environment variables:

Copy the .env.example file to .env in both financial-advice-chat-frontend and financial-advice-chat-backend folders.
cp .env.example .env
Note: On Windows, manually copy the .env.example file and rename it to .env.

Install Ollama templates:

Open a terminal and run:

ollama run llama3.1
ollama run tim2nearfield/finance
Important: Open CMD, wait for the templates to download and close the terminal after the process is complete.

Download the Firebase project configuration and copy it to financial-advice-chat-backend\src\config, the file must be named adminsdk.json, and can be found in the application console within Firebase

⚙️ How to Run
Open another terminal, navigate to financial-advice-chat-front and run:

npm start Note: It is necessary that the frontend, backend and the Ollama server are running simultaneously for the project to function correctly.

Start the Ollama server:

ollama serve
Start the backend: Open a terminal, navigate to financial-advice-chat-backend and run:

npm run dev
Start the frontend: Open another terminal, navigate to 'financial-advice-chat-frontend' and run:

npm start
Note: It is necessary that the frontend, backend and the Ollama server are running simultaneously for the project to function correctly.

📦 Deploy
Deployment steps will be included in the future.
🛠️ Built with
Frontend:

React - Library for building user interfaces
TypeScript - Programming language
Vite - Build tool
TailwindCSS - CSS Framework
React Router - Route management
Axios - HTTP Client
Firebase - Real-time authentication and services
Zod - Schema validation
Backend:

Node.js - Execution environment
Express - Web Framework
TypeScript - Programming language
Firebase Firestore - Database
JWT - Authentication
Ollama - Integration with AI models
Cheerio - Data Scraping
Puppeteer - Browser automation
DevOps:

Git - Controle de versão
GitHub Actions - CI/CD
✒️ Authors
Henrique Leme de Brito - Lead Developer - GitHub
Marcelo Vitor Ribeiro Santos - Secondary Developer - GitHub
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🎯 Concepts and Architecture
Design Patterns:

MVC (Model-View-Controller)
Architectural Concepts:

Layered Architecture (Presentation, Application/Backend, Data, Infrastructure)
Authentication and Authorization with JWT
AI integration using Ollama
Scraping to collect financial data
Real-time Sync with Firebase Firestore
Data Flow and Interactions:

User authentication
Collection and definition of financial profile
Chat interaction with natural language processing (NLP)
Storage and management of conversation history
Real-time synchronization and updates
📌 Additional Notes
Hosting and Deployment:

Firebase Hosting
Development Tools:

Visual Studio Code with recommended extensions for TypeScript and React
Note: This project is under development and new features and documentation will be added as it progresses.
