import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

 Given('user on the login page', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'success';
         });

Given('user follows {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

     Given('user on the Login Page', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


              Given('user enters {string} with {string}', function (string, string2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


     Given('user enters {string} with {string}', function (string, string2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

  Given('user click {string} button', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
