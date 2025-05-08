const request = require("supertest");
const app = require("../app");
const db = require("../models");

// // Initialize a test user
const testUser = {
  location_code: "ch05",
  name: "chennai",
  description: "the location",
  organization_id: 3,
  parent_org_location_id: 11,
};

// Jest test suite for User CRUD operations
describe("orgLocation CRUD", () => {
  // Create a new orgLocation
  it("should create a new orgLocation", async () => {
    const response = await request(app)
      .post("/api/v1/orgLocation/")
      .send(testUser);

    expect(response.statusCode).toBe(200);
  });
});

// Read  All orgLocation details
it("should retrieve orgLocation details", async () => {
  const response = await request(app).get("/api/v1/orgLocation/");

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Read  only one orgLocation details
it("should retrieve orgLocation detail", async () => {
  const response = await request(app).get("/api/v1/orgLocation/");

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Update orgLocation details
it("should update orgLocation details", async () => {
  const id = 1;
  const updatedUser = {
    location_code: "ch01",
    name: "chennai1",
    description: "the location  end",
  };

  const response = await request(app)
    .put(`/api/v1/orgLocation/${id}`)
    .send(updatedUser);

  expect(response.statusCode).toBe(200);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
});

// Delete a orgLocation
it("should delete a orgLocation", async () => {
  const id = 1;
  const response = await request(app).delete(`/api/v1/orgLocation/${id}`);

  expect(response.statusCode).toBe(204);

  const deletedUser = await db.auditAgenciesModel.findByPk(id);
  expect(deletedUser).toBeNull();
});
