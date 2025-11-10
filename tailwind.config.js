/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}", // 우리가 만든 pages 폴더도 스캔하도록 추가!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}