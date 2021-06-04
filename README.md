# \<products-app> Web Component

`<products-app>` represents a customizable web component that can be used to add any type of objects (items), represented as cards, to a cart. This web component was built in Typescript, with the help of the `lit-element` library, which is a simple base class for creating fast, lightweight web components that work in any web page, with any framework. In order to render to the shadow DOM, lit-element uses lit-html, complemented by API, for managing properties and attributes.

## Installation Steps

In the project root:
1.	Update your *package.json* file with the contents from dependencies and devDependencies, as shown below:

```
{ 
  "name": "starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --config-name=dev",
    "build": "webpack --config-name=prod"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lit-element": "^2.5.1"
  },
  "devDependencies": {
    "awesome-typescript-loader": "^5.2.1",
    "html-webpack-plugin": "^3.2.0",
    "terser-webpack-plugin": "^2.3.5",
    "typescript": "^3.8.2",
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}
```

2. Make sure your *tsconfig.json* file contains the following compiler options:
![image](https://user-images.githubusercontent.com/10262904/120822369-02888b00-c55f-11eb-98c8-d2832e812d11.png)

3. Create a *webpack.config.js* file with the following content:
```
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const dev = {
    mode: "development", 
    devtool: "source-map",
    entry: "./main.ts",
    name: "dev",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "js/main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "index.html"
        })
    ], 
    module: {
        rules: [{
            test: /\.ts$/, 
            loader: "awesome-typescript-loader"
        }]
    }
}

const prod = {
    ...dev,
    name:'prod',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: 'all'
            })
        ]
    }
}

module.exports = [dev, prod];
```

Afterwards, in a terminal, run the following commands:
```
npm install
npm start
```

And… that’s it! The web component is ready to be used inside your project, regardless of the framework used.

## How to use the component?

Let us show an example of how to use this component. For conveniency, the provided examples don’t use any framework: the content is rendered inside an *index.html* file.
In this case, the page can be viewed at http://localhost:8081, using the provided server.

There are two components, both located in the */src/elements* folder. However, we are interested in only one of them, `products-app`, since the other one, `products-card` will be rendered from the former.

Here, the main.js file, which imports both files corresponding to the custom components, is directly linked to the index.html, so we do not have to include anything. In general, for other frameworks (React, Angular, Vue), we just need to import */src/elements/products-app.element.ts*, in order to use the component.

`products-app` has 4 data attributes that may be configured, for achieving a better customization of the component:
- **name**: name of the used objects (e.g., “Book”, for a list of books in a store); **default** – “Items”;
- **buttonColor**: color used for the button of each object card; **default** - #4CAF50;
- **cardColor**: background color of each card; **default** - #f7f7f7;
- **products**: list of objects for which the cards will be rendered:
  - the list should be enclosed between backticks (\`), because we are not allowed to pass objects as attributes. Lit element will know how to deconstruct the string into a list of objects;
  - each object from this list has to contain an `id` key;
  - image links should correspond to the `image` attribute of the object;
  - additionally, colors may be specified for being displayed (instead of images), if the image link is missing, through the `color` attribute;
  - optionally, we can compute the total price for the objects added in My Cart (if the objects have the `price` attribute);
  - by default, if no list is provided, the component will import a sample containing 4 objects, from *src/products.ts*.

## Example

The custom component allows us to move objects from a list of available items to another list, called “My Cart”, by clicking on the “Add to Cart” button that is available for each card. Items from “My Cart” may be discarded, i.e., removed from the list, and therefore, added back to the list of available items.

If the given objects have a `price` attribute, the total price of the selected objects is computed.

For better consistency, items in both lists are sorted by their identifiers (key `id`).

![image](https://user-images.githubusercontent.com/10262904/120823177-d7526b80-c55f-11eb-8010-563642851c0e.png)

**Obs:** since in .html files objects cannot be created, we constructed the list inside the `<script>` tags and we programmatically set the products attribute.
 
**For frameworks (e.g., React application):**
  - import: ```import './litelements/elements/products-app.element';```
  - usage: ```<products-app name="Books" buttonColor="#0275d8" cardColor="#5bc0de" />```
  
 ![image](https://user-images.githubusercontent.com/10262904/120823408-141e6280-c560-11eb-9f0a-618f6d012c5c.png)

![Framework Design Project - Google Chrome 2021-06-04 18-22-31](https://user-images.githubusercontent.com/10262904/120825608-3913d500-c562-11eb-958d-ba236c8508c0.gif)


