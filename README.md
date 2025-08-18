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

- The component gets the event handler function from the `onClic`k prop, and the text of the button from the `text` prop. The above `Button` component can be used as follows:

```javascript
const App = (props) => {
  // ...
  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand" />      <Button onClick={() => setToValue(0)} text="reset" />      
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