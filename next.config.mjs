// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
      backendApiUrl: process.env.BACKEND_API_URL || 'http://127.0.0.1:8000',
    },
  };
  
  export default nextConfig;
  