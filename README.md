# Playwright Test Automation Framework

A comprehensive Playwright testing framework for end-to-end testing of web applications.

## Project Structure

```
PlaywrightNewProject/
├── tests/                    # Test files directory
│   └── example.spec.ts      # Example test file
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Installation

1. Install dependencies:
```bash
npm install
```

This will install Playwright and all required dependencies.

## Running Tests

- **Run all tests:**
  ```bash
  npm test
  ```

- **Run tests in headed mode (see browser):**
  ```bash
  npm run test:headed
  ```

- **Run tests with UI mode (interactive):**
  ```bash
  npm run test:ui
  ```

- **Debug tests:**
  ```bash
  npm run test:debug
  ```

- **Generate test code (Codegen):**
  ```bash
  npm run codegen
  ```

## View Test Reports

After running tests, view the HTML report:
```bash
npm run test:report
```

## Configuration

The `playwright.config.ts` file contains all configuration settings:

- **Test Directory:** `./tests` - Where test files are located
- **Browsers:** 
  - Chromium
  - Firefox
  - WebKit
  - Mobile Chrome (Pixel 5)
  - Mobile Safari (iPhone 12)
  - Microsoft Edge

- **Features:**
  - Parallel test execution
  - Automatic retries on CI
  - Screenshots on failure
  - HTML reporting
  - Trace recording

## Writing Tests

Example test structure:

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example');
});
```

## Best Practices

1. Use specific locators (getByRole, getByLabel, etc.)
2. Wait for elements to be ready (Playwright does this automatically)
3. Use assertions to verify expected behavior
4. Organize tests by feature or page
5. Use fixtures for common setup/teardown

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## License

ISC
