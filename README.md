# PDF Farm 🌱

A mobile-first marketplace platform where users can create, buy, and sell PDFs across various categories.

## 📱 Tech Stack

- **React Native** (Expo managed workflow)
- **TypeScript**
- **Expo Router** (file-based navigation)
- **StyleSheet** (React Native styling)
- **Expo Vector Icons**
- **Expo Linear Gradient**

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo Go app installed on your iOS or Android device

### Installation

```bash
# Clone the repository
git clone https://github.com/ezequielcasillas1/PDfarmarray.git
cd PDfarmarray

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

1. Start the Expo development server with `npm start`
2. Open Expo Go on your mobile device
3. Scan the QR code displayed in your terminal
4. The app will load on your device

## 📂 Project Structure

```
pdf-farm/
├── app/
│   ├── (tabs)/          # Main app tabs (Home, Create, Market, Profile)
│   ├── auth/            # Authentication screens (Onboarding, Sign In)
│   ├── _layout.tsx      # Root layout
│   └── index.tsx        # Entry point
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Input)
│   ├── cards/           # PDF cards, profile cards
│   ├── modals/          # Modals (Credit purchase, PDF preview)
│   └── shared/          # Shared components
├── context/             # React Context providers
├── styles/
│   └── theme.ts         # Design system (colors, spacing, typography)
└── assets/              # Images and static files
```

## 🎨 Features

### Current (v0.1)

- ✅ Onboarding flow (3 slides)
- ✅ Authentication UI (Google Sign-In ready)
- ✅ Home screen with category browsing
- ✅ PDF Creation Lab (4-step wizard UI)
- ✅ Marketplace with tabs and filters
- ✅ Profile screen with stats and settings
- ✅ Bottom tab navigation

### Coming Soon

- 🔜 Supabase backend integration
- 🔜 Google OAuth authentication
- 🔜 PDF upload and AI generation
- 🔜 Credit system and payments
- 🔜 Real-time marketplace
- 🔜 User profiles and analytics

## 📋 Development Roadmap

- **Phase 1**: ✅ UI/UX Development (Complete)
- **Phase 2**: Backend Integration (Supabase)
- **Phase 3**: PDF APIs & AI Integration
- **Phase 4**: Payment & Credit System
- **Phase 5**: Testing & Optimization

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

Private - All rights reserved

---

**Version**: 0.1.0  
**Author**: Ezequiel Casillas  
**Repository**: [github.com/ezequielcasillas1/PDfarmarray](https://github.com/ezequielcasillas1/PDfarmarray)

