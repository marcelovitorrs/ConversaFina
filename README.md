# Project: ConversaFina
Chatbot aimed at financial education

# Description
   ConversaFina is a comprehensive service designed to provide personalized financial advice through an interactive chat. 
   The frontend offers a fluid and responsive user experience, while the backend ensures secure and efficient data 
   management. 
   
   The project integrates modern technologies such as React, TypeScript, Vite, Express, Firebase, JWT, MongoDB and Ollama 
   to offer a robust and scalable solution.

# Prototype
   To build this product, a prototype was developed using the Figma tool, creating a simulation scenario for detecting 
   profiles and also offering the user the option of asking the chatbot a question on the topic of financial education.
   
   *Link:* https://www.figma.com/proto/haNelNu0uFfbbatrxWy2ch/PrototipoFinal?node-id=431-39155&node-type=canvas&t=QTx8K7XSruE8Y8EM-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=431%3A39154

 # Demo Video    
   To facilitate understanding and visualization of how the Conversa Fina tool works, short demonstration videos of the application have been made available:
   
      - 1. User registration: Screen for registering new users in the application.
   
      https://github.com/user-attachments/assets/a9f60c1e-811b-4310-9a35-fbd6894e91c6

      - 2. Registration validation: Screen for validating the new user's registration.
      
      https://github.com/user-attachments/assets/2e070c7a-935a-41a5-927e-0c9cf9ed3c5b

      - 3. Profile assessment: Screen presenting the evaluation of the Financial Education Profile.
      
      https://github.com/user-attachments/assets/72b4c431-452c-4758-bdc5-afcb8fcbacfb

      - 4. Query profile data: User Profile Data Screen.
      
      https://github.com/user-attachments/assets/1d59ea42-8dd2-41df-9d70-0576f9c7922d

      - 5. Chat: Screen showing the user using the chat.
      
      https://github.com/user-attachments/assets/0795708e-df58-4800-810a-e142641be068


               
# Features
- **Frontend:**
  - User Interface for Financial Conversations
  - Backend integration via REST API
  - Responsive Design
  - Interactive Components with TailwindCSS
  - User authentication with Firebase

- **Backend:**
  - User Authentication and Authorization with JWT
  - Secure and Realtime Storage with Firestore
  - RESTful API
  - Integration with AI Models via Ollama
 
