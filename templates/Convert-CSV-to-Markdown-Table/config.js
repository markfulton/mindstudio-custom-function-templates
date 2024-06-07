config = {
  thumbnailUrl: '',
  blockStyle: {
    backgroundImageUrl: '',
    backgroundColor: '#2C3E50',
    foregroundColor: '#FFFFFF',
    label: 'Convert CSV Data to Markdown',
  },
  configurationSections: [
    {
      title: 'Configuration',
      items: [
        {
          label: 'CSV Input',
          variable: 'csvResults',
          type: 'text',
          helpText: 'Enter CSV data as text or use a {{variable}} containing the CSV string.',
        },
        {
          label: 'Output Markdown Variable',
          variable: 'outputVar',
          type: 'text',
          helpText: 'Variable to output the resulting Markdown table to.',
        },
      ],
    },
  ],
}
