import { createConnection } from "typeorm"
import { app } from "../../src/app";
import * as request from "supertest"
import { port } from "../../src/config";


let connection, server;

const testUser = {
    "FirstName": "debiprasad",
    "LastName": "behera",
    "MobileNo": "789497757",
    "Email": "dpdash@gmail.com",
    "UserName": "prasant",
    "Password": "Dev0379"
  };

beforeEach(async () => {
    connection = await createConnection();
    await connection.synchronize();
    server = app.listen(port);

})

afterEach(async()=>{
connection.close();
server.close();
})


it('should be no users initially', async() => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });