const request = require("supertest");
const app = require("../app");
const db = require("../models");

// // Initialize a test user
const testUser = {
  establishment_name: "keerthi",
  proprietor_name: "demo",
  gst_number: "q3",
  esi_number: "qwer",
  epf_number: "4321546",
  labour_number: "67",
  type: "ryt1",
  organisation_id: 1,
  line_1: "qwertey",
  line_2: "qwerty",
  line_3: "qwerty",
  landmark: "qwerty",
  city: "qwerty",
  state: "qwerty",
  pincode: 605803,
  district: "qwerty",
  category: "qwergth",
  contact_detail: "qwertyu",
  add_info: "qwertyu",
  is_primary: false,
  contact_type_code_id: 1,
};

// Jest test suite for User CRUD operations
describe("serviceProvider CRUD", () => {
  // Create a new serviceProvider
  it("should create a new serviceProvider", async () => {
    const response = await request(app)
      .post("/api/v1/serviceProviders/")
      .send(testUser);

    expect(response.statusCode).toBe(200);
  });
});

// Read  All service Provider details
it("should retrieve serviceProvider details", async () => {
  const response = await request(app).get("/api/v1/serviceProviders/");

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Read  only one serviceProvider details
it("should retrieve serviceProvider detail", async () => {
  const response = await request(app).get("/api/v1/serviceProviders/");

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Update service Provider details
it("should update serviceProvider details", async () => {
  const id = 1;
  const updatedUser = {
    establishment_name: "vishnu",
    proprietor_name: "Vishnu",
  };

  const response = await request(app)
    .put(`/api/v1/serviceProviders/${id}`)
    .send(updatedUser);

  expect(response.statusCode).toBe(200);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
});

// Delete a service Provider
it("should delete a serviceProvider", async () => {
  const id = 1;
  const response = await request(app).delete(`/api/v1/serviceProviders/${id}`);

  expect(response.statusCode).toBe(204);

  const deletedUser = await db.serviceProviderModel.findByPk(id);
  expect(deletedUser).toBeNull();
});