# Documentation
  For detailed documentation, see [Documentation](#) (link will be added).

To access documentation locally:

1. Clone the project.
2. Follow the setup instructions below.

3. ### 📝 Index

- [Starting](#starting)
- [How to Run](#how-to-run)
- [Development](#development)
- [Authors](#authors)

## 🚀 Starting

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

### 📋 Prerequisites

Make sure you have installed:

- Git
- Node.js
- npm
- Hello
- Ollama Models

### 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/marcelovitorrs/ConversaFina.git
   ```

2. Navigate to the project folder:

   ```sh
   cd ConversaFina
   ```

3. Install frontend dependencies:

   ```sh
   cd ../financial-advice-chat-frontend
   npm install
   ```

4. Install backend dependencies

   ```sh
   cd ../financial-advice-chat-backend
   npm install
   ```

5. Configure the environment variables:

    - Copy the `.env.example` file to `.env` in both `financial-advice-chat-frontend` and `financial-advice-chat-backend` folders.

     ```sh
     cp .env.example .env
     ```
     **Note:** On Windows, manually copy the `.env.example` file and rename it to `.env`.
      
5.1. Edit the.env file:

5.1.1. Create your project on Firebase: https://console.firebase.google.com/
         
         For the Frontend configuration:
         
            Project folder: financial-advice-chat-frontend
      
5.1.2. Go to your project settings in:

Project Settings → General → SDK setup and configuration → Choose npm
         
REACT_APP_FIREBASE_API_KEY

Public API key used to authenticate Firebase requests.

Location: Firebase Console → Project Settings → General → Your Apps → SDK Configuration

             REACT_APP_FIREBASE_API_KEY=<< FILL WITH YOUR WEB API KEY >>

REACT_APP_FIREBASE_AUTH_DOMAIN

Domain used for Firebase Authentication.

Common format: yourprojectname.firebaseapp.com

             REACT_APP_FIREBASE_AUTH_DOMAIN=<< PROJECTNAME >>.firebaseapp.com

 REACT_APP_FIREBASE_DATABASE_URL
 
 Realtime Database URL (if used).
 
 Format: https://yourprojectname-default-rtdb.firebaseio.com
 
             REACT_APP_FIREBASE_DATABASE_URL=<< DATABASE_URL >>
            
  REACT_APP_FIREBASE_PROJECT_ID
  
  Your Firebase Project ID.
  
  Example: my-project-1234
  
             REACT_APP_FIREBASE_PROJECT_ID=<< PROJECT_ID >>
            
   REACT_APP_FIREBASE_STORAGE_BUCKET
   
   Storage bucket used by Firebase Storage.
   
   Format: yourprojectname.appspot.com
   
             REACT_APP_FIREBASE_STORAGE_BUCKET=<< STORAGE_BUCKET >>
            
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   
   Sender ID used by Firebase Cloud Messaging (FCM).
   
   Example: 123456789012
   
             REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<< MESSAGING_SENDER_ID >>
            
  REACT_APP_FIREBASE_APP_ID
  
  Unique ID of your Firebase app.
  
  Format: 1:123456789012:web:abcdefghij123456
  
             REACT_APP_FIREBASE_APP_ID=<< APP_ID >>
            
  REACT_APP_FIREBASE_MEASUREMENT_ID (optional)
  
  Used for Google Analytics integration.
  
  Format: G-XXXXXXX
  
             REACT_APP_FIREBASE_MEASUREMENT_ID=<< MEASUREMENT_ID >>
            
   REACT_APP_BACKEND_URL
   
             REACT_APP_BACKEND_URL=http://localhost:5000
   
   PORT
   
             PORT=80

   For the Backend configuration:
   
            Project folder: financial-advice-chat-backend
   
5.1.3. Create a DeepL account:

Access the REST API: https://www.deepl.com/translator

Generate your DeepL API Key.

            JWT_SECRET=<< YOUR_JWT_SECRET_KEY >>
            DEEPL_API_KEY=<< YOUR_DEEPL_API_KEY >>
            
6.  Step-by-step: How to fill the adminsdk.json file (Service Account Key)
   
Access the Firebase Console:
https://console.firebase.google.com

-  Select your project:
-  Click on your project's name from the list of available projects.

-  Go to project settings:
-  Click the ⚙️ gear icon on the left sidebar (next to "Project Overview").

-  Select "Project Settings":
-  From the dropdown, choose "Project Settings".

-  Open the "Service accounts" tab:
-  At the top of the settings page, click on the "Service accounts" tab (last tab on the right).

-  Click "Generate new private key":
-  You will see a section titled "Firebase Admin SDK".
-  Click the button “Generate new private key”.

-  Confirm the prompt:
-  A confirmation dialog will appear. Click Confirm.

-  Done!
-  Firebase will automatically generate the .json file and download it directly to your computer.                       

-  Edit the adminsdk.json file and paste the generated code

7. Install Ollama templates:

   Open a terminal and run:

   ```sh
   ollama run llama3.1
   ollama run tim2nearfield/finance
   ```

   **Important:** Open CMD, wait for the templates to download and close the terminal after the process is complete.

8. Download the Firebase project configuration and copy it to `financial-advice-chat-backend\src\config`, the file must be named adminsdk.json, and can be found in the application console within [Firebase](https://console.firebase.google.com/u/1/project/financial-advice-chat/settings/general/web:Mjk1ODQ2M2ItZDg0MS00NWNlLWE2NjgtYjM3MDQ2YjY4MDdj?hl=pt-br)

## ⚙️ How to Run

Open another terminal, navigate to financial-advice-chat-front and run:

npm start
Note: It is necessary that the frontend, backend and the Ollama server are running simultaneously for the project to function correctly.

1. Start the Ollama server:
   
   ```sh
   ollama serve
   ```

2. Start the backend:
   Open a terminal, navigate to `financial-advice-chat-backend` and run:

   ```sh
   npm run dev
   ```

3. Start the frontend:
   Open another terminal, navigate to 'financial-advice-chat-frontend' and run:

   ```sh
   npm start
   ```

**Note:** It is necessary that the frontend, backend and the Ollama server are running simultaneously for the project to function correctly.

### 📦 Deploy

- Deployment steps will be included in the future.

## 🛠️ Built with

- **Frontend:**
  
  - [React](https://reactjs.org/) - Library for building user interfaces
  - [TypeScript](https://www.typescriptlang.org/) - Programming language
  - [Vite](https://vitejs.dev/) - Build tool
  - [TailwindCSS](https://tailwindcss.com/) - CSS Framework
  - [React Router](https://reactrouter.com/) - Route management
  - [Axios](https://axios-http.com/) - HTTP Client
  - [Firebase](https://firebase.google.com/) - Real-time authentication and services
  - [Zod](https://zod.dev/) - Schema validation

- **Backend:**

  - [Node.js](https://nodejs.org/) - Execution environment
  - [Express](https://expressjs.com/) - Web Framework
  - [TypeScript](https://www.typescriptlang.org/) - Programming language
  - [Firebase Firestore](https://firebase.google.com/products/firestore) - Database
  - [JWT](https://jwt.io/) - Authentication
  - [Ollama](https://ollama.com/) - Integration with AI models
  - [Cheerio](https://cheerio.js.org/) - Data Scraping
  - [Puppeteer](https://pptr.dev/) - Browser automation

- **DevOps:**
  - [Git](https://git-scm.com/) - Controle de versão
  - [GitHub Actions](https://github.com/features/actions) - CI/CD

## ✒️ Authors

- Henrique Leme de Brito - _Lead Developer_ - [GitHub](https://github.com/henrique-leme)
- Marcelo Vitor Ribeiro Santos - _Secondary Developer_ - [GitHub]([https://github.com/marcelovitorrs])

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Concepts and Architecture

- **Design Patterns:**

  - **MVC (Model-View-Controller)**

- **Architectural Concepts:**

  - **Layered Architecture** (Presentation, Application/Backend, Data, Infrastructure)
  - **Authentication and Authorization with JWT**
  - **AI integration using Ollama**
  - **Scraping to collect financial data**
  - **Real-time Sync with Firebase Firestore**

- **Data Flow and Interactions:**
  - User authentication
  - Collection and definition of financial profile
  - Chat interaction with natural language processing (NLP)
  - Storage and management of conversation history
  - Real-time synchronization and updates

## 📌 Additional Notes

- **Hosting and Deployment:**

  - [Firebase Hosting](https://firebase.google.com/products/hosting)

- **Development Tools:**
  - [Visual Studio Code](https://code.visualstudio.com/) with recommended extensions for TypeScript and React

---

**Note:** This project is under development and new features and documentation will be added as it progresses.
