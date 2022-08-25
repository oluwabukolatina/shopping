# Technical assignment back-end engineer

As part of an engineering team, you are working on an online shopping platform. The sales team wants to know which items were added to a basket, but removed before checkout. They will use this data later for targeted discounts.

Using the agreed upon programming language, build a solution that solves the above problem.

**Scope**

* Focus on the JSON API, not on the look and feel of the application.

**Timing**

You have one week to accomplish the assignment. You decide yourself how much time and effort you invest in it, but one of our colleagues tends to say: "Make sure it is good" ;-). Please send us an email (jobs@madewithlove.com) when you think the assignment is ready for review. Please mention your name, Github username, and a link to what we need to review.


# Submission
**Description**
> This project was built with nodejs, typescript

>  [Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Acknowledgments](#acknowledgments) &middot; [Author](#author)
---

## Deployment

Application is deployed on Heroku. Use URL [https://made-with-love-oluwabukolatina.herokuapp.com/](https://made-with-love-oluwabukolatina.herokuapp.com/) with API endpoints.

## POSTMAN API DOC
Api documentation generated with [postman](https://documenter.getpostman.com/view/4223397/VUqyouBu)

---
## Technologies Used

[node]: (https://nodejs.org)
- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [TypeScript](https://www.typescriptlang.org/) TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions..

## Testing Tools
- [Jest](https://jestjs.io/) Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications.

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/madewithlove/technical-assignment-back-end-engineer-oluwabukolatina`

- Update example env file with your own details

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm run dev
  ```
- Use `http://localhost:${{PORT}}/api/v1/made-with-love` as base url for endpoints


## API Endpoints

| METHOD | DESCRIPTION                   | ENDPOINTS                 |
|--------|-------------------------------|---------------------------|
| GET    | get basket                    | `/basket`                 |
| POST   | add item to basket            | `/basket`                 |
| DELETE      | delete item from basket       | `/basket/:name`           |
| GET    | get items removed from basket | `/basket/abandoned-items` |
| GET    | get all products                     | `/product`                      |
## Tests
- Run test for all endpoints
  > run the command below
  ```shell
  $ npm run test
  ```
## Author
- [Tina](https://github.com/oluwabukolatina)
