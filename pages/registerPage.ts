import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
  // Page locators
  readonly form: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly emailPlaceholderInput: Locator;
  readonly emailTypeInput: Locator;
  readonly phoneInput: Locator;
  readonly addressTextarea: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly hobbiesCricketCheckbox: Locator;
  readonly hobbiesMoviesCheckbox: Locator;
  readonly hobbiesHockeyCheckbox: Locator;
  readonly languagesInput: Locator;
  readonly skillsDropdown: Locator;
  readonly countryDropdown: Locator;
  readonly selectCountryDropdown: Locator;
  readonly dateOfBirthYearDropdown: Locator;
  readonly dateOfBirthMonthDropdown: Locator;
  readonly dateOfBirthDayDropdown: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly refreshButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize all locators
    this.form = page.locator('form');
    this.firstNameInput = page.locator('input[ng-model="FirstName"]');
    this.lastNameInput = page.locator('input[ng-model="LastName"]');
    this.emailAddressInput = page.locator('input[ng-model="EmailAdress"]');
    this.emailPlaceholderInput = page.locator('input[placeholder*="mail"]');
    this.emailTypeInput = page.locator('input[type="email"]');
    this.phoneInput = page.locator('input[ng-model="Phone"]');
    this.addressTextarea = page.locator('textarea[ng-model="Adress"]');
    this.genderMaleRadio = page.locator('input[type="radio"][value="Male"]');
    this.genderFemaleRadio = page.locator('input[type="radio"][value="FeMale"]');
    this.hobbiesCricketCheckbox = page.locator('input[type="checkbox"][value="Cricket"]');
    this.hobbiesMoviesCheckbox = page.locator('input[type="checkbox"][value="Movies"]');
    this.hobbiesHockeyCheckbox = page.locator('input[type="checkbox"][value="Hockey"]');
    this.languagesInput = page.locator('input[ng-model="Languages"]');
    this.skillsDropdown = page.locator('select[ng-model="Skill"]');
    this.countryDropdown = page.locator('select[ng-model="countries"]');
    this.selectCountryDropdown = page.locator('select[name="countries"]');
    this.dateOfBirthYearDropdown = page.locator('select[ng-model="yearbox"]');
    this.dateOfBirthMonthDropdown = page.locator('select[ng-model="monthbox"]');
    this.dateOfBirthDayDropdown = page.locator('select[ng-model="daybox"]');
    this.passwordInput = page.locator('input[type="password"][ng-model="Password"]');
    this.confirmPasswordInput = page.locator('input[type="password"][ng-model="ConfirmPassword"]');
    this.submitButton = page.locator('button[type="submit"]:has-text("Submit")');
    this.refreshButton = page.locator('button[type="reset"]:has-text("Refresh")');
  }

  /**
   * Navigate to the registration page
   */
  async navigateToRegisterPage() {
    await this.navigateTo('https://demo.automationtesting.in/Register.html');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('form', { timeout: 10000 });
  }

  /**
   * Fill first name
   */
  async fillFirstName(firstName: string) {
    if (await this.firstNameInput.isVisible()) {
      await this.firstNameInput.fill(firstName);
      console.log('✅ Filled First Name: ' + firstName);
      return true;
    }
    return false;
  }

  /**
   * Fill last name
   */
  async fillLastName(lastName: string) {
    if (await this.lastNameInput.isVisible()) {
      await this.lastNameInput.fill(lastName);
      console.log('✅ Filled Last Name: ' + lastName);
      return true;
    }
    return false;
  }

  /**
   * Fill email address
   */
  async fillEmail(email: string) {
    const emailInputs = [
      this.emailAddressInput,
      this.emailPlaceholderInput,
      this.emailTypeInput
    ];

    for (const emailInput of emailInputs) {
      if (await emailInput.isVisible()) {
        await emailInput.fill(email);
        console.log('✅ Filled Email: ' + email);
        return true;
      }
    }
    return false;
  }

  /**
   * Fill phone number
   */
  async fillPhone(phone: string) {
    if (await this.phoneInput.isVisible()) {
      await this.phoneInput.fill(phone);
      console.log('✅ Filled Phone: ' + phone);
      return true;
    }
    return false;
  }

  /**
   * Fill address
   */
  async fillAddress(address: string) {
    if (await this.addressTextarea.isVisible()) {
      await this.addressTextarea.fill(address);
      console.log('✅ Filled Address: ' + address);
      return true;
    }
    return false;
  }

  /**
   * Select gender
   */
  async selectGender(gender: 'Male' | 'FeMale') {
    const genderRadio = gender === 'Male' ? this.genderMaleRadio : this.genderFemaleRadio;
    if (await genderRadio.isVisible()) {
      await genderRadio.check();
      console.log('✅ Selected Gender: ' + gender);
      return true;
    }
    return false;
  }

  /**
   * Select hobbies (can select multiple)
   */
  async selectHobbies(hobbies: string[]) {
    const hobbyMap: { [key: string]: Locator } = {
      'Cricket': this.hobbiesCricketCheckbox,
      'Movies': this.hobbiesMoviesCheckbox,
      'Hockey': this.hobbiesHockeyCheckbox
    };

    for (const hobby of hobbies) {
      const hobbyCheckbox = hobbyMap[hobby];
      if (hobbyCheckbox && await hobbyCheckbox.isVisible()) {
        await hobbyCheckbox.check();
        console.log('✅ Selected Hobby: ' + hobby);
      }
    }
  }

  /**
   * Fill languages
   */
  async fillLanguages(languages: string) {
    if (await this.languagesInput.isVisible()) {
      await this.languagesInput.fill(languages);
      console.log('✅ Filled Languages: ' + languages);
      return true;
    }
    return false;
  }

  /**
   * Select skill from dropdown
   */
  async selectSkill(skill: string) {
    if (await this.skillsDropdown.isVisible()) {
      await this.skillsDropdown.selectOption(skill);
      console.log('✅ Selected Skill: ' + skill);
      return true;
    }
    return false;
  }

  /**
   * Select country from dropdown
   */
  async selectCountry(country: string) {
    const countryDropdowns = [this.countryDropdown, this.selectCountryDropdown];
    for (const dropdown of countryDropdowns) {
      if (await dropdown.isVisible()) {
        await dropdown.selectOption(country);
        console.log('✅ Selected Country: ' + country);
        return true;
      }
    }
    return false;
  }

  /**
   * Select date of birth
   */
  async selectDateOfBirth(year: string, month: string, day: string) {
    if (await this.dateOfBirthYearDropdown.isVisible()) {
      await this.dateOfBirthYearDropdown.selectOption(year);
      console.log('✅ Selected Year: ' + year);
    }
    if (await this.dateOfBirthMonthDropdown.isVisible()) {
      await this.dateOfBirthMonthDropdown.selectOption(month);
      console.log('✅ Selected Month: ' + month);
    }
    if (await this.dateOfBirthDayDropdown.isVisible()) {
      await this.dateOfBirthDayDropdown.selectOption(day);
      console.log('✅ Selected Day: ' + day);
    }
  }

  /**
   * Fill password
   */
  async fillPassword(password: string) {
    if (await this.passwordInput.isVisible()) {
      await this.passwordInput.fill(password);
      console.log('✅ Filled Password');
      return true;
    }
    return false;
  }

  /**
   * Fill confirm password
   */
  async fillConfirmPassword(confirmPassword: string) {
    if (await this.confirmPasswordInput.isVisible()) {
      await this.confirmPasswordInput.fill(confirmPassword);
      console.log('✅ Filled Confirm Password');
      return true;
    }
    return false;
  }

  /**
   * Submit the form
   */
  async submitForm() {
    if (await this.submitButton.isVisible()) {
      await this.submitButton.click();
      console.log('✅ Form submitted');
      return true;
    }
    return false;
  }

  /**
   * Click refresh button
   */
  async refreshForm() {
    if (await this.refreshButton.isVisible()) {
      await this.refreshButton.click();
      console.log('✅ Form refreshed');
      return true;
    }
    return false;
  }

  /**
   * Take screenshot of the form
   */
  async takeFormScreenshot(fileName: string) {
    const screenshotPath = `./screenshots/${fileName}`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('✅ Screenshot taken and saved to: ' + screenshotPath);
  }
}
