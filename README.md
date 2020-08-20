# gooddata-js-interview solution

Solution for the portrayed task.

## Brief summary

When cloning the repo directly from Github, there was an issue with the version for _node-sass_ module. I had to upgrade the version to _4.14.1_ .

I wanted to keep the functionality/style as close to the original design as possible while solving the task. However I did add a new dropdown menu for selecting the year as well as the month (I didn't, however, use a 'prettier' date picker as I wanted to keep the style as close to the original as possible).

I didn't include much documentation (comments) on the code as the task is quite simple and I think it's very readable. I hope it is, but please reach to me if there is anything I can clarify.

## How to run

The steps to run the app are the same as in the original description. As I've changed the node-sass version, `yarn` (or `yarn install`) should be re-run. Following that, running `yarn start` will start the app, and after identifying yourself the data can be seen.

---

# gooddata-js-interview

Frontend Interview Examples

## GoodData Homework

### Introduction

Your task is to enhance the application using the [GoodData.UI](https://sdk.gooddata.com/gooddata-ui/).

### Prerequisites

To successfully complete this tutorial, you are required to:

- Be familiar with the modern JavaScript ecosystem.
- Have `node.js` and `yarn` installed in your development environment.
  - If you do not have these tools installed, you can get them from https://nodejs.org/ and https://yarnpkg.com/ respectively.

### Initialization

1. Make a [fork of this repository and clone it](https://help.github.com/en/articles/fork-a-repo).
2. Run `cd gooddata-js-interview`.
3. Run `yarn install`.
4. Run `yarn start`.
5. Visit https://localhost:3000/account.html, and log in using your GoodData account credentials.
   - If you do not have a GoodData account yet, [create one](https://gooddata-examples.herokuapp.com/registration). After creating a GoodData account, you will be redirected to our GoodData.UI Live Examples. Feel free to get inspired there, but its not related to this homework.
6. Visit https://localhost:3000/, and make sure that two column charts are loaded like this:

![Screenshot after initialization](https://github.com/gooddata/gooddata-js-interview/blob/master/public/screen.png "Initialization Screenshot")

### Task

**Make the dropdown work. That is, the dropdown `onChange` should reload the upper chart appropriately.**

When you are done, send us the link to your source code repo and the instructions how to run the demo.

We are looking for re-usable code. You are strongly encouraged to "over-engineer" this to show off your software architecture and designing skills. Assume that this abstract application will be the first component of a large scale application.

### GoodData.UI Documentation

[GoodData.UI Documentation](https://sdk.gooddata.com/gooddata-ui/docs/about_gooddataui.html)

### Troubleshooting

###### Cloning the repo fails

- If cloning using SSH fails, try HTTPS instead: `git clone https://github.com/gooddata/gooddata-js-interview.git`.

###### Server https://developer.na.gooddata.com/ seems to be down.

- If you decided to work on this homework during the weekend, it is possible our platform may be down for several hours due to maintenance (typically on Saturdays). If https://developer.na.gooddata.com/ is down, try again in an hour or two. If you need more time to work on this homework, let us know.

###### Charts do not get loaded.

- Most likely, you are not logged in correctly. Check the Network tab in Google Chrome DevTools. If you see `HTTP 401 ERROR`, visit https://localhost:3000/account.html and log in properly.

##### You get the "Your connection is not private" error in Chrome

- To work around this, enable the [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost) flag while working on the assignment.

###### Anything else?

- Contact your recruiter for further information.

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
