describe("Home Page E2E Test", () => {
  beforeEach(() => {
    // Visita la página principal
    cy.visit("/");
  });

  it("should render the header correctly", () => {
    cy.get("header").within(() => {
      cy.contains("Frontend Mentor").should("be.visible");
      cy.contains("Feedback Board").should("be.visible");
      cy.get('button[aria-label="user"]').should("be.visible");
    });
  });

  it("should display feedbacks correctly", () => {
    // Check if feedbacks are displayed
    cy.get("main").within(() => {
      cy.get("div").should("have.length.greaterThan", 0); // Assuming each feedback item has a class 'feedback'
    });
  });
});
