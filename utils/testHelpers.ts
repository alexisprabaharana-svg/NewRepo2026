import { Page } from '@playwright/test';

export class TestHelpers {
  /**
   * Wait for a specific amount of time
   */
  static async wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(page: Page) {
    await page.evaluate(() => {
      localStorage.clear();
    });
  }

  /**
   * Clear session storage
   */
  static async clearSessionStorage(page: Page) {
    await page.evaluate(() => {
      sessionStorage.clear();
    });
  }

  /**
   * Clear all cookies
   */
  static async clearCookies(page: Page) {
    await page.context().clearCookies();
  }

  /**
   * Log message to console during test
   */
  static logMessage(message: string) {
    console.log(`\n⚙️ TEST LOG: ${message}\n`);
  }
}
