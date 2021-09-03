# React Quiz App

Resources: <br>
https://guilfordjournals.com/doi/abs/10.1521/pedi.1992.6.4.343 <br>
https://pubmed.ncbi.nlm.nih.gov/17983306/ <br>
https://courses.jordanbpeterson.com/personality <br>

## **Debugging**

### [VS Code Instructions](https://create-react-app.dev/docs/setting-up-your-editor/#debugging-in-the-editor)
 - Install the VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
 - Edit the launch.json file in your .vscode folder to contain the following:
 ```
 {
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```
 - Run the app by using "npm start"
 - Debug by pressing F5 in VS Code

*Additionally, you can use the "debugger" keyword which will cause your browser to pause and begin debuggin upon evaluation. Note: in JSX portions you use "{debugger}".*
<br>

## **Boilerplate:**

This project was bootstrapped with create-react-app
 - "npx create-react-app 0-react-quiz"

**Note: I have removed the test and webvitals features that create-react-app adds by default**

### `Available Scripts`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
