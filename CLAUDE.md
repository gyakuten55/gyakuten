# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

Development server runs on http://localhost:3000

## Architecture Overview

This is a Next.js 15 corporate website for 合同会社GYAKUTEN, built with TypeScript and Tailwind CSS v4.

**Additional Documentation**: Detailed business information and requirements are available in `/Users/aoi/Desktop/GYAKUTEN_HP/gyakuten-hp/情報資料.docx`

### Brand Guidelines
- **Primary color**: #8f2c34 (text-primary, bg-secondary-bg)
- **Background**: #eaf5f8 (bg-primary-bg)
- **Font**: "Aoto Gothic Light" ("あおとゴシック L")
- **Target audience**: Small-to-medium business owners (35-60 years old) with limited IT knowledge
- **Logo**: Expected at `/public/logo.png` (horizontal format, 180x40px recommended)

### Key Business Services (LLMO-focused)
1. **GYAKUTEN LLMO診断** - AI/LLMO website diagnostics (¥0-35,000)
2. **GYAKUTEN Web LLMO** - AI-optimized website development (¥100,000 + ¥5,000/month)
3. **GYAKUTEN Write LLMO** - LLMO-optimized content writing (¥2.5/character)
4. **GYAKUTEN LLMO Consulting** - Comprehensive LLMO consulting (¥250,000/month+)
5. **GYAKUTEN DX** - Custom system development
6. **逆転ブートキャンプ** - 180-day intensive mentorship program

### Component Architecture

**Layout System**:
- `src/components/layout/Layout.tsx` - Main page wrapper with Header/Footer
- `src/components/layout/Header.tsx` - Responsive header with dropdown service menu
- `src/components/layout/Footer.tsx` - Detailed footer with service links and CTAs

**Navigation Structure**:
- Navigation data centralized in `src/types/navigation.ts`
- Service items include name, href, description, and pricing
- Header features a 3-column grid dropdown for services (900px wide, centered)

**Styling Approach**:
- Tailwind CSS v4 with custom theme in `src/app/globals.css`
- CSS custom properties for brand colors
- Responsive design with mobile-first approach
- Header uses flexbox layout: logo (left) + spacer + navigation + CTAs (right)

### Site Structure
```
├─ / (homepage with hero, services overview, CTA)
├─ /features
├─ /results  
├─ /column
├─ /services/
│   ├─ /llmo-diagnosis
│   ├─ /web-llmo
│   ├─ /write-llmo
│   ├─ /llmo-consulting
│   ├─ /dx
│   └─ /bootcamp
├─ /company
├─ /materials (resource downloads)
└─ /contact
```

### Design Philosophy
- **Trust and credibility** for B2B audience
- **Low barrier to entry** - emphasis on free diagnostics as entry point
- **Clear value proposition** - "すべての逆境に、最高の逆転劇を。"
- **CTA strategy** - Drive traffic to free LLMO diagnosis service

### Key Implementation Notes
- All pages should use the Layout component wrapper
- Service descriptions and pricing are defined in navigation.ts and should be kept in sync
- Header service dropdown uses hover state management with mouse enter/leave events
- Mobile navigation uses hamburger menu with full-screen overlay
- Brand colors are defined as CSS custom properties and Tailwind theme extensions