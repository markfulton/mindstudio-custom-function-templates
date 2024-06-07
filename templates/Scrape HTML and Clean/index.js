// Scrape Body HTML and remove unnecessary elements
// by Mark Fulton
// https://www.reinventing.ai/ (Ctrl+Click)

const url = ai.getConfig('url');

ai.log('Researching top resources...');

// Fetch only the "body" element of the webpage
const selector = 'body'; // CSS selector for the body element
const urlResult = await ai.scrapeUrl(url, { selector: selector });
let htmlResult = urlResult.html;

// Function to simplify HTML content
function simplifyHTML(html) {
  // Remove all HTML tags except those specifically allowed
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, ''); // Remove all script tags
  html = html.replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, '');  // Remove all style tags
  html = html.replace(/<!--[\s\S]*?-->/g, '');                    // Remove all comments

  // Remove all HTML tags except <a> tags
  html = html.replace(/<(?!a\s|\/a)([^>]+)>/gi, '');
  
  return html;
}

// Store the simplified HTML in a variable
if (htmlResult) {
  htmlResult = simplifyHTML(htmlResult);
  ai.vars[ai.config.htmlOutputVar] = htmlResult;
}
