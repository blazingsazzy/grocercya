# Grocercya Mobile App

Grocercya is a React Native (Expo) mobile application that introduces users to a modern grocery delivery experience through a clean onboarding flow and branded splash screen.

This project focuses on strong UI structure, scalable design architecture, and reusable components while maintaining a simple and intuitive user experience.

---

## Project Overview

The current version of the app implements:

- Splash Screen with SVG branding
- Swipeable Onboarding Carousel (4 slides)
- Custom Progress Indicator
- Global Typography System (Poppins Font)
- Reusable UI Components
- Pixel-accurate layout using Safe Areas

The goal of this implementation is to demonstrate professional React Native architecture using the Expo managed workflow.

---

## Architecture & Design Decisions

This project follows a scalable folder structure to support future growth:


### Key Design Principles

- **Component Reusability**  
  A global `AppText` component ensures consistent typography across the application without repeating font configurations.

- **Separation of Concerns**  
  Screens focus on UI behavior, while styling and constants are centralized in the theme system.

- **Scalable Navigation**  
  React Navigation Native Stack is used to manage screen transitions cleanly.

---

##  UI Features

### Splash Screen
- Black background with centered SVG logo
- Automatic navigation after a short delay
- StatusBar styled for visual consistency

### Onboarding Experience
- Horizontal swipeable carousel using FlatList
- Full-width progress indicator aligned with screen edges
- Dynamic button behavior:
  - Skip / Next on slides 1–3
  - Get Started on slide 4
- SVG-based illustrations imported as React components

---

##  Typography System

The application uses **Poppins** as the global font family.

Fonts are loaded once at the application root and applied through a reusable `AppText` component.  
This approach improves maintainability and ensures consistent text styling throughout the app.

---

##  Tech Stack

- React Native
- Expo (Managed Workflow)
- TypeScript
- React Navigation (Native Stack)
- react-native-svg
- Expo Google Fonts (Poppins)

---

##  Development Setup

### 1. Install dependencies

```bash
npm install
