// Convert CSV Data to Markdown table
// by Mark Fulton
// https://www.reinventing.ai/ (Ctrl+Click)

// Read values from config
const csvResults = ai.getConfig('csvResults');
const outputVar = ai.getConfig('outputVar');

//=== Error handling
if (!csvResults) {
  ai.crmLog('No CSV input defined.');
  return;
}

if (!outputVar) {
  ai.crmLog('No output variable defined.');
  return;
}
//===

const parseCSV = (csv) => {
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  const data = lines.slice(1).map(line =>
    line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(field =>
      field.replace(/^"|"$/g, '').trim() 
    )
  );
  return { headers, data };
};

const csvToMarkdown = (parsedCsv) => {
  const { headers, data } = parsedCsv;
  const separator = headers.map(() => '---');
  let markdownTable = `| ${headers.join(' | ')} |\n| ${separator.join(' | ')} |\n`;

  data.forEach(row => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedRow = row.map(cell => cell.replace(urlRegex, '[$1]($1)'));
    markdownTable += `| ${formattedRow.join(' | ')} |\n`;
  });

  return markdownTable;
};

try {
  const parsedCsv = parseCSV(csvResults);
  const markdownTable = csvToMarkdown(parsedCsv);
  ai.vars[outputVar] = markdownTable;
  ai.log('CSV converted to Markdown successfully.');
} catch (e) {
  ai.crmLog('Error converting CSV to Markdown: ' + e.message);
  ai.vars[outputVar] = 'Error during conversion.';
}
