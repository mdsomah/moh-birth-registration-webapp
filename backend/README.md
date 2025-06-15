## Backend/Server

<!-- Backend Description -->

#### <span style="color: red">Backend Description:</span>

ROMMTech eSalesPOS is a **web based** inventory, retails management and point of sales system.

---

</br>

<!-- Backend Stacks -->

> Backend:

- <span style="color: skyBlue">JavaScript</span>
- <span style="color: skyBlue">Node.JS</span>
- <span style="color: skyBlue">Express.JS</span>
- <span style="color: skyBlue">REST APIs</span>
- <span style="color: skyBlue">Socket.IO Server</span>
- <span style="color: skyBlue">PostgreSQL 15</span>
- <span style="color: skyBlue">Prisma</span>
- <span style="color: skyBlue">Mocha.JS</span>
- <span style="color: skyBlue">JWT</span>
- <span style="color: skyBlue">Passport.JS</span>

</br>

<!-- Scripts -->

> Scripts:

- <span style="color: skyBlue">"start": "node ./src/server.js",</span>
- <span style="color: skyBlue">"dev": "nodemon ./src/server.js",</span>
- <span style="color: skyBlue">"prod": "nodemon ./src/server.js",</span>
- <span style="color: skyBlue"> "start-dev": "cross-env NODE_ENV=development npm run dev",
  </span>
- <span style="color: skyBlue"> "start-prod": "cross-env NODE_ENV=production npm run prod",
  </span>
- <span style="color: skyBlue"> "backend-frontend": "concurrently \"npm run start-dev\" \"cd ../client && npm start\" ",
  </span>
- <span style="color: skyBlue"> "migrate": "npx prisma migrate dev",
  </span>
- <span style="color: skyBlue"> "debug": "cross-env DEBUG=ROMMTech-eSales-POS-Backend npm run start-dev",
  </span>
- <span style="color: skyBlue"> "lint:fix": "npx eslint --fix ./\*.js"
  </span>
- <span style="color: skyBlue">"test": "mocha"</span>

  </br>

  ### Start Sever:

  `npm run start-dev`

  </br>

<!-- Dependencies & Packages -->

> Dependencies & Packages:

- <span style="color: skyBlue">"@prisma/client": "^5.7.0",</span>
- <span style="color: skyBlue">"async": "^3.2.5",</span>
- <span style="color: skyBlue">"bcrypt": "^5.1.1",</span>
- <span style="color: skyBlue">"colors": "^1.4.0",</span>
- <span style="color: skyBlue">"compression": "^1.7.4",</span>
- <span style="color: skyBlue">"cookie-parser": "^1.4.6",</span>
- <span style="color: skyBlue">"cookie-session": "^2.0.0",</span>
- <span style="color: skyBlue">"cors": "^2.8.5",</span>
- <span style="color: skyBlue">"dayjs": "^1.11.10",</span>
- <span style="color: skyBlue">"debug": "^4.3.4",</span>
- <span style="color: skyBlue">"dotenv": "^16.3.1",</span>
- <span style="color: skyBlue">"express": "^4.18.2",</span>
- <span style="color: skyBlue">"express-async-handler": "^1.2.0",</span>
- <span style="color: skyBlue">"express-validator": "^7.0.1",</span>
- <span style="color: skyBlue">"http-errors": "^2.0.0",</span>
- <span style="color: skyBlue">"jsonwebtoken": "^9.0.2",</span>
- <span style="color: skyBlue">"keygen": "^0.4.0",</span>
- <span style="color: skyBlue">"keygrip": "^1.1.0",</span>
- <span style="color: skyBlue">"lodash": "^4.17.21",</span>
- <span style="color: skyBlue">"morgan": "^1.10.0",</span>
- <span style="color: skyBlue">"multer": "^1.4.5-lts.1",</span>
- <span style="color: skyBlue">"nanoid": "^3.3.6",</span>
- <span style="color: skyBlue">"nodemailer": "^6.9.7",</span>
- <span style="color: skyBlue">"passport": "^0.7.0",</span>
- <span style="color: skyBlue">"passport-jwt": "^4.0.1",</span>
- <span style="color: skyBlue">"passport-local": "^1.0.0",</span>
- <span style="color: skyBlue">"sharp": "^0.33.0",</span>
- <span style="color: skyBlue">"socket.io": "^4.7.2",</span>
- <span style="color: skyBlue">"statuses": "^2.0.1",</span>
- <span style="color: skyBlue">"uuid": "^9.0.1",</span>
- <span style="color: skyBlue">"winston": "^3.11.0"</span>

</br>

<!-- DevDependencies & Packages -->

> DevDependencies & Packages:

- <span style="color: skyBlue">"chai": "^5.0.0",</span>
- <span style="color: skyBlue">"concurrently": "^8.2.2",</span>
- <span style="color: skyBlue">"cross-env": "^7.0.3",</span>
- <span style="color: skyBlue">"eslint": "^8.55.0",</span>
- <span style="color: skyBlue">"mocha": "^10.2.0",</span>
- <span style="color: skyBlue">"nodemon": "^3.0.2",</span>
- <span style="color: skyBlue">"prisma": "^5.7.0"</span>
