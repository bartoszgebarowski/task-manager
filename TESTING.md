# User story testing

[Document can be viewed here](https://docs.google.com/spreadsheets/d/1SWAA9mB4-A2m58K9gB1c4AYcTs5VZn1PWrKaYkTBIqs/edit?usp=sharing)

![User story testing 1](readme/images/testing/testing-1.png)
![User story testing 2](readme/images/testing/testing-2.png)
![User story testing 3](readme/images/testing/testing-3.png)
![User story testing 4](readme/images/testing/testing-4.png)
![User story testing 5](readme/images/testing/testing-5.png)
![User story testing 6](readme/images/testing/testing-6.png)
![User story testing 7](readme/images/testing/testing-7.png)

## Lighthouse testing 

![Lighthouse testing](readme/images/testing/lighthouse-testing.png)

Lighthouse testing was performed and found performance to be medium. This is a result of using Bootstrap React framework.

## Responsivness 

All pages were tested to support screen sizes from 320px and upwards.

Steps to test:

1. Open the browser and navigate to [Task manager page](https://pp5-task-manager.herokuapp.com/)
1. Open the developer tools
1. Set to dimensions to responsive
1. Set the zoom to 50%
1. Click the grey bar on the left to change the width

- Website was also opened on the following mobile devices:
Samsung Galaxy S7

## Eslint 

Eslint was installed and configured locally. In addition, [Online tool](https://eslint.org/play/) was used.

## Validators 

![Jigsaw validator results](readme/images/testing/jigsaw-testing.png)

CSS modules, included with this project, passed through Jigsaw validator with no significant issues.

## Known bugs 
1. On page refresh, the user status is undefined and is set correctly after a delay.
Due to the nature of this problem, additional measurements had to be taken in order to ensure that user status was handled properly 
1. Success messages do not display with correct timing, with each form submission.