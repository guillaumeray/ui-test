
# Cypress Test Suite: Chat Application

This document provides step-by-step instructions to set up and run the Cypress test suite for the chat application.

## Prerequisites

Before you can run the Cypress tests, ensure you have the following installed on your machine:

1. **Node.js** (version 20 or later)
2. **npm** (Node Package Manager)
3. **Cypress** (installed via npm)
4. **Git** (optional, if cloning the repository)
5. **Docker** (if running tests in Docker)

## Setup Instructions

### 1. Clone the Repository
If you haven’t already cloned the repository, do so by running:
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies:
```bash
npm install
```

### 3. Copy browser cookies
In your personal browser, make sure you are already login in mistral.ai and have access to [the chat](https://chat.mistral.ai/chat)
In order to run chat page test you need to copy / paste your browser cookie list in following file : 
```
support/cookies.json
```

## Running the Tests

### 1. Run Tests in Headless Mode
To run the tests in a headless browser, execute:
```bash
npx cypress run
```
### 2. Run Tests in live Browser
To run the tests in a open local browser, execute:
```bash
npx cypress run --headed
```
### 3. Run Tests in Docker
To run Cypress tests using Docker, follow these steps:

#### Step 1: Build the Docker Image
If you don’t already have a Cypress Docker image, build it:
```bash
docker build -t cypress-tests .
```

#### Step 2: Run the Tests in Docker
Run the following command to execute tests in Docker:
```bash
docker run cypress-tests
```

### 3. Run Specific Test Files
To run specific test files, use:
```bash
npx cypress run --spec "cypress/e2e/chat.cy.ts"
```

## Tests retry and output

### Test retry 1 time before to fail
Its possible to modify the default test retry in cypress.config.ts

### Screenshot as default output
Each time a test fail screenshot are generated in cypress/screenshots

## Writing Custom Tests
To write custom tests, add new test files to the `cypress/e2e/` folder. Use the provided sample test structure to guide your implementations. Make sure to:
- Use descriptive `it` block names.
- Follow the existing naming conventions.
- Keep tests modular and reusable where possible.

## Troubleshooting

1. **Dependencies not installed:** Run `npm install` to ensure all required dependencies are installed.
2. **Cypress version issues:** Check the installed Cypress version using `npx cypress --version` and update it if necessary using `npm install cypress@latest`.
3. **File upload issues:** Verify that the `cypress-file-upload` plugin is installed and configured correctly in your tests.
4. **Npx do not work** You can execute cypress in node_modules : `node_modules/.bin/cypress run`

## License
This test suite is provided under the [MIT License](LICENSE).

---

For additional information on Cypress, visit the [official Cypress documentation](https://docs.cypress.io).

