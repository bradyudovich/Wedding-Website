# Wedding Website

A beautiful, single-page React application that functions as a multi-page wedding website with English/Spanish language support.

## Features

- 🎨 **Modern Design**: Clean, elegant interface with Tailwind CSS
- 🌐 **Multi-language**: Toggle between English and Spanish instantly
- 📱 **Responsive**: Mobile-friendly layout
- 🚀 **Fast**: Built with Vite for optimal performance
- 🗺️ **Multiple Pages**: Home, Travel Information, FAQ, and RSVP

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Google Fonts** - Poppins & Playfair Display

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bradyudovich/Wedding-Website.git
cd Wedding-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys the website.

#### Initial Setup

1. **Enable GitHub Pages** in your repository:
   - Go to repository **Settings** > **Pages**
   - Under **Source**, select **"GitHub Actions"** (not the legacy "Deploy from a branch" option)
   - Click **Save**

2. **Push to main branch**:
   ```bash
   git checkout main
   git merge your-feature-branch
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to the **Actions** tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete (green checkmark ✓), your site is live!

4. **Access your website**:
   ```
   https://bradyudovich.github.io/Wedding-Website/
   ```

#### How It Works

- The workflow file `.github/workflows/deploy.yml` automatically:
  - Triggers on every push to the `main` branch
  - Installs dependencies with `npm ci`
  - Builds the production bundle with `npm run build`
  - Deploys the `dist` folder to GitHub Pages
  - Typical deployment time: 2-3 minutes

#### Triggering Manual Deployment

You can also manually trigger a deployment without pushing code:

1. Go to **Actions** tab in GitHub
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select the `main` branch
5. Click **"Run workflow"**

### Manual Deployment (Alternative)

If you prefer to deploy manually or to a different hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - **Netlify**: Drag and drop the `dist` folder to Netlify
   - **Vercel**: Run `vercel --prod` in the project root
   - **Surge**: Run `surge dist your-domain.surge.sh`
   - **Other hosts**: Upload contents of `dist` folder to web root

### Troubleshooting Deployment

#### Blank Page After Deployment

If you see a blank page after deployment, check:

- ✅ GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- ✅ The workflow completed successfully (check Actions tab)
- ✅ Wait 2-3 minutes after deployment for DNS propagation
- ✅ Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- ✅ Check browser console for errors (F12)

#### Workflow Fails

Common issues and solutions:

- **"npm ci" fails**: Delete `package-lock.json` and run `npm install` locally, then commit
- **"Permission denied"**: Ensure repository settings allow GitHub Actions to deploy Pages
- **"Build fails"**: Check for TypeScript/ESLint errors by running `npm run build` locally

#### Routes Don't Work (404 errors)

The project includes a `404.html` file for SPA routing. If routes don't work:

- ✅ Ensure `public/404.html` exists and is being built
- ✅ Check that `vite.config.js` has `base: '/Wedding-Website/'`
- ✅ Verify `App.jsx` uses `basename="/Wedding-Website"` in BrowserRouter

#### Custom Domain Setup

To use a custom domain (e.g., `www.yourwedding.com`):

1. **Add custom domain** in GitHub Pages settings
2. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/', // Change from '/Wedding-Website/' to '/'
   })
   ```
3. **Update `App.jsx`**:
   ```javascript
   <Router basename="/"> {/* Remove basename or use "/" */}
   ```
4. **Update `public/404.html`**:
   ```javascript
   var pathSegmentsToKeep = 0; // Change from 1 to 0
   ```
5. **Configure DNS** according to [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Deployment Checklist

Before deploying to production:

- [ ] Test all routes locally (`npm run preview`)
- [ ] Check mobile responsiveness
- [ ] Test language toggle (EN/ES)
- [ ] Verify RSVP link works
- [ ] Update content in `src/translations.js` if needed
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Run build locally to catch any errors (`npm run build`)
- [ ] Push to main branch or merge PR
- [ ] Monitor GitHub Actions workflow
- [ ] Verify deployment at `https://bradyudovich.github.io/Wedding-Website/`

## Project Structure

```
Wedding-Website/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar with language toggle
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Travel.jsx          # Travel information page
│   │   └── FAQ.jsx             # Frequently asked questions page
│   ├── App.jsx                 # Main app component with routing
│   ├── LanguageContext.jsx     # Language state management
│   ├── translations.js         # English/Spanish translations
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html                  # HTML template
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies and scripts
```

## Language Support

The website supports English and Spanish. Toggle between languages using the button in the navigation bar. All content updates instantly thanks to React Context API.

## Design Specifications

- **Background**: Soft off-white (#F9F8F6)
- **Fonts**: 
  - Poppins for UI elements and body text
  - Playfair Display for headings
- **Color Scheme**: Rose/pink accents for a romantic feel

## License

This project is private and intended for personal use.
