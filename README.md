# NC News

## Introduction 

NC News is a news and social platform, with the aim of creating a hub for users to connect while posting short news articles and viewpoints on the things that interest them. The app aims to be smaller in scale than national news sites and is more focussed on connecting users, than on the content they may be connecting over. It is analogous to a friendly Discord server, where the users help craft their own experience by interacting with the site and making it their own. NC News has more detail than tweets on Twitter and is more personal than BBC News.  
  
  I chose to build a news and social app, because I am interested in the news and how we communicate information. I have consumed a selection of news and social media over the last few years, so I had some prior experience in the area.  
    
  It was a good opportunity to consolidate what I had learned during the front-end section of the Northcoders bootcamp, especially in terms of making asychronous calls to my server.

*** LINK TO THE DEPLOYED VERSION **  
  
  To log in to NC News the username is any user of the available users and the password is the username with '_pass' added to the end.  
    
![users](https://user-images.githubusercontent.com/68432429/159716402-d7e05a17-d778-4b03-90dd-9ab1afad6608.png)

For example, username: tickle122, password: tickle122_pass.

## Backend

The backend repo for this application is: https://github.com/rvallely/ncNewsApp .  
  
The hosted API of this back-end project: https://rosie-nc-news-app.herokuapp.com/api.

Using the endpoints and the 'queries' and 'params' listed for each endpoint on the hosted API, you can change the URL and access data in the database.

To parse the data and make it more readable, you may want to download a JSON formatting extension for your browser such as: https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa.

## Planning

I began by wireframing my application and drawing a component tree.   

![nc_news_plan](https://user-images.githubusercontent.com/68432429/159609661-78fd3113-022b-4788-81ea-68c1cb6ccae3.png)

## User Stories

As a user I should be able to:  
  
  1. view a list of all the articles
2. view a page for each topic with a list of related articles
3. view an individual article
4. view an article's comments
5. vote on an article and immediately see the change
6. post a new comment to an existing article
7. sort articles by:  
. date created  
. comment count  
. votes
8. delete my own comments
9. see an appropriate error if I go to a non existent path or a path for a non existent article or topic
10. not be able to post a comment if I haven't filled in all of the form boxes
11. be able to use the site on my mobile or laptop without sacrificing functionality
12. vote on a comment and immediately see the change
13. view a list of all articles written by any specific user
14. post a new article to an existing topic
15. delete my own articles
16. sort comments by most recent and most votes
16. login with a correct username and password
17. only be able to vote once per page load on any vote button

## What I Learned

I learned that there is a basic visual language of user interfaces online. Looking at large news organisations and social media platforms there are similar visual rules with the location and appearance of a site or an application including layout, features, buttons and how it is indicated to a user that a feature is interactive or not. 

There's a sense, when on most sites, that you know where to go and what certain symbols mean. I tried to follow these rules to make NC News as easy and inviting to interact with for a user, by keeping it in a format they were used to.

There seems to be a move to simplicity, maybe because people spend such a lot of time on smaller smart phone screens now. Login forms have placeholders rather than labels and are less crowded. I noticed buttons on YouTube and Facebook fill in when pressed. 

My wireframe was really useful, as were the user stories, as they structured tasks in a way that wasn't overwhelming. Having a general idea of how the app was going to look allowed me to work to that plan and not have to design at the same time as making requests to my server and building components. I found it easier to do one type of job at a time.

When I did go back into the backend of my project to add a couple more endpoints for extra features on the app, I found it harder to quickly switch between backend, frontend and design and more prone to errors. In the future I will try to work through tasks in order of type so I can be more deeply connected to what I'm working on.

## Challenges 

My main challenge was styling as I didn't have much experience in the area. In particular, I found it challenging to style in a way that worked for many different screen sizes. Galaxy Folds were sent to test us!

## Future Features  
  
  In the future I'd like to:  
    
. add the functionality to sign up new users  
. allow users to be able to post articles on any topic  
. have a top users feature from a most commented on or upvoted article of the day  
. have a way for users to report content that violated basic safeguarding rules  
. hash passwords on the database
    
## Technology

This project was written in JavaScript, HTML and CSS and with React.js.  
  
  Minimum requirements:  
  . `Node.js v16.14.0`

## Forking and cloning  

1. Fork this repository.
2. From the forked repository, click the blue 'Code' button and copy the HTTPS address to your clipboard.
3. From your command line navigate to an appropriate location and run `git clone <copied-HTTPS-address-of-repo-here>`. This will clone the project to your machine so it can be run locally.
4. Open the project on your machine and from the command line run `npm install` to install dependencies.

## Scripts

For the purpose of viewing the NC News running `npm start` from 
the command line in the open project is sufficient. More detail on available scripts below.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
