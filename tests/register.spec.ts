import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { RegisterPage } from '../pages/registerPage';

test('Fill registration form with Kiran details', async ({ page }) => {
  // Initialize RegisterPage POM
  const registerPage = new RegisterPage(page);

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
  await registerPage.navigateToRegisterPage();

  // Fill registration form with Kiran's details
  await registerPage.fillFirstName(kiranData.name);
  await registerPage.fillLastName(kiranData.name);
  await registerPage.fillEmail(kiranData.email);
  await registerPage.fillPhone(kiranData.phone);

  // Fill optional address if available
  if (kiranData.address) {
    await registerPage.fillAddress(kiranData.address);
  }

  // Small delay to ensure fields are filled
  await page.waitForTimeout(1000);

  // Create screenshots folder if it doesn't exist
  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Take full page screenshot using POM method
  await registerPage.takeFormScreenshot(`registration_form_${Date.now()}.png`);

  console.log('✅ Registration form filled with Kiran details');
  console.log('✅ Form NOT submitted as requested');
});
