# [ArticleSort](https://tanu-n-prabhu.github.io/ArticleSort/)

## Problem Statement
Managing and categorizing articles manually can be time-consuming. A simple web-based solution is needed to automatically categorize articles based on predefined keywords.

## Introduction

ArticleSort is a lightweight web application that helps users categorize articles into predefined categories (Marketing, Technology, Pets, Biography, Life Hacks) based on a predefined set of keywords. The data is stored locally on the user’s device using LocalStorage.

## Tools & Programming Languages Used

* HTML - For structuring the web application
* CSS & Bootstrap - For responsive design and styling
* JavaScript - For client-side logic and data handling

## Usage

* Open the application in a web browser.
* Enter an article name in the input field.
* Click the "Categorize" button to assign the article to a category.
* View categorized articles in the table.
* Click on an article to edit it.
* Click "Download CSV" to export categorized articles.

## Steps to Use

* Clone or download the repository.
* Open `index.html` in a browser.
* Enter article names and let the system categorize them automatically.
* Modify articles by clicking on them.
* Export the categorized articles as a CSV file when needed.

## Features

* Automatic article categorization
* Editable articles list
* Persistent data storage using LocalStorage
* CSV export functionality
* Responsive design with Bootstrap

## Hosting

The application can be hosted using GitHub Pages by following these steps:

* Push the project repository to GitHub.
* Go to **Settings** > **Pages**.
* Select the branch where `index.html` is located and save.
* The application will be available at https://your-username.github.io/repository-name/.

## Future Work

* Implement a cloud-based database for centralized storage.
* Add user authentication for personalized article management.
* Improve keyword matching using Natural Language Processing (NLP).

## Advantages

* No need for backend storage or APIs.
* Quick and easy article management.
* Works offline as data is stored locally.
* Simple and intuitive user interface.

## Disadvantages

* Data is lost when the browser cache is cleared.
* Articles are stored only on the user’s device, making it non-collaborative.
* Limited keyword matching capabilities.


## Credits
ArticleSort is developed by Tanu Nanda Prabhu as a simple and efficient solution for managing and categorizing articles without the need for a backend database. This project showcases the power of front-end technologies like HTML, CSS, JavaScript, and Bootstrap while ensuring a seamless and user-friendly experience. Special thanks to the open-source community for continuous inspiration and innovation in web development.