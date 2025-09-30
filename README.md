# BearTracks.Nice 🐻✨

A beautiful, modern campus Lost & Found system built with Next.js, TypeScript, and Tailwind CSS. Features AI-powered matching, real-time notifications, and a mobile-first PWA design.

## ✨ Features

- **Beautiful UI**: Modern, colorful, and super appealing design with glass morphism effects
- **Mobile-First PWA**: Works seamlessly on all devices with offline capabilities
- **Smart Matching**: AI-powered text and image matching to reunite items with owners
- **Real-time Updates**: Instant notifications for matches and claim status
- **Office Dashboard**: Comprehensive management tools for campus staff
- **Privacy-First**: Minimal data collection with strong security practices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🚀 One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JaCARYK/BearTracks&env=NEXT_PUBLIC_API_URL&envDescription=Backend%20API%20URL&envLink=https://github.com/JaCARYK/BearTracks/blob/main/DEPLOYMENT.md)

[![Deploy Backend to Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/JaCARYK/BearTracks&plugins=postgresql&envs=SECRET_KEY&SECRET_KEYDesc=Secret%20key%20for%20JWT%20tokens)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL with pgvector extension (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/beartracks-nice.git
   cd beartracks-nice
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/beartracks"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # File Storage
   AWS_ACCESS_KEY_ID="your-aws-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret"
   AWS_S3_BUCKET="beartracks-photos"
   AWS_REGION="us-west-1"
   
   # AI/ML Services (optional)
   OPENAI_API_KEY="your-openai-key"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
beartracks-nice/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── lost/             # Report lost item
│   ├── found/            # Report found item
│   └── office/           # Office dashboard
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   └── StatusBadge.tsx  # Status indicators
├── lib/                 # Utility functions
│   └── utils.ts        # Common utilities
├── types/              # TypeScript type definitions
│   └── index.ts       # Main types
├── public/            # Static assets
│   └── manifest.json  # PWA manifest
└── README.md         # This file
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Secondary**: Purple gradient (`#d946ef` to `#c026d3`)
- **Success**: Green (`#22c55e`)
- **Warning**: Amber (`#f59e0b`)

### Components
- **Glass Cards**: Frosted glass effect with backdrop blur
- **Gradient Buttons**: Smooth hover animations with lift effect
- **Status Badges**: Color-coded status indicators
- **Input Fields**: Rounded corners with focus states

## 🔧 Configuration

### Database Setup (PostgreSQL + pgvector)

1. **Install PostgreSQL and pgvector**
   ```bash
   # macOS with Homebrew
   brew install postgresql pgvector
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create database and enable extensions**
   ```sql
   CREATE DATABASE beartracks;
   \c beartracks;
   CREATE EXTENSION IF NOT EXISTS vector;
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

3. **Run migrations** (when backend is implemented)
   ```bash
   npm run db:migrate
   ```

### Campus SSO Integration

The system supports campus Single Sign-On through SAML/OAuth2. Configure your identity provider in the environment variables.

### File Storage

Photos are stored in AWS S3 or compatible storage. Configure your bucket and credentials in the environment variables.

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

## 📱 PWA Features

- **Offline Support**: Core functionality works without internet
- **Push Notifications**: Real-time updates for matches and claims
- **Install Prompt**: Add to home screen on mobile devices
- **Background Sync**: Queue actions when offline

## 🔒 Security & Privacy

- **Data Minimization**: Only collect essential information
- **Encryption**: All data encrypted in transit and at rest
- **Access Control**: Role-based permissions (student/office/admin)
- **Audit Logging**: Complete trail of all actions
- **GDPR Compliant**: Right to deletion and data portability

## 🚀 Deployment

### Vercel (Recommended for Frontend)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main**

### Docker

```bash
# Build the image
docker build -t beartracks-nice .

# Run the container
docker run -p 3000:3000 beartracks-nice
```

### AWS/GCP/Azure

Use the included Terraform configurations in `/infra` directory for cloud deployment.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Use Prettier and ESLint configurations
- **Commits**: Follow conventional commit format
- **Testing**: Write tests for new features
- **Accessibility**: Ensure WCAG 2.1 AA compliance

## 📊 Analytics & Monitoring

- **User Analytics**: Track adoption and usage patterns
- **Performance Monitoring**: Core Web Vitals and error tracking
- **Match Accuracy**: Monitor AI matching performance
- **Success Metrics**: Items reunited, time to match, user satisfaction

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- [x] Beautiful responsive UI
- [x] Report lost/found items
- [x] Office dashboard
- [x] Basic matching algorithm
- [x] PWA capabilities

### Phase 2 (AI Enhancement)
- [ ] Image similarity matching with CLIP
- [ ] Text embeddings for better search
- [ ] Auto-suggestions and notifications
- [ ] Advanced analytics dashboard

### Phase 3 (Scale & Polish)
- [ ] Multi-campus support
- [ ] Mobile app (React Native)
- [ ] Integration with campus systems
- [ ] Advanced admin tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern glass morphism and gradient trends
- **Icons**: Heroicons for beautiful, consistent iconography
- **Animations**: Framer Motion for smooth, delightful interactions
- **Campus Community**: For feedback and feature requests

---

**Made with ❤️ for campus communities everywhere**

For questions, support, or feature requests, please open an issue or contact the development team.