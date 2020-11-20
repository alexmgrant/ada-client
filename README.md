# Setup

**client**

`yarn install`

`yarn start`

`yarn designsystem` to see how I initially scaffolded the UI components.

**server** `/server`

this version of the api adds cors middlewear to avoid the browsers native `Access-Control-Allow-Origin` settings.

`yarn install`

`yarn start-server`

## Notes

In this case, 'App' is the wireframe provided but could be utilized as a child app/component within another application with a rename like 'Dash' or 'VariableDashboard'
  - `<App />` holds state passed via a provider that this app's child components rely on
- The data state (Nodes) from the API is held in redux and handled by `createEntityAdapter`
  - "A function that generates a set of prebuilt reducers and selectors for performing CRUD operations on a normalized state structure containing instances of a particular type of data object."
  - it also provides memoized selectors, which help with performance by not running mutations unnecessary if the data or collection requested has not changed 
- the app relies heavily on the API, I assumed by the design of the test, which has some limitations
  - once a search is done, all Nodes are requested from the `/search` endpoint as requested
    - the advantage is having up-to-date data if multiple users or streams are mutating that data
    - the disadvantage is that this may be unnecessary, and merely filtering our cached data from our redux store may out-perform multiple HTTP requests. If the collection is not too extensive or other activities are not happening concurrently on the client's thread. In the past, I have shipped similar functionality to two different pieces of UI and compared their performance via analytics in production.
- on app init shallow nodes are requested
  - once a Node is selected from the side-nav it is requested from the API and then the shallow Node recieves an Upsert update in the redux store.
  - there are a few requests to the API here that could be avoided by utilizing local state more. I would expirement more with that in a production setting if performance was a concern
- My gut feeling is that template strings with values to be parsed are not ideal, but I can't offer a better solution without looking into it more. So... I'll stay quiet.
- Then, there are the associated risks of XSS attacks when rendering strings to the dom.
	- I used two libraries for this:
		- `html-react-parser` provides some extra utility and ease of use from `React.createElement` like `replace(domNode)`, which I  initially used to replace the attribute XSS vulnerabilities on the 'Bearded Data Node.' 
	- That said, it's not entirely safe or intended to be, so I'm using `dompurify` to sanitize the rendered template strings.
- I landed on using Mark.js after rolling my own and testing a couple of other libraries to handle DOM highlighting from search input values. Mainly for convenience, but implementing this was a great lesson on React's lifecycle using hooks. So thank you!
	- for now, it's only highlighting content within the 'detail' view but could easily be extended to the navbar. 
- pretty light on testing. I would aim higher for production code.