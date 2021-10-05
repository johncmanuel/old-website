const axios = require('axios');
const convert = require('xml-js');


// Get information from array of books from Goodreads API and return an array of objects with its information
function getBookInfo(books) {
    let json_obj;
    let arr = [];
    books.forEach(element => {
        // Get dates
        let date_to_be_changed = element['read_at']['_text'];
        
        // Array contains undefined for some reason
        if (date_to_be_changed != undefined) {
            // Extracting only the month, day, and year
            // Example string: 'Tue Jul 14 08:08:30 -0700 2020'
            let date_month_and_day = date_to_be_changed.substring(4, 10);
            let date_year = date_to_be_changed.substring(26, 30);
            let date = date_month_and_day + ' ' + date_year;

            // Add the title, author, and date read
            json_obj = {
                title: element['book']['title']['_text'],
                author: element['book']['authors']['author']['name']['_text'],
                date_read: date
            };
            // Append object into an array
            arr.push(json_obj);
            
        } else return null;
    });
    return arr;
}

// Pull raw data from Goodreaads API and insert it into database
export default async (req, res) => {
    const url = `https://www.goodreads.com/review/list/${process.env.GOODREADS_ID}.xml?key=${process.env.GOODREADS_KEY}&shelf=read&sort=date_read&per_page=200&v=2`;
    
    try {
        if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');

            // Get XML response from Goodreads
            const response = await axios.get(url);
            const res_data = await response.data;

            // Convert XML response into JSON
            const goodreads_data = convert.xml2js(res_data, { compact: true, spaces: 2 });

            // Get array of books within response
            const books = goodreads_data['GoodreadsResponse']['reviews']['review'];
            const data = getBookInfo(books);

            res.status(200).json(data);
        } else {
            res.status(500);
        }
    }
    catch (error) {
        res.status(500);
    }
    res.end();
}