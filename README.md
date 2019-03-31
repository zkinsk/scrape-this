# scrape-this
- nodeJs/express app that uses Cherio and Axio to srape info from the site [SingleTracks](https://www.singletracks.com/)
- Stores selected info in a database for persistent retreival
- Allows for comments/notes to be added to saved articles that are then accessible by everyone who visits the site

**While viewing articles, make sure you scroll down - for a nice effect**


## Technologies: 

1. nodeJs, express
    - maintains my routes and html calls
  
2. Axios & Cheerio
    - Axios access the target site
    - Cheeiro extracts target info from the raw code
  
3. Mongo & Mongoose
    - store the curated data, extracted by Cheerio, for later use
    - stores notes in an collection that is associated with the collection of articles
  
4. Handlebars
    - pre-renders the HTML and sends it to the client
  
5. Bootstrap
    - responsive css library to beautify the page and facilitate mobile responsiveness
  
6. Heroku
    - provides server space to spin up my nodejs app [Scrape This](https://scrape-this-sz.herokuapp.com/)
