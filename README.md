# IntegrationTestingFramework
## Please, use your own user to run tests for now !!!
## Run commands:

  ### Run test with userName/password parameters:  
  ### **login='userName' password='password' npx playwright test**

  Runs all the end-to-end tests:  
  **npx playwright test**
    
  Starts the interactive UI mode:  
  **npx playwright test --ui**
    

  Runs the tests only on Desktop Chrome:  
  **npx playwright test --project=chromium**
  

  Runs the tests in a specific file:  
  **npx playwright test example**
    

  Runs the tests in debug mode:  
  **npx playwright test --debug**
    

  Auto generate tests with Codegen:  
  **npx playwright codegen**
    

## Playwright Test configuration:   
 ./playwright.config.ts

## Visit  
https://playwright.dev/docs/intro for more information. ✨
