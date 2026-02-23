# Yuri Nezdemkovski's Personal Website

Welcome to the repository of my personal website, powered
by [Next.js](https://nextjs.org), [Supabase](https://supabase.io), and styled
with [Tailwind CSS](https://tailwindcss.com). Explore the code, fork it, and feel free to reach out if you have any
questions!

## Features

- Seamless operation across the entire [Next.js](https://nextjs.org) stack, including:
    - App Router
    - Middleware
    - Client
    - Server
- `supabase-ssr` package integration for configuring Supabase Auth to use cookies.
- Styling facilitated by [Tailwind CSS](https://tailwindcss.com).
- Optional deployment setup using [Supabase Vercel Integration](#deploy-your-own)
  and [Vercel deploy](https://vercel.com), with environment variables automatically assigned to the Vercel project.

## Getting Started

### 1. Set Up Supabase Project

Create a new project on Supabase - you can do this [via the Supabase dashboard](https://supabase.io).

### 2. Clone the Repository

```bash
git clone git@github.com:nezdemkovski/nezdemkovski.com.git
````

### 3. Navigate to Project Directory

```bash
cd nezdemkovski.com
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Configure Environment Variables

Rename the file .env.local.example to .env.local and update the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found
in [your Supabase project's API settings](https://supabase.com/dashboard/project/_/settings/api).

### 6. Run the Development Server

```bash
pnpm dev
```

Now, the starter kit should be running on [localhost:3000](http://localhost:3000/).

For more on local development, refer
to [Supabase documentation](https://supabase.com/docs/guides/getting-started/local-development).

## Licensing

This project is licensed under the MIT License. See the LICENSE file for details.