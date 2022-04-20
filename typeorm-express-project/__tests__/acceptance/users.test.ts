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
  await connection.close();
  await server.close();
})


// it('should be no users initially', async () => {
//   const response = await request(app).get('/user');
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({ data: [] });
// });

// it('should be no blogs initially', async () => {
//   const response = await request(app).get('/blogs');
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({ data: [] });
// });

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

// it('should create a blog', async () => {
//   const response = await request(app).post('/blogs').send({
//     "Subject": "not done with relation",
//     "Content": "relation",
//     "Blog_Created_Date": "12/03/2021",
//   });
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({
//     data: {
//       "Subject": "not done with relation",
//       "Content": "relation",
//       "Blog_Created_Date": "12/03/2021",
//       "id": 1
//     }
//   });
// });

it('should not create a user if no firstName is given', async () => {
  const response = await request(app).post('/user').send(
    {
      "FirstName": "debiprasad",
      "MobileNo": "7894977757",
      "Email": "dpdash251@gmail.com",
      "UserName": "prasant",
      "Password": "Dev0379"
    });
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
});

it('should not create a user if mobile number is less than 10', async () => {
  const response = await request(app).post('/users').send({
    "FirstName": "debiprasad",
    "LastName": "behera",
    "MobileNo": "789477757",
    "Email": "dpdash2@gmail.com",
    "UserName": "prasant",
    "Password": "Dev0379"
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.errors).not.toBeNull();
});

it('should not create a user if wrong email or registered email id given', async () => {
  const response = await request(app).post('/users').send({
    "FirstName": "debiprasad",
    "LastName": "behera",
    "MobileNo": "789477757",
    "Email": "dpdash2gmail.com",
    "UserName": "prasant",
    "Password": "Dev0379"
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.errors).not.toBeNull();
});

it('should not create a user if password does not contain alpha numeric', async () => {
  const response = await request(app).post('/users').send({
    "FirstName": "debiprasad",
    "LastName": "behera",
    "MobileNo": "789477757",
    "Email": "dpdash2gmail.com",
    "UserName": "prasant",
    "Password": "Dev0379"
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.errors).not.toBeNull();
});