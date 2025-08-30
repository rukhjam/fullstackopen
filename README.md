## Part 1
### 1-a Introduction to React

```bash
# To create React application myapp from npm 7+
npm create vite@latest myapp -- --template react

cd myapp
npm install

# to start application
npm run dev
```

- The code of the application resides in the `src` folder. 
- The file `App.jsx` contain the ***App*** component rendered by React in the `main.jsx` file.
- By default, the file `index.html` doesn't contain any HTML markup that is visible to us in the browser.

#### Component
- First letter of React component names must be capitalized.
- Each component must be using single root element (enclosed within `<div>...</div>` or `<>...</>).
- It is also possible to have *array* of components

#### JSX
- The layout of React components is mostly written using [JSX](https://react.dev/learn/writing-markup-with-jsx).
- JSX is "XML-like", which means that every tag needs to be closed. For example, `<br>` in HTML is written as `<br/>` in JSX.

#### props: passing data to components
- It is possible to pass data to components using so-called [props](https://react.dev/learn/passing-props-to-a-component).
- Objects are not valid as a React child; hence, do not render objects via props.
- In React, the individual things rendered in braces must be primitive values, such as numbers or strings.


### 1-b JavaScript
#### Variables
- `const` defines constant
- `let` defines variable
- Destructuring assignment:
```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed

const props = {
    name: 'Name',
    age: 35
}

const { name, age } = props // assign 'Name' to name and 35 to age
```
- JavaScript fundamentally defines only a limited set of types: Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object.

#### Arrays
- `<ArrayReference>.push(element)` to push element in same array.
- `<ArrayReference>.length` to get length of array.
- `<ArrayReference>.forEach(function(value))` to traverse and perform operation on each element of array.
- `<ArrayReference>.map(function(value))` to produce new array by performing operation on each element of array.
- `<ArrayReference>.concat(element)` to add element in array and return new array.
- `<ArrayReference>.join(' ')` to join all the array items into a single string seperated by string passed as arguement (space in this case).
- 
#### Objects
```javascript
// object defintion
const object1 = {
  name: 'Bob',
  age: 35,
  education: 'PhD',
}
```
- The values of the properties can be of any type, like integers, strings, arrays, objects.
- The properties of an object are referenced by using the "dot" notation, or by using brackets.

#### Functions
- Definition of function using name
```javascript
function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12
```
- Using function expression
```javascript
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5

// writing in arrow style 
const average = (a, b) => (a+b)/2

// use curly braces after => if there are multiple statements in functions
```

#### Object methods and "this"
- When calling the method through a reference, the method loses knowledge of what the original `this` was. 
- When calling the method through a reference, the value of `this` becomes the so-called global object. 
- For example, when `setTimeout` is calling the method in below code using method reference, it is the JavaScript engine that actually calls the method and, at that point, `this` refers to the global object and interpreted as `undefined`.
```javascript
const arto = {
  name: 'Alexa',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}


setTimeout(arto.greet, 1000)
```
- To preserve `this` reference, use method [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) like `setTimeout(arto.greet.bind(arto), 1000)`
- Using arrow functions it is possible to solve some of the problems related to `this`. 

### 1-c Component state, event handlers

#### Stateful component
- To add state to application, make use of React's [state hook](https://react.dev/learn/state-a-components-memory).

```javascript
// example App.jsx managing state of counter

import { useState } from 'react'

const App = () => {

  // The function call adds state to the component and renders it initialized with the value zero. 
  // The function returns an array that contains two items. 
  // The counter variable is assigned the initial value of state, which is zero. 
  // The variable setCounter is assigned a function that will be used to modify the state.
  const [ counter, setCounter ] = useState(0)


  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

#### Event handling
- `<button onClick={() => setCounter(counter + 1)}>plus</button>` to update the state upon button click
- An event handler is supposed to be either a *function* or a *function reference*.
- If we write: `<button onClick={setCounter(counter + 1)}>` then the event handler is actually a *function call*.
- However, it can be defined as `<button onClick={setToCounter(counter + 1)}>` if `setToCounter` returns function; for example; defined as follows:
```javascript
  const setToCounter = (newCounter) => () => {    
        console.log('counter now', newCounter)  // print the new value to console    
        setCounter(newCounter)  
    }
```
- In above case, the return value of the function `setToCounter` is another function that is assigned to the handler variable `onClick`. 
- Functions returning functions can be utilized in defining generic functionality that can be customized with parameters.

#### Passing state - to child components
- One best practice in React is to [lift the state up](https://react.dev/learn/sharing-state-between-components) in the component hierarchy.
- In simpler terms, place the application state's in the *App* component and pass it down to components make up the *App* component through *props*.

> React's own official [tutorial](https://react.dev/learn/tutorial-tic-tac-toe) suggests: "In React, it’s conventional to use `onSomething` names for props which take functions which handle events and `handleSomething` for the actual function definitions which handle those events."

#### Changes in state cause re-rendering
- Calling a function that changes the state causes the component to re-render.


### 1-d A more complex state, debugging React apps

#### Complex state
- `const [clicks, setClicks] = useState({left: 0, right: 0})` defines object as state.
- Make use of [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax to update only one property in object as state like `const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })` to update only `left' property.
- In practice `{ ...clicks }` creates a new object that has copies of all of the properties of the clicks object. When we specify a particular property - e.g. `left` in { ...clicks, left: clicks.left + 1 }, the value of the `left` property in the new object is increased by one.

> Note: It is ***forbidden in React to mutate state directly***, since [it can result in unexpected side effects](https://stackoverflow.com/a/40309023). Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object and setting that as the new state. Hence, `clicks.left++` to update `left` property could work but it is not correct practice.

#### Handling Arrays
- `const [allClicks, setAll] = useState([])` to define state of `allClicks` as array.
- Use `concat` method to update the `allClicks` like `setAll(allClicks.concat('L'))` to follow above best practice to avoid mutating `allClicks` directly as `concat` returns new array in contrast to `push` method.

#### Update of the state is asynchronous
- A state update in React happens [asynchronously](https://react.dev/learn/queueing-a-series-of-state-updates), i.e. not immediately but "at some point" before the component is rendered again.
- React waits until *all* code in the event handlers has run before processing your state updates.
- In simple words, if you are looking to use the updated state value in the same code where you have updated the state value, you should assign it to separate variable.

#### Debugging React applications
- Keep the browser's developer console open at all times. (`Fn+F12`)
- For `console.log()` debugging, separate the things you want to log to the console with a comma: `console.log('props value is', props)`.
- You can pause the execution of your application code in the Chrome developer console's debugger, by writing the command [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) anywhere in your code. 
    - By going to the Console tab, it is easy to inspect the current state of variables. 
    - Once the cause of the bug is discovered you can remove the `debugger` command and refresh the page.
    - The debugger also enables us to execute our code line by line with the controls found on the right-hand side of the *Sources* tab.
- It is highly recommended to add the [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension to Chrome.

#### Rules of Hooks
- Hooks may only be called from the inside of a function body that defines a React component.
- In other words, the `useState` function (as well as the `useEffect` function) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. 

#### Passing Event Handlers to Child Components
```javascript
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
```

- The component gets the event handler function from the `onClick` prop, and the text of the button from the `text` prop. The above `Button` component can be used as follows:

```javascript
const App = (props) => {
  // ...
  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand" />      
      <Button onClick={() => setToValue(0)} text="reset" />      
      <Button onClick={() => setToValue(value + 1)} text="increment" />  
    </div>
  )
}
```

#### Do Not Define Components Within Components
- This makes it impossible for React to optimize the component.

#### Learn React
- [React official guide](https://react.dev/learn)
- [The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)

## Part 2
### 2-a Rendering a collection, modules

#### Rendering Collections
- For example, rendering notes array where each element of array has `content` and `id`
```jsx
<div>
  <h1>Notes</h1>
    <ul>
      {notes.map(note => <li key={note.id}>{note.content}</li>)}      
    </ul> 
<div>
```
- Each element generated by the map method, must each have a unique key value: an attribute called *key*. React uses the key attributes of objects in an array to determine how to update the view generated by a component when the component is re-rendered. 
- The value of the variable must be rendered inside curly braces.
- It is an anti-pattern to use array index as key. Note: `notes.map((note, i) => ...)` can be used to get array index; the second parameter in callback function to **map** is array index if required.

#### Refactoring Modules
- In smaller applications, components are usually placed in a directory called `components`, which is in turn placed within the `src` directory. The convention is to name the file after the component.
- The component can be imported into `App.jsx` like `import Note from './components/Note'` where `Note.jsx` is created in `components` directory.

### 2-b Forms
- Form can be used to submit data to server. To access data in the form input element, we need to use the controlled component (whose state is managed by the React App itself):
```jsx

const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length + 1)
  }
  setNotes(notes.concat(noteObject))
  setNewNote('')
}

