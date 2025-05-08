const request = require("supertest");
const app = require("../app");
const db = require("../models");

// // Initialize a test user
const testUser = {
  legal_name: "vishnu",
  display_name: "fhdbfh",
  gst_number: "qwer",
  org_code: "123",
  org_type_code_id: 1,
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
describe("organisation CRUD", () => {
  // Create a new organisation
  it("should create a new organisation", async () => {
    const response = await request(app)
      .post("/api/v1/organisation/")
      .send(testUser);

    expect(response.statusCode).toBe(200);
  });
});

// Read  All auditAgency details
it("should retrieve organisation details", async () => {
  const response = await request(app).get("/api/v1/organisation/");

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Read  only one auditAgency details
it("should retrieve organisation detail", async () => {
  const id = 1;
  const response = await request(app).get(`/api/v1/organisation/${id}`);

  expect(response.statusCode).toBe(200);
  // expect(response.body.proprietor_name).toBe(testUser.proprietor_name);
  // expect(response.body.establishment_name).toBe(testUser.establishment_name);
});

// Update auditAgency details
it("should update organisation details", async () => {
  const id = 1;
  const updatedUser = {
    legal_name: "vishnu",
    display_name: "keerthi",
  };

  const response = await request(app)
    .put(`/api/v1/organisation/${id}`)
    .send(updatedUser);

  expect(response.statusCode).toBe(200);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
  // expect(response.body.establishment_name).toBe(updatedUser.establishment_name);
});

// Delete a auditAgency
it("should delete a organisation", async () => {
  const id = 1;
  const response = await request(app).delete(`/api/v1/organisation/${id}`);

  expect(response.statusCode).toBe(204);

  const deletedUser = await db.organisationsModel.findByPk(id);
  expect(deletedUser).toBeNull();
});
