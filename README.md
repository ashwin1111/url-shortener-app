# [URL Shortener](https://urlll.xyz)

Simple URL shortener! URL shortener allows to reduce long links from Facebook, YouTube, Twitter, Linked In and top sites on the Internet, just paste the long URL and click the Shorten URL button. On the next screen, copy the shortened URL and share it on websites, chat and e-mail. Feel free to check the [Live Demo](https://urlll.xyz).

## Tech Stack
<li>NodeJS - API
<li>Heroku Postgres - Primary Database
<li>Redis - Caching
<li>Angular 9 - Webapp
<li>Firebase - Angular Deployment
<li>Heroku - API Deployment

## Split-up / Modules
<li>Shorten URL without sign in (Shortened URL will expire in 7 days)

<li>Shorten URL with sign in (Will be availble for lifetime)

<li>Email Verification

<li>Sessions using JWT Tokens

<li>Password Hashing

<li>Postgres Database

<li>Valid URLs

<li>Job to run every 12h to delete url's with expired time

<li>Implemented caching using redis

<li>Check whether the requested short url is available

## Future releases

<li>URL Collections - ex: you can have your own collections like urlll.xyz/collections/ashwin

<li>Deleting created short url

<li>Email verificaton with access token

<li>Trigger email on account confirmation

<li>Refresh tokens

<li>Edit already created url's

<li>Forget password

<li>Profile page

<li>Total clicks