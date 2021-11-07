/** @type {import('next').NextConfig} */
const { withSuperjson } = require("next-superjson")

module.exports = withSuperjson()({})

module.exports = {
  reactStrictMode: true,
}
