# KMG Carbon Footprint Calculator

A polished, multilingual, kiosk-style web application designed for the Regional Ecological Summit (RES). It allows summit guests to calculate their estimated annual carbon footprint via an interactive, touch-friendly interface, providing actionable recommendations and complete calculation transparency.

This app runs entirely client-side and is built to be hosted easily on GitHub Pages with zero backend infrastructure.

## Key Features

- **No Backend Required**: Fully static site using Vite + React. All logic runs client-side.
- **Multilingual Support**: Available in Kazakh, Russian, and English.
- **Data-Driven Transparency**: Calculations and emission factors are driven by a central CSV file (`factors_master.csv`). A dedicated UI panel shows exactly how each category was calculated.
- **Two Operation Modes**: 
  - *Simple Mode*: Fast, touch-friendly range selections ideal for busy expos.
  - *Advanced Mode*: Allows users to input exact data (kWh, m³, km) for higher accuracy.
- **Actionable Recommendations**: Deterministic rules suggest ways to reduce footprint based on user's highest emission categories.

## Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

## Deployment to GitHub Pages

1. Build the static site:
   ```bash
   npm run build
   ```
2. The output will be generated in the `dist/` directory.
3. You can deploy the contents of the `dist/` directory directly to any static hosting provider like GitHub Pages, Vercel, or Netlify.

*If deploying to a sub-path on GitHub Pages (e.g., `https://username.github.io/kmg-calculator/`), be sure to set the `base` configuration in `vite.config.js` to `'/kmg-calculator/'`.*

## Modifying Content and Data

All content is cleanly separated from the UI logic and lives in the `public/data/` directory.

### Updating Emission Factors
Edit `public/data/factors_master.csv`. This master table stores all calculation coefficients.
- The calculator uses `category`, `subcategory`, and `fallback_order` to find the best available emission factor.
- You can add new factors or update existing ones seamlessly by editing this CSV file.

### Translating the App
Edit `public/data/translations.json`. 
- The JSON contains translation keys for UI elements, labels, questions, and error messages.
- To add a new language, duplicate the `"en"` block, rename the key (e.g., `"zh"`), and translate the values. You will also need to add a button for it in `Header.jsx`.

### Modifying Recommendations
Edit `public/data/recommendations.json`.
- Recommendations are organized by calculation category (`electricity`, `car`, etc.) and language (`ru`, `kk`, `en`).
- When a user finishes the questionnaire, the system determines the highest contributing category and displays these specific recommendations.

## Replacing Logos

Replace the placeholder logo images located at:
- `public/assets/kmg-logo.png`
- `public/assets/res-logo.png`

The header components are built to handle image load failures gracefully if the logo files are temporarily missing.

## Limitations and Assumptions

- This calculator provides an *indicative personal footprint estimate*. It is designed for educational and comparative purposes, not for official audited greenhouse gas inventories.
- While efforts are made to use Kazakhstan-specific emission factors (e.g., IEA grid averages), some calculations rely on regional or international proxies where specific local data is unavailable.
- For public transport and flights, averages and international DEFRA defaults are used as fallbacks. The confidence level of each factor is fully visible to the user via the "How was this calculated?" transparency panel.
