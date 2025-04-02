# Secretly - Local Secret Manager

**Secretly** is a web application that helps you securely manage environment variables, API keys, and other sensitive data for multiple projects. It provides a friendly user interface for adding, viewing, and editing secrets, plus an activity log to track changes over time.

---

## Screenshots

<img alt="Secretly UI Screenshot" src=".\secretly_screnshot.png" title="Secretly UI Screenshot"/>

---

## How It Works

1. **Create a Project**  
   In the sidebar, click the + icon next to Projects to open the form for creating a new project. Provide a name and any other required details, then confirm to finalize the creation.<br><br>

2. **Add or Update Secrets**  
   Once you have created or selected a project, click Add Secret to open a form for creating a new secret. Enter the necessary information and click Save.<br><br>

3. **Action's Menu**
    - **Show/Hide:** Click the “eye” or “view” icon to temporarily reveal the secret’s value.
    - **Edit:** Click the "edit" icon to enable an inline editor; confirm or discard your updates as needed.
    - **Delete:** Click the "trash" icon to remove a secret from the project. You will be prompted to confirm the deletion.<br><br>

4. **Check Recent Activity**  
   The Recent Activity section provides a chronological log of all actions and changes made in each project, allowing you to keep track of updates and review any modifications.
---

## Installation & Setup

### Developer guide

   - Edit the .env.example and rename it to .env, there you can config the application
   - Run the build_script.ps1 file, this will package the backend using the environment variables defined before (NOTE: execute it every time you change the backend code)
   - Run the docker-compose.yml file at the root of the project, this will
   - Run "npm run dev" inside the /frontend directory, this will start the Vite dev server.

### User guide

***TO-DO: Make the application run by docker compose. Dockerize frontend and backend, upload to docker-hub***
