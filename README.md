hoortrade-tt-back

API REST Node.js + Express + TypeScript + Mongoose pour gérer des utilisateurs et des produits.
Auth par JWT stocké en cookie HttpOnly (middleware requireAuth).
Validation Zod côté contrôleurs + contraintes Mongoose côté modèles.

🚀 Stack

Runtime: Node.js + TypeScript

Framework: Express (v5)

DB: MongoDB / Mongoose

Auth: JWT (cookies HttpOnly)

Validation: Zod

Tests: Jest + Supertest + mongodb-memory-server

📦 Installation

# 1) Cloner

git clone <repo-url> && cd hoortrade-tt-back

# 2) Installer

npm install

⚙️ Configuration

Créer un fichier .env à la racine :

# MongoDB

MONGO_URI=mongodb://127.0.0.1:27017/hoortrade-tt

# JWT

JWT_SECRET=changeme-super-secret

# Env

NODE_ENV=development

# (optionnel) Port – sinon 5000

PORT=5000

⚠️ CORS + Cookies : côté front, on utilise credentials: "include".
Configurez CORS côté serveur avec une origine explicite (ex. http://localhost:3000) — pas "\*" — pour que les cookies circulent correctement.

▶️ Démarrer

# Dev local (charge .env)

npm run start:local

# Ou (installe les devDeps puis lance – utile sur env vierge)

npm start

Par défaut : http://localhost:5000.

🧪 Tests
npm test

Tests unitaires & d’intégration (routes produits) via Jest & Supertest

mongodb-memory-server démarre une base in-memory (aucune dépendance à une DB locale)

📁 Structure (simplifiée)
.
├─ server.ts # bootstrap Express, middlewares, routes
├─ routes.ts # montage des routers
├─ src/
│ ├─ config/
│ │ └─ db.ts # connexion Mongo + gestion erreurs
│ ├─ controllers/
│ │ ├─ user.controller.ts
│ │ └─ product.controller.ts
│ ├─ middlewares/
│ │ └─ auth.middleware.ts # requireAuth (JWT en cookie)
│ ├─ models/
│ │ ├─ user.model.ts
│ │ └─ product.model.ts
│ ├─ routes/
│ │ ├─ user.routes.ts
│ │ └─ product.routes.ts
│ └─ validators/
│ ├─ user.validator.ts
│ └─ product.validator.ts
└─ tests/ # jest + supertest + db in-memory

🔐 Authentification

À la connexion/inscription, le serveur émet un cookie jwt HttpOnly, sameSite=strict, secure en prod.

Les routes produits sont protégées par requireAuth.

Headers/CORS côté serveur (exemple) :

cors({
origin: ["http://localhost:3000"], // pas "\*"
credentials: true,
methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
allowedHeaders: ["Content-Type","Authorization"],
})

🛣️ Endpoints (principaux)
Auth / Users

POST /create-user — inscription
Body: { name, email, password }
201 → { user: userId } + cookie jwt

POST /login — connexion
Body: { email, password }
200 → { \_id, name, email } + cookie jwt
401 → { error: "Incorrect email|password" }

POST /logout — déconnexion (clear cookie)
200 → { message: "User logged out" }

GET /check-auth — utilisateur courant (si cookie valide)
200 → { \_id, name, email }
401 → { error: "Authentication required" }

Products (protégés par requireAuth)

POST /create-product
Body: { name, description, price, image, category, stock }
201 → Product

GET /retrieve-products
200 → Product[] (triés par createdAt desc)

GET /retrieve-product/:productId
200 → Product
404/400 → { error }

PUT /update-product/:productId
Body: champs partiels acceptés (validation Zod)
200 → Product

DELETE /delete-product/:productId
200 → { message: "Product deleted successfully" }

Les mots de passe sont hashés en pre('save') (bcrypt).
toJSON() sur User supprime le champ password.
