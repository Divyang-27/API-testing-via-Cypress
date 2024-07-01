class RestAPIs {
  //API AUTH
  apiAuth(method, baseURL, endpoints, data) {
    // Make an API request to authenticate the client
    return cy
      .request({
        method: method,
        url: baseURL + endpoints,
        body: data,
      })
      .then((response) => {
        // Parse the response body to extract the access token
        const res = JSON.parse(JSON.stringify(response.body));
        expect(res).have.property("accessToken");
        const token = res.accessToken;
        return token;
      });
  }

  // GET ORDER
  getOrder(method, baseURL, endpoint, token, status) {
    // Make an authenticated GET request to retrieve all orders
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Parse the response body and extract the ID of the first order
        const res = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(status);
        expect(res[0]).have.property("id");
        const id = res[0].id;
        return id;
      });
  }

  // GET SINGLE ORDER
  getSingleOrder(method, baseURL, endpoint, token, status) {
    // Make an authenticated GET request to retrieve a single order
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Parse the response body and verify the order ID
        const res = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(status);
        expect(res).have.property("id");
        cy.log(res);
      });
  }

  //POST ORDER
  postOrder(method, baseURL, endpoint, token, status, data) {
    // Make an authenticated POST request to create a new order
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
      .then((response) => {
        // Parse the response body and verify the order creation
        const res = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(status);
        expect(res.created).to.equal(true);
        cy.log(res);
      });
  }

  //UPDATE ORDER
  updateOrder(method, baseURL, endpoint, token, status, data) {
    // Make an authenticated PATCH request to update an existing order
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
      .then((response) => {
        // Verify the response status code
        expect(response.status).to.equal(status);
        cy.log(response.body);
      });
  }

  //DELETE ORDER
  deleteOrder(method, baseURL, endpoint, token, status) {
    // Make an authenticated DELETE request to delete an order
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Verify the response status code
        expect(response.status).to.equal(status);
      });
  }

  //GET BOOKS
  getBooks(method, baseURL, endpoint, token, status) {
    // Make an authenticated GET request to retrieve all available books
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Parse the response body and log the book data
        const res = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(status);
        cy.log(res);
      });
  }

  //GET SINGLE BOOKS
  getSingleBook(method, baseURL, endpoint, token, status) {
    // Make an authenticated GET request to retrieve a single book
    return cy
      .request({
        method: method,
        url: baseURL + endpoint,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Parse the response body and log the book data
        const res = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(status);
        cy.log(res);
      });
  }
}

export default RestAPIs;