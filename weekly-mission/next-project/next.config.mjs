/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        port: "",
        pathname: "/sstatic/search/**",
      },
      {
        protocol: "https",
        hostname: "data1.pokemonkorea.co.kr",
        port: "",
        pathname: "/2016/06/**",
      },
      {
        protocol: "https",
        hostname: "s.pstatic.net",
        port: "",
        pathname: "/static/www/mobile/**",
      },
      {
        protocol: "https",
        hostname: "jasonwatmore.com",
        port: "",
        pathname: "/_content/images/**",
      },
      {
        protocol: "https",
        hostname: "codeit-frontend.codeit.com",
        port: "",
        pathname: "/static/images/**",
      },
      {
        protocol: "https",
        hostname: "reactjs.org",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "tanstack.com",
        port: "",
        pathname: "/build/_assets/**",
      },
      {
        protocol: "https",
        hostname: "storybook.js.org",
        port: "",
        pathname: "/images/social/**",
      },
      {
        protocol: "https",
        hostname: "testing-library.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "static.cdninstagram.com",
        port: "",
        pathname: "/rsrc.php/**",
      },
      {
        protocol: "https",
        hostname: "static.cdninstagram.com",
        port: "",
        pathname: "/rsrc.php/**",
      },
      {
        protocol: "https",
        hostname: "codeit-images.codeit.com",
        port: "",
        pathname: "/badges/**",
      },
      {
        protocol: "https",
        hostname: "ca.slack-edge.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
