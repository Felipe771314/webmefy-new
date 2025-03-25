module.exports = (suggestedSection) => {
  return [
    {
      type: 'header',
      content: 'DEPRECATED',
      info: `This section is now DEPRECATED, please use "${suggestedSection}" instead.`,
    },
  ];
};
