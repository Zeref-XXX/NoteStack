 
# NoteStack

**A collaborative note-sharing platform for students**

Group_Project is a web application designed to enable students to easily share, browse, and manage study notes. Built with a Node.jsExpress backend and a React frontend, the platform provides secure user authentication, CRUD operations for notes, and a responsive interface.

## Features

- **User Authentication:** Sign up, log in, and secure session management.
- **Note Management:** Create, read, update, and delete study notes.
- **Search \& Filter:** Quickly find notes by subject or keywords.
- **Responsive UI:** Mobile- and desktop-friendly design using React and Tailwind CSS.
- **RESTful API:** Organized Express routes and controllers for backend logic.


## Tech Stack

| Layer | Technology |
| :-- | :-- |
| Frontend | React, Tailwind CSS (PostCSS) |
| Backend | Node.js, Express |
| Database | MongoDB |
| Testing | Jest \& Supertest |
| Environment | dotenv |

## Repository Structure

```
Group_Project/
│
├── backend/                # Server-side code
│   ├── Actions/            # Business logic modules
│   ├── Middleware/         # Auth and error handlers
│   ├── Routes/             # API endpoint definitions
│   ├── controller/         # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── test/               # Backend tests
│   ├── .env                # Environment variables
│   ├── index.js            # Entry point
│   ├── package.json        # Backend dependencies
│   └── .gitignore
│
├── frontend/               # Client-side code
│   ├── src/                # React application source
│   ├── .postcssrc          # Tailwind configuration
│   ├── package.json        # Frontend dependencies
│   └── .gitignore
│
└── README.md               # Project overview (this file)
```


## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Zeref-XXX/Group_Project.git
cd Group_Project
```

2. **Configure environment variables**
In `backend/.env`, set:

```
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
```

3. **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **Run the application**
In separate terminals:

```bash
# Start backend (port 5000)
cd backend
npm start

# Start frontend (port 3000)
cd ../frontend
npm start
```

5. **Access the app**
Open http://localhost:3000 in your browser.

## Testing

- **Backend tests** are written with Jest and Supertest.

```bash
cd backend
npm test
```


## Usage

1. Sign up for an account or log in if you already have one.
2. Create a new note by specifying subject, title, and content.
3. Browse or search existing notes by keyword or subject.
4. Edit or delete your own notes as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements, bug fixes, or new features.

## License

This project is released under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub or contact the maintainers directly.

<div style="text-align: center">⁂</div>

[^1]: https://github.com/Zeref-XXX/Group_Project

[^2]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend

[^3]: https://github.com/Zeref-XXX/Group_Project/tree/main/frontend

[^4]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend/Actions

[^5]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend/Middleware

[^6]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend/Routes

[^7]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend/controller

[^8]: https://github.com/Zeref-XXX/Group_Project/tree/main/backend/models

[^9]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/.env

[^10]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/.gitignore

[^11]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/index.js

[^12]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/package-lock.json

[^13]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/package.json

[^14]: https://github.com/Zeref-XXX/Group_Project/blob/main/backend/test

[^15]: https://github.com/Zeref-XXX/Group_Project/tree/main/frontend/src

[^16]: https://github.com/Zeref-XXX/Group_Project/blob/main/frontend/.gitignore

[^17]: https://github.com/Zeref-XXX/Group_Project/blob/main/frontend/.postcssrc

[^18]: https://github.com/Zeref-XXX/Group_Project/blob/main/frontend/package-lock.json

[^19]: https://github.com/Zeref-XXX/Group_Project/blob/main/frontend/package.json
