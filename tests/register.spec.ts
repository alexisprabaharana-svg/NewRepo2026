import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Fill registration form with Kiran details', async ({ page }) => {
  // Read data from JSON file
  const dataPath = path.join(__dirname, '../data/register_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const testData = JSON.parse(rawData);
  
  // Get Kiran's details
  const kiranData = testData.users.find((user: any) => user.name === 'Kiran');
  
  if (!kiranData) {
    throw new Error('Kiran data not found in register_data.json');
  }

  // Navigate to registration page
  await page.goto('https://demo.automationtesting.in/Register.html');

  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Wait for form to be visible
  await page.waitForSelector('form', { timeout: 10000 });

  // Fill First Name - using different selector approaches
  const firstNameInput = page.locator('input[ng-model="FirstName"]');
  if (await firstNameInput.isVisible()) {
    await firstNameInput.fill(kiranData.name);
    console.log('✅ Filled First Name: ' + kiranData.name);
  }

  // Fill Last Name (if available)
  const lastNameInput = page.locator('input[ng-model="LastName"]');
  if (await lastNameInput.isVisible()) {
    await lastNameInput.fill(kiranData.name);
    console.log('✅ Filled Last Name: ' + kiranData.name);
  }

  // Fill Email - try multiple selectors
  const emailInputs = [
    page.locator('input[ng-model="EmailAdress"]'),
    page.locator('input[placeholder*="mail"]'),
    page.locator('input[type="email"]')
  ];
  
  for (const emailInput of emailInputs) {
    if (await emailInput.isVisible()) {
      await emailInput.fill(kiranData.email);
      console.log('✅ Filled Email: ' + kiranData.email);
      break;
    }
  }

  // Fill Phone
  const phoneInput = page.locator('input[ng-model="Phone"]');
  if (await phoneInput.isVisible()) {
    await phoneInput.fill(kiranData.phone);
    console.log('✅ Filled Phone: ' + kiranData.phone);
  }

  // Small delay to ensure fields are filled
  await page.waitForTimeout(1000);

  // Create screenshots folder if it doesn't exist
  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Take full page screenshot
  const screenshotPath = path.join(screenshotsDir, `registration_form_${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('✅ Screenshot taken and saved to: ' + screenshotPath);

  console.log('✅ Registration form filled with Kiran details');
  console.log('✅ Form NOT submitted as requested');
});
