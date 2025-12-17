# Keval Auto Service - Website

A modern, responsive web application for Keval Auto Service, a personal home garage specializing in oil changes and automotive diagnostics.

## Features

- 🎨 Beautiful, modern UI with responsive design
- 📝 Quote request form via Fillout
- 🚗 Professional service showcase
- 📱 Fully responsive design
- ✅ Easy form customization via Fillout
- 🎯 Smooth scrolling navigation
- 📊 Service showcase section

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **@fillout/react** - Official Fillout React component for form integration

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd "Keval Auto Service"
```

2. Install dependencies:

```bash
npm install
```

3. **Customize the Fillout form** (optional):

   The form is already integrated using Fillout (ID: `6FJ9EYXNtvus`). To customize:

   - Go to [Fillout.com](https://www.fillout.com/)
   - Log in to your account
   - Edit your form fields, styling, and notifications
   - Changes will automatically appear on your website

### Running the Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Quote Form

The quote request form is powered by [Fillout](https://www.fillout.com/) using their official React component, which provides:

- **Modal/Popup interface** - Opens when "Request a Quote" button is clicked
- **Built-in spam protection**
- **Email notifications** - Configured in Fillout dashboard
- **Response management dashboard**
- **Easy customization** without code changes
- **Mobile-friendly design**

## Project Structure

```
Keval Auto Service/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with CTA
│   │   ├── Hero.css
│   │   ├── Services.jsx      # Services showcase
│   │   ├── Services.css
│   │   ├── Footer.jsx        # Footer section
│   │   └── Footer.css
│   ├── App.jsx               # Main app component (includes Fillout modal)
│   ├── App.css
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Colors

The color scheme can be customized in `src/index.css` by modifying the CSS variables:

```css
:root {
  --primary-color: #d32f2f;
  --primary-dark: #9a0007;
  --primary-light: #ff6659;
  /* ... other variables */
}
```

### Services

To modify the services displayed, edit the `services` array in `src/components/Services.jsx`.

## Customizing the Form

To replace with your own Fillout form:

1. Create a form at [Fillout.com](https://www.fillout.com/)
2. Get your form ID from the Fillout dashboard
3. Open `src/App.jsx`
4. Replace the `filloutId` prop value with your form ID

```jsx
<FilloutPopupEmbed
  filloutId="YOUR_FORM_ID_HERE"
  isOpen={isFormOpen}
  onClose={closeQuoteForm}
  inheritParameters
/>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary to Keval Auto Service.

## Contact

For questions or support, please use the quote request form on the website.
