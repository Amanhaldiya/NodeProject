const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const moment = require('moment')
const math = require('math')


//const app=express()
// Define your News API endpoint (replace with your actual News API URL)
//const newsApiUrl = 'https://newsapi.org/v2/top-headlines';

// Define your News API key (replace with your actual API key)
//const apiKey = '85940a4d7b23488ba7ecd9e9e7c6533e';

//newsr.use(express.json());

//app.set('view engine', 'ejs');


newsr.get('/',async(req,res)=>{
    try {
        const companyName = 'Nvidia'; // Replace 'example' with the company name you want to search for
const apiKey = "91ac037a5bc942bd8d184410776f23e1"; // Replace 'YOUR_API_KEY' with your actual News API key

const url = `http://newsapi.org/v2/top-headlines?q=${companyName}&apiKey=${apiKey}`;


        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
        
        
        
    
    } catch (error) {
        if(error.response){
            console.log(error)
        }
        
    }
})

newsr.post('/search',async(req,res)=>{
    const search=req.body.search
    // console.log(req.body.search)

    try {
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=91ac037a5bc942bd8d184410776f23e1`

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
        
        


        
    } catch (error) {
        if(error.response){
            console.log(error)
        }
        
    }
})

// Define a route to fetch news headlines based on the selected country
newsr.get('/news', async (req, res) => {
  try {
    const { country } = req.query;
    
    // Validate the selected country (you can add more validation logic)
    const validCountries = ['us', 'jp', 'rs', 'au']; // Add more as needed
    if (!validCountries.includes(country)) {
      return res.status(400).json({ error: 'Invalid country code' });
    }

    // Make a request to the News API with the selected country
    const apiKey = "91ac037a5bc942bd8d184410776f23e1"; // Replace with your News API key
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    const response = await axios.get(newsApiUrl);
    const headlines = response.data.articles;
    const jsonData = [
        { headlines },
       
      ];
    console.log("working");
   //res.render('news', { articles: jsonData })
 //   res.render('news',{articles:headlines})
   res.json(headlines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news headlines' });
  }
});



module.exports=newsr