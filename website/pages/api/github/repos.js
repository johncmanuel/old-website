const axios = require('axios');


/**
 * Get repos info from array fetched from GitHub API.
 * 
 * @param repos Array containing objects, each packed with information about a repository I own.
 * @return      Array of objects with specific data I need.
 */
function getReposInfo(repos) {
    let json_obj;
    let arr = [];
    
    repos.forEach(element => {
        let date = element['created_at'];

        if (date != undefined) {
            // Example string: 2020-06-05T02:12:32Z
            let date_without_time = date.substring(0, 10);

            json_obj = {
                title        : element['name'],
                details      : element['description'],
                date_created : date_without_time,
                stars        : element['stargazers_count'],
                lang         : element['language'],
                link         : element['html_url']
            };

            arr.push(json_obj);

        } else return null;
    });
    return arr;
}

export default async (req, res) => {
    if (!res) return {};
    if (req.method === "GET") {
        try {
            res.setHeader('Content-Type', 'application/vnd.github.v3+json')
            const fetch = await axios.get('https://api.github.com/users/johncmanuel/repos');

            // Get the data of the response
            const repos = fetch['data'];

            // Traverse through data via getReposInfo function, return what's needed, 
            // and send it to server as JSON
            const data = getReposInfo(repos);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
        }
    } else {
        res.status(500);
    }
    res.end();
}