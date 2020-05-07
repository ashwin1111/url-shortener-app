# [URL Shortener](https://urlll.xyz)
Not just a regular url shortener that reduces long links and generate a shortened url. It has additional features like creation of collection of links that helps people to open all the url's in a single click. 
example: Collection of your personal blogs..,, 
With the help of [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/urlll/), you can also list all your bookmarks and extract selected links and create as a collection 
<br>
Feel free to check the [Live Application](https://urlll.xyz) and [Extension](https://addons.mozilla.org/en-US/firefox/addon/urlll/)

## Stack
<li>NodeJS - API
<li>Heroku Postgres - Primary Database
<li>Redis - Caching
<li>Angular 9 - Webapp
<li>Angular 9 - Extension
<li>Firebase - Webapp Deployment
<li>Heroku - API Deployment
<li>Mozilla Firefox Add-on Store

## Split-up / Modules
<li>Shorten URL without sign in (Shortened URL will expire in 7 days)

<li>Shorten URL with sign in (Will be availble for lifetime)

<li>Email Verification

<li>Sessions using JWT Tokens

<li>Password Hashing

<li>Postgres Database

<li>Valid URLs

<li>Job to run every 12h to delete url's with expired time

<li>Job to run every h to scrap website titles and description

<li>Implemented caching using redis

<li>Check whether the requested short url is available

<li>URL Collections - ex: you can have your own collections like urlll.xyz/collections/ashwin

<li>List page for created urls, collections, etc..,

<li>Single click to open all individual urls in a collection in multiple tabs

<li>Total clicks

## Future releases

<li>Deleting created short url

<li>Resend email

<li>Email verificaton with access token

<li>Trigger email on account confirmation

<li>Reset / Forgot password

<li>Refresh tokens

<li>Edit already created url's

<li>Forget password

<li>Link sharing inside app

<li>Sign up, Sign in with Google Facebook Github Twitter