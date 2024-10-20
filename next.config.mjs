/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
      "k.kakaocdn.net",
      "pvjzotppiseiqhvqdtqx.supabase.co",
    ],
  },
};

export default nextConfig;