const handleNoteChange = (event) => {    
  setNewNote(event.target.value)  
}

<form onSubmit={addNote}>
  <input value={newNote} onChange={handleNoteChange}/>
  <button type="submit">save</button>
</form>   
```
- The form event handler (`addNote` in this case) immediately calls the `event.preventDefault()` method, which prevents the default action of submitting a form. 
- The `target` property of the event object now corresponds to the controlled input element, and `event.target.value` refers to the input value of that element.

### 2-c Getting data from server

#### [json-server](https://github.com/typicode/json-server)
- Install *json-server* as dev-dependency like `npm install json-server --save-dev` at the root of project directory.
- Create JSON file which has arrays of objects (`"notes"` in this example) and save it as `db.json` in the root of the project directory. To serve it from mock server, make use of `json-server`. Use `npx json-server --port 3001 db.json` to start the server at port `3001`. Use `http://localhost:3001/notes` to access all notes served as `application/json` content-type.
- You can also add `"server": "json-server -p 3001 db.json"` in the *package.json* file to start the *json-server* using `npm run server` similar to starting react application using `npm run dev`.

#### Axios and promises
- To retrieve data from server, install *axios* like `npm install axios` at the root of the project directory to save it within `"dependencies"` in *package.json* file.
- Import axios `import axios from 'axios'` and use it like `axios.get('http://localhost:3001/notes')` which would return Javascript *Promise* object. 

> A Promise is an object representing the eventual completion or failure of an asynchronous operation.

- A promise can have three distinct states:
  - The promise is *pending*: It means that the asynchronous operation corresponding to the promise has not yet finished and the final value is not available yet.
  - The promise is *fulfilled*: It means that the operation has been completed and the final value is available, which generally is a successful operation.
  - The promise is *rejected*: It means that an error prevented the final value from being determined, which generally represents a failed operation.

- The sample usage of successful GET request via axios:
```javascript
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```
- The `response` object contains all the essential data related to the response of an HTTP GET request, which would include the returned *data*, *status code*, and *headers*.

#### Effect-hooks
```jsx
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
```
> By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

### 2-d Altering data in server
#### Sending data to the server
- Use the POST method on `axios` object to send data to the server which returned the new object within `response.data` once the promise is fulfilled:
```javascript
axios.post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))      
      setNewNote('')
    })
```
- Use of PUT method on `axios` object to alter object on server with specific id:
```javascript
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id === id ? response.data : note))
  })
}
```
- The `changedNote` in the above code is the shallow copy of the original `note` object we are looking to modify. We must never mutate state directly in React.
- The map method creates a new array by mapping every item from the old array into an item in the new array.


#### Extracting Communication with the Backend into a Separate Module
- Create `notes.js` within `services` directory within `src` folder with following contents to add the code for communicating with backend server; it returns promise directly or after resolving it like shown below:
```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  //   return axios.get(baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  //   return axios.post(baseUrl, newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  //   return axios.put(`${baseUrl}/${id}`, newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
```
- It can be imported like `import noteService from './services/notes'` in `App.jsx` to make use of `getAll`, `create` and `update` methods.


#### Cleaner Syntax for Defining Object Literals
- The above export can be shortened to `export default { getAll, create, update }` considering keys (on left) are same as values (on right) of methods in object. 
- To define an object `person` based on below data:
```javascript
const name = 'Leevi'
const age = 0
```
- The older Javascript syntax is like as follows:
```javascript
const person = {
  name: name,
  age: age
}
```
- The new ES6 syntax, it can be written as follows:
```javascript
const person = { name, age }
```

#### Promises and Errors
- The rejection of a promise is handled by providing the `then` method with a second callback function, which is called in the situation where the promise is rejected.
- The more common way of adding a handler for rejected promises is to use the `catch` method.
- In practice, the error handler for rejected promises is defined like this:
```javascript
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })
```
- The `catch` method can be used to define a handler function at the end of a promise chain, which is called once any promise in the chain throws an error and the promise becomes *rejected*:
```javascript
axios
  .get('http://...')
  .then(response => response.data)
  .then(data => {
    // ...
  })
  .catch(error => {
    console.log('fail')
  })
```

### 2-e Adding styles to React app
- One possible way to add CSS styles to React app is by defining stylesheet file (for example, `index.css` in the `src` directory) and import it like `import './index.css'`
- In regular HTML, classes are defined as the value of the `class` attribute like `<li class="note">some text...</li>`
- In React, use `className` attribute like `<li className='note'>...</li>`
- It is also possible to define inline styles; however, the CSS content would be defined as object:
```javascript
{
  color: 'green',
  fontStyle: 'italic'
}
```
- In CSS, selector and declaration of above would be as follows:
```css
{
  color: green;
  font-style: italic;
}
```
- Example React component with inline style
```jsx
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app
      </p>
    </div>
  )
}

export default Footer
```
- Inline styles come with certain limitations. For instance, so-called pseudo-classes can't be used straightforwardly.

#### Important Remarks
- By defining state with empty array (`const [notes, setNotes] = useState([])`), it is possible to perform *map* function; however, if it is set to `null` instead then there would be error if the value of state set by running `useEffect(hook, [])`. To avoid the issue if state is set as `null` initially, we can make use of conditional rendering like below:
```jsx
// do not render anything if notes is still null
  if (!notes) {     
    return null   
}
```
- The second parameter of `useEffect` is used to specify how often the effect is run. The principle is that the effect is always executed after the first render of the component and when the value of the second parameter changes.
- If the second parameter is an empty array `[]`, its content never changes and the effect is only run after the first render of the component. 
- Example of `useEffect` which runs every time the particular state is changed:
```jsx
...
const [currency, setCurrency] = useState(null)
...
useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])

  ...

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }
```
- To set environment variable:
```bash
export VITE_SOME_KEY=54l41n3n4v41m34rv0 && npm run dev // For Linux/macOS Bash
($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // For Windows PowerShell
set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev // For Windows cmd.exe
```
- And to use the environment variable:
```javascript
const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup
```