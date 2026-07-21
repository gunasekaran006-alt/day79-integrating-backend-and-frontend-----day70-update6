# Day 79: Full-Stack Integration & CRUD Operations


---

## 🚀 Key Learning Objectives

- **Bearer Token Injection:** Dynamic passing of JWT tokens inside HTTP `Authorization` headers (`Bearer <token>`) for all Axios CRUD requests.
- **Task Ownership Rendering:** State synchronization inside React components ensuring users view and manipulate only their personal task records.
- **Full CRUD Workflow:** Implemented complete Create, Read, Update, and Delete operations between React state forms and Mongoose controllers.
- **Token Decoding:** Integrated `jwt-decode` on the client side to display personalized user greetings based on token payload.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Axios, `jwt-decode`, React Router v7, Tailwind CSS v4
- **Backend:** Node.js, Express.js v5, MongoDB Atlas, Mongoose v9, Bcryptjs

---

## 🔌 API Integration Matrix

| UI Action | HTTP Method | Endpoint | Authorization |
| :--- | :--- | :--- | :--- |
| **Fetch Tasks** | `GET` | `/tasks` | `Bearer <token>` |
| **Create Task** | `POST` | `/tasks` | `Bearer <token>` |
| **Update Task** | `PUT` | `/tasks/:id` | `Bearer <token>` |
| **Delete Task** | `DELETE` | `/tasks/:id` | `Bearer <token>` |

---

