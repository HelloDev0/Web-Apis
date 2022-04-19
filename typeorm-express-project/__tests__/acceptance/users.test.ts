import { createConnection } from "typeorm"
import { app } from "../../src/app";
import * as request from "supertest"
import { port } from "../../src/config";


let connection, server;

let testUser = {
  "FirstName": "debiprasad",
  "LastName": "behera",
  "MobileNo": "7894977757",
  "Email": "dpdash2@gmail.com",
  "UserName": "prasant",
  "Password": "Dev0379",
};

beforeEach(async () => {
  connection = await createConnection();
  await connection.synchronize();
  server = app.listen(port);

})

afterEach(async () => {
  connection.close();
  server.close();
})


// it('should be no users initially', async () => {
//   const response = await request(app).get('/user');
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({ data: [] });
// });

it('should be no blogs initially', async () => {
  const response = await request(app).get('/blogs');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ data: [] });
});

// it('should create a user', async () => {
//   const response = await request(app).post('/user').send(testUser);
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({
//     data: {
//       "FirstName": "debiprasad",
//       "LastName": "behera",
//       "MobileNo": "7894977757",
//       "Email": "dpdash2@gmail.com",
//       "UserName": "prasant",
//       "Password": "Dev0379",
//       "id": 1
//     }
//   });
// });