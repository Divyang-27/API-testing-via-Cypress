///<reference types="Cypress"/>
import RestAPIs from "../../support/PageObject/pomAPI.cy";

describe("API testing-Simple books", () => {
  const baseURL = "https://simple-books-api.glitch.me";
  const randomEmail = Math.random().toString(5).substring(2);
  let token;
  let id;
  let callApis = new RestAPIs();

  //API authentication
  it("APIauth", () => {
    // Generate a random email for testing purposes to avoid conflicts with existing data
    callApis
      .apiAuth("POST", baseURL, "/api-clients/", {
        clientName: "Divyang",
        clientEmail: "divyang" + randomEmail + "@example.com",
      })
      .then((resToken) => {
        // Store the received access token for making authenticated requests later
        token = resToken;
      });
  });

  //POST ORDER
  it("Post order", () => {
    // Post an order with bookId 1 and customer name "Divyang"
    callApis.postOrder("POST", baseURL, "/orders", token, 201, {
      bookId: 1,
      customerName: "Divyang",
    });
  });

  //POST ORDER
  it("Post order", () => {
    // Post another order with bookId 3 and customer name "Divyang"
    callApis.postOrder("POST", baseURL, "/orders", token, 201, {
      bookId: 3,
      customerName: "Divyang",
    });
  });

  //GET ALL ORDER
  it("Get all orders", () => {
    // Get all the orders placed by the authenticated client
    callApis.getOrder("GET", baseURL, "/orders", token, 200).then((resID) => {
      // Store the ID of the first order in the response for later use
      id = resID;
    });
  });

  //PATCH ORDER
  it("Update order", () => {
    // Update the customer name of the first order to "Sunil"
    callApis.updateOrder("PATCH", baseURL, `/orders/${id}`, token, 204, {
      customerName: "Sunil",
    });
  });

  //GET SINGLE ORDER
  it("Get Single order", () => {
    // Get the details of the first order placed by the authenticated client
    callApis.getSingleOrder("GET", baseURL, `/orders/${id}`, token, 200);
  });

  //DELETE ORDER
  it("Delete order", () => {
    // Delete the first order placed by the authenticated client
    callApis.deleteOrder("DELETE", baseURL, `/orders/${id}`, token, 204);
  });

  //GET BOOKS
  it("Get all books", () => {
    // Retrieve the list of all available books in the API
    callApis.getBooks("GET", baseURL, "/books", token, 200);
  });

  //GET SINGLE BOOK
  it("Get Single book", () => {
    // Get the details of a single book with ID 2
    callApis.getSingleBook("GET", baseURL, "/books/2", token, 200);
  });
});