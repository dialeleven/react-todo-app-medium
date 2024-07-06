# React Todo App

Built using tutorial sources:
- https://medium.com/@worachote/building-a-todo-list-app-with-reactjs-a-step-by-step-guide-2c58b9b6c0f5
- https://www.freecodecamp.org/news/build-a-todo-app-from-scratch-with-reactjs
- "Master React in 5 Days" by Eric Sarrion

The Medium.com tutorial covers reading the TODO list, TODO items, creating a new TODO, and deleting a TODO. Additional functionality was developed with the aid of the "Master React" book (updating/editing a TODO item) and other online resources.

This is a great project to get aquainted with React by working with:
- components
- JSX syntax
- managing state (useState)
- hooks (useEffect, useContext)
- Context Provider to pass state down to child components (e.g. <TodoList /> (TodoList.js) `tasks` object passed down to the child <TodoAddItemModal /> (TodoAddItemModal.js) to access the `tasks` list object and filter out the selected task id when 'edit' is clicked)
- dnd kit for draggable/droppable/sortable hooks

Additional feature(s):
- The Todo App stores the todo items in the browser's localStorage for data persistence

## Live Demo
The app build is hosted on Netlify at https://react-todo-app8.netlify.app to interact with.

Netlify has a nice Continuous Deployment (CD) feature, so when your GitHub repository changes are pushed, Netlify automatically builds and deploys your site to their CDN (Content Delivery Network). Netlify's CD includes automatic builds, previews for pull requests, instant cache invalidation, and continuous delivery to production. So, Netlify can be a part of a CI/CD pipeline which is a great way to get started with CI/CD if you haven't used it before!

NOTE: The Starter plan (free) doesn't include email notifications, so pay attention to the deploys log in your Netlify account if the build fails because of various reasons (e.g. ESLint warnings). Just in case you're expecting your local version to be live on Netlify and don't see your changes take effect.

## Screenshot
![TODO App Screenshot](https://github.com/dialeleven/react-todo-app-medium/blob/main/public/assets/screenshot_todo_app.png?raw=true)

**TODO - Completed Items**
- [x] Edit item (click item to edit, Enter key/blur() to save, Esc key to discard changes)
- [x] Modal add todo item
- [x] Filtering option (show 'All' tasks, 'Checked' and 'Unchecked')
- [x] Modal: Add due date/time
- [x] Adjust date/time format on add action
- [x] Modal: close button behavior - clear out text input and date/time input
- [x] Edit task in modal (todo text, due date)
   - [x] Conditionally adjust labels/headings based on add/edit action
- [x] [Tasks todo vs completed summary](https://www.freecodecamp.org/news/build-a-todo-app-from-scratch-with-reactjs/#The-TODOHero-Component)
- [x] [Store todo list in local storage](https://www.freecodecamp.org/news/build-a-todo-app-from-scratch-with-reactjs/#How-to-Persist-the-Todo-Data-to-localStorage)
- [x] Deploy project online (e.g Netlify)
- [x] Reorder with drag and drop ([dnd kit](https://dndkit.com/)) - install using ```npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers```

**TODO - Features To Add**
- [ ] [Redux](https://redux.js.org/) state management(?)

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
