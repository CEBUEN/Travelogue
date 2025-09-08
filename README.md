# Travelogue 🌍✈️

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss\&logoColor=white)
![ShadcnUI](https://img.shields.io/badge/Shadcn-UI-111827)
![Node.js](https://img.shields.io/badge/Node.js-22.12-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-planned-brightgreen?logo=mongodb)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

Travelogue is a full-stack collaborative travel planning app designed to simplify group trips. It combines itinerary creation, shared calendars, AI-assisted trip generation, and real-time collaboration into a single platform with a clean, responsive UI.

## Features 🚀

* **AI Trip Generator** – Personalized itineraries with location, budget, days, and group size.
* **Client-Side Validation + Toast UX** – Input validation with instant feedback via Sonner toast notifications.
* **Google Places Autocomplete** – Seamless destination search and selection.
* **Responsive UI/UX** – Built with React, Vite, Tailwind, and Shadcn UI for a modern, mobile-friendly design.
* **Authentication & Role-Based Access** *(in progress)* – Secure login with personalized dashboards for travelers and organizers.
* **Planned Features**

  * Group management & role permissions
  * Real-time group chat with comment threading and voting
  * Route maps, dashboards, and trip overviews
  * Flight & accommodation tracking
  * Packing checklist and reminders

## Tech Stack 🛠️

* **Frontend**: React 19, Vite, Tailwind CSS v4, Shadcn UI
* **APIs**: Google Places API
* **Notifications**: Sonner `<Toaster/>` with global toast integration
* **Backend (planned)**: Node.js, Express, MongoDB
* **Deployment**: Vercel (frontend), containerized backend (planned)

## Project Status 📌

* [x] AI Trip Generator with input validation and toast notifications
* [x] Google Places integration
* [x] Responsive form UI with reusable components
* [ ] Authentication and user roles
* [ ] Backend API + database persistence
* [ ] Real-time chat and group collaboration features

## Getting Started ⚡

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/travelogue.git
   cd travelogue
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Add your **Google Places API key** to `.env.local`:

   ```env
   VITE_GOOGLE_API_KEY=your_api_key_here
   ```
4. Run locally:

   ```bash
   npm run dev
   ```

## Contributing 🤝

Currently a solo project, but contributions are welcome. Please open an issue or submit a PR with improvements.

## License 📄

MIT License.

---
