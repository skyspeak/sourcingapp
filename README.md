# Sourcing Room

Early-stage fundraising sourcing application built for investors to track deals, founders, traction, and share decks with access control.

## Features

- **Deal Management**: Create and track early-stage deals with comprehensive data (traction, comps, use of funds)
- **Founder Profiles**: Maintain founder bios, accomplishments, and backgrounds
- **Deck Sharing**: Share fundraising decks with DocSend-like access control (email gate + password)
- **Admin Console**: Password-protected admin area for creating and editing content
- **Share Links**: Generate secure share links for deck access with granular controls

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Local JSON storage (easily upgradeable to Prisma/database)

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Run the dev server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Admin Access

- Navigate to `/admin`
- Default password: `sourcing-admin`
- To change: Edit `.env.local` and set `ADMIN_SECRET=your-password`

## Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/skyspeak/sourcingapp)

### Manual Deploy

1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository: `skyspeak/sourcingapp`
5. Set the root directory to `web`
6. Add environment variable:
   - `ADMIN_SECRET`: Your admin password
7. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## Environment Variables

Create a `.env.local` file:

```bash
# Admin password
ADMIN_SECRET=your-secure-password
```

**Important**: Set `ADMIN_SECRET` in your Vercel deployment settings under "Environment Variables"

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin console
│   │   ├── deals/        # Deal management
│   │   ├── founders/     # Founder profiles
│   │   └── share/        # Share link access
│   ├── components/       # React components
│   └── lib/              # Data layer & actions
├── data/                 # JSON data store
│   ├── deals.json
│   └── founders.json
└── public/               # Static assets
```

## Routes

- `/` - Homepage with latest deals
- `/deals` - All deals list
- `/deals/new` - Create deal (admin only)
- `/deals/:id` - Deal detail page
- `/deals/:id/edit` - Edit deal (admin only)
- `/founders` - Founder profiles list
- `/founders/:id` - Founder detail page
- `/admin` - Admin console
- `/admin/deals` - Admin deal hub
- `/admin/founders/new` - Create founder page
- `/share/:token` - Access-controlled deck sharing

## License

MIT
