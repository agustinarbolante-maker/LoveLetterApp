# 💌 Love Letter App

A beautiful, interactive React web application for sharing and viewing love letters with animations and emotional storytelling features.

## ✨ Features

- **💌 Letter Inbox** - Browse through a collection of heartfelt letters with smooth animations
- **🔐 Password Protection** - Some letters are password-protected for added intimacy
- **💜 Letter Responses** - Write and send letters back to the recipient
- **🎵 Music Playlist** - Curated playlist of songs that complement the love letter theme
- **🎁 Gift Reveal** - Interactive gift opening experience before accessing the letters
- **🔒 Authentication** - Password-protected access to the app
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **✨ Smooth Animations** - Framer Motion animations for a delightful user experience

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: CSS3 with animations
- **Animation Library**: Framer Motion 10.16.4
- **Build Tool**: Vite 4.4.5
- **HTTP Client**: Axios 1.6.0
- **Deployment**: Netlify

## 📁 Project Structure

```
LoveLetterApp/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── InboxSection.jsx         # Letter display & compose
│   │   ├── YouveGotMailPopup.jsx    # Login popup showing latest letter
│   │   ├── LetterDetail.jsx         # Detailed letter view
│   │   ├── MusicSection.jsx         # Music playlist display
│   │   ├── WhySection.jsx           # Info section
│   │   ├── ClueCard.jsx             # Clue/hint cards
│   │   ├── NyanCat.jsx              # Easter egg animation
│   │   └── YouveGotMailPopup.jsx    # Mail notification
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx            # Main dashboard with tabs
│   │   ├── PasswordPage.jsx         # Login/password entry
│   │   └── GiftPage.jsx            # Gift reveal animation
│   ├── data/
│   │   └── siteData.js             # Embedded letters and songs data
│   ├── styles/              # CSS files for components
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vercel.json              # Deployment configuration
├── vite.config.js           # Vite build configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 💌 Letters

The app comes with 14 pre-written love letters arranged by date (newest first):

1. **I miss you** (08/25/26) - Most recent
2. **Tired, But not giving up** (07/25/26)
3. **To Love is to Understand** (07/18/26)
4. **Adapting** (07/09/26)
5. **Willing to Wait!** (06/24/26)
6. **???? (Fuhh this Day)** (06/12/26) - Password protected
7. **????** (06/12/26) - Password protected
8. **Ink and Tears** (06/11/26)
9. **What's With You?** (06/04/26)
10. **????** (05/05/26) - Password protected
11. **The Letter That Almost Ended Everything** (04/20/26)
12. **100 Things I Like About You!** (04/04/26)
13. **Bars From Mars!** (03/15/26)
14. **My First Letter! (Don't Judge Pls...)** (02/06/26)

### Adding New Letters

Edit `src/data/siteData.js` and add a new object to the `LETTERS` array:

```javascript
{
  "id": 1782432015000,
  "author": "Letter Title",
  "content": "Letter content here...",
  "password": "optional-password", // Omit for public letters
  "timestamp": "2026-09-01T00:00:00.000Z"
}
```

## 🎵 Music Playlist

The app includes a curated playlist of 18 romantic songs. Edit the `SONGS` array in `src/data/siteData.js` to customize.

## 🔐 Features Explained

### Password Protection
Some letters require a password to read. Passwords are:
- "Broken"
- "Cigarette"
- "Addiction"

### Login Flow
1. Enter password on PasswordPage
2. Open the gift animation
3. See "You've Got Mail!" popup with the most recent letter
4. Navigate to HomePage with tabs for Inbox, Your Letters, Music, and Why

### Inbox Section
- **💌 My Letters to You**: Public letters (requires 5 clicks to unlock the locked inbox view)
- **💜 Your Letters**: Letters written in response to the main person

## 📤 API Integration

The app can send letters to a backend API:

```javascript
POST http://localhost:3000/api/letters
{
  "author": "From Jodi",
  "content": "letter content"
}
```

To enable: Replace `localhost:3000` with your API endpoint in `InboxSection.jsx`.

## 🎨 Styling

All components use CSS modules located in `src/styles/`. The app uses:
- Smooth transitions and animations with Framer Motion
- Custom CSS for unique designs
- Responsive breakpoints for mobile/tablet/desktop

## 🚢 Deployment

This project is deployed on **Netlify**. Every push to the main branch automatically triggers a new deployment.

### Environment Setup
- Build command: `npm run build`
- Output directory: `dist`

## 📝 Recent Updates (Session: 2026-08-29)

### ✅ Added 4 New Letters
- Adapting (7/9/26)
- To Love is to Understand (7/18/26)
- Tired, But not giving up (7/25/26)
- I miss you (08/25/26)

### ✅ Rearranged Letters by Date
- Reorganized all 14 letters in chronological order (newest first)
- Most recent letter now appears at the top of the inbox
- Ensures consistent date ordering across the app

### ✅ Updated Login Popup
- Changed `YouveGotMailPopup.jsx` to dynamically display the most recent letter
- No longer shows hardcoded letter content
- Automatically updates when new letters are added
- Currently displays "I miss you" (08/25/26) on login

## 🔄 Git History

Latest commits:
```
67de77b - Rearrange letters by date - most recent first
140e000 - Update login popup to show most recent letter dynamically
d7f6cc0 - Add 4 new love letters to collection
d8af54b - Add encouragement and warning messages to password page
```

## 📧 Contact & Attribution

Created with ❤️ for sharing meaningful moments and emotions.

---

**Last Updated**: August 29, 2026
**Version**: 1.0.0
