const parseEnv = () => {
  const envVariables = process.env;

  const rssEnvVariables = Object.entries(envVariables)
    .filter(([key]) => key.startsWith('RSS_'));

  const formattedVariables = rssEnvVariables.map(([key, value]) => `${key}=${value}`).join('; ');
  console.log('Parsed RSS environment variables:', formattedVariables);
};

parseEnv();
