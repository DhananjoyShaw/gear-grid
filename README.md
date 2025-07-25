# GearGrid - AI-Powered Car Marketplace

A modern, full-stack car marketplace built with Next.js 15, featuring AI-powered image search, test drive bookings, and comprehensive car management. GearGrid provides an intuitive platform for users to discover, save, and test drive vehicles with advanced search capabilities.


## 🚀 Live Demo

[GEARGRID]()


## ✨ Features

### 🎯 Core Features
- **AI-Powered Image Search**: Upload car images and find similar vehicles using Google's Gemini AI
- **Advanced Car Search**: Filter by make, model, body type, price range, and more
- **Test Drive Booking**: Schedule test drives with flexible time slots
- **User Authentication**: Secure authentication with Clerk
- **Saved Cars**: Save favorite vehicles for later viewing
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🏢 Admin Features
- **Dashboard Analytics**: Comprehensive overview of cars, bookings, and user activity
- **Car Management**: Add, edit, and manage car listings with image uploads
- **Test Drive Management**: View and manage test drive bookings
- **Settings Management**: Configure dealership information and working hours

### 🔧 Technical Features
- **Server-Side Rendering**: Optimized performance with Next.js 15
- **Database Management**: PostgreSQL with Prisma ORM
- **Image Storage**: Supabase for secure image hosting
- **Rate Limiting**: ArcJet integration for API protection
- **Form Validation**: Zod schema validation with React Hook Form


## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **File Storage**: Supabase
- **AI Integration**: Google Gemini AI
- **Rate Limiting**: ArcJet
- **UI Components**: ShadCN, Lucide React Icons

### Project Structure
```
carportal/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main user routes
│   └── globals.css        # Global styles
├── actions/               # Server actions
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```


## 📊 Database Schema

### Core Models
- **User**: User accounts with authentication and roles
- **Car**: Vehicle listings with detailed specifications
- **TestDriveBooking**: Test drive scheduling and management
- **UserSavedCar**: User's saved/favorite cars
- **DealershipInfo**: Dealership configuration
- **WorkingHour**: Business hours management

### Key Relationships
- Users can save multiple cars
- Users can book multiple test drives
- Cars can have multiple test drive bookings
- Dealership has configurable working hours

## 🔐 Authentication & Authorization

### User Roles
- **USER**: Regular users can browse cars, save favorites, and book test drives
- **ADMIN**: Administrators can manage cars, view bookings, and configure settings


## 🤖 AI-Powered Features

### Image Search
- Upload car images to find similar vehicles
- AI analyzes make, model, body type, and color
- Rate-limited API calls for optimal performance
- Supports JPG, PNG formats up to 5MB

### Search Capabilities
- Text-based search by make, model, or description
- Advanced filtering by price, year, mileage, fuel type
- Body type and make-specific browsing
- Real-time search results


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

⭐ If you found this project helpful, please give it a star!
