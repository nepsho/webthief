# WebThief
[![NPM](https://nodei.co/npm/webthief.png)](https://nodei.co/npm/webthief/)

[![npm version](https://img.shields.io/npm/v/webthief.svg?style=flat-square)](https://www.npmjs.org/package/webthief)
[![npm license](https://img.shields.io/static/v1.svg?label=License&message=MIT&color=informational)](https://github.com/nepsho/webthief/blob/master/LICENSE)
[![npm repository](https://img.shields.io/static/v1.svg?label=Repository&message=GitHub&color=yellow)](https://github.com/nepsho/webthief)
[![npm author](https://img.shields.io/static/v1.svg?label=Author&message=bcrazydreamer&color=success)](https://www.npmjs.com/~bcrazydreamer)

**Promise** and **Callback** based website-info getter using meta data of websites.
## Features
- Get any web page source code with webthief
- Get any website logo, title and description
- Support modren metatag scraping
- Fully **promise** and **callback** based
- Support with **ES6** [async/await](https://en.wikipedia.org/wiki/Async/await)
- Support multiple metatag scraping

## Support
ES5 | ES6 | Callback | Promise |async/await|
--- | --- | --- | --- | --- |
✔|✔|✔|✔|✔|✔

## Installing 
[![NPM](https://nodei.co/npm/webthief.png?mini=true)](https://nodei.co/npm/webthief/)

```bash
$ npm install webthief
```
## Some Basic Meta Tags in HTML
```html
<meta name="description" content="Website info api"/>
<meta name="keywords" content="webthief, api, nodejs, python"/>
<meta name="subject" content="website subject">
<meta name="copyright" content="nepsho">
<meta name="language" content="en">
<meta name="robots" content="index,follow" />
<meta name="revised" content="Saturday, May 9th, 2019, 0:00 am" />
<meta name="abstract" content="any abstract">
<meta name="topic" content="any topic">
<meta name="summary" content="any summary">
<meta name="author" content="bcrazydreamer, bcrazydreamer@gmail.com">
<meta name="designer" content="bcrazydreamer">
<meta name="reply-to" content="bcrazydreamer@gmail.com">
<meta name="url" content="https://nepsho.github.io/">
<meta name="category" content="any category">
```
## Some OpenGraph Meta Tags in HTML
```html
<meta name="og:title" content="webthief"/>
<meta name="og:type" content="API"/>
<meta name="og:url" content="https://nepsho.github.io/"/>
<meta name="og:image" content="https://nepsho.github.io/lib/img/logo.png"/>
<meta name="og:email" content="bcrazydreamer@gmail.com"/>
<meta name="og:phone_number" content="123-456-7890"/>
```

## Supported meta fields by webthief
|S. No|a|b|c|d|
| --- | --- | --- | --- | --- |
|1|logo|description|title|keywords|subject|
|2|copyright|language|robots|revised|abstract|
|3|reply-to|topic|summary|author|designer|
|4|country-name|url|category|site_name|email|
|5|phone_number|

## Examples

```js
const webthief = require("webthief");
```
**To get html of any webpage:**
```js
/* Callback method */
webthief.getHtml("https://nepsho.github.io/example/meta_tags.html",(data)=>{
    console.log(data);
})

/* Promise method */
webthief.getHtml("https://nepsho.github.io/example/meta_tags.html").then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.log(error);
});

/* async/await method */
async function demo(){
    var result = await webthief.getHtml("https://nepsho.github.io/example/meta_tags.html");
    console.log(result);
} 

/* Sample output 
    { 
        url : 'https://nepsho.github.io/example/meta_tags.html'
        status : 200,
        success : true,
        html : "<html></html>"
    }
*/
```

**To get meta of any webpage:**
for meta request a option is required which control and specify the desired output. 
```js
var option = {
    fields: ["logo","description","title"] /*fields you want*/
};
```
**or**
```js
var option = {
    fields: ["*"] /*for all supported field*/
};
```
```js
/* Callback method */
webthief.getMeta("https://nepsho.github.io/example/meta_tags.html",option,(data)=>{
    console.log(data);
})

/* Promise method */
webthief.getMeta("https://nepsho.github.io/example/meta_tags.html",option).then(function(data){
    console.log(data)
}).catch(function(error) {
	console.log(error);
});

/* async/await method */
async function demo(){
    var result = await webthief.getMeta("https://nepsho.github.io/example/meta_tags.html",option);
    console.log(result);
} 

/* Sample output 
    {
    	success: true,
	response: {
		logo : "https://nepsho.github.io/lib/img/logo.png",
        	title : "NepSho",
        	description : "Promise and callback based website-info getter using metadata of websites..."
	}
    }
*/
```
**To get images from webpage:**
```js
/* Callback method */
webthief.getSiteImages("https://nepsho.github.io/example/meta_tags.html",(data)=>{
    console.log(data);
})

/* Promise method */
webthief.getSiteImages("https://nepsho.github.io/example/meta_tags.html").then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.log(error);
});

/* async/await method */
async function demo(){
    var result = await webthief.getSiteImages("https://nepsho.github.io/example/meta_tags.html");
    console.log(result);
} 

/* Sample output 
    {
    	success: true,
	response: [ArrayOfImages]
    }
*/
```

**Error callback data (In case any error):**
```js
//Error return object type
{
    success: false,
    error: "ErrorType",
    detail: "detail message of error"
}
```
In case of empty option then a default option is automatically set which contain logo, title and description.
In this API both core function is designed in such way we can user as promise and as callback.
## CLI
```bash
$ npm install webthief -g
```
>**Valid Fields**: *[meta|getmata], [html|gethtml], [images|getsiteimages]*
>(These options used for cli)

```bash
$ webthief [-method-] [-input-] [-option-]
```
**method:**
 - Get Html
     - html | gethtml
 - Get Meta
     - meta | getmeta
 - Get Images
     - image | getsiteimages
    
**input:** Basically a valid url.
**option:** Option parameter basically -d for download html files and images. 

```bash
$ webthief 
```

## licence
MIT [licence](https://opensource.org/licenses/MIT)

## Author
@BCrazyDreamer
