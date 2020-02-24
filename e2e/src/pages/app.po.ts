import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getText() {
    return element(by.css('mat-button-wrapper')).getText() as Promise<string>;
  }
}