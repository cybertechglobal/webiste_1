## Autohouse Website Template 1

The application is powered by Next.js 15.5.2, fully utilizing TypeScript, strict type checking and server actions.

## Installation and Setup

**Clone the repository:**

```bash
git clone git@github.com:cybertechglobal/webiste_1.git
```

Navigate to the project's root directory and copy the `.env.example` file to a new file named `.env`.

```bash
cp .env.example .env
```

**Populate the .env file:**

Open the newly created .env file and fill in the appropriate values for your local development environment. For example:

```bash
# .env example content
NEXT_PUBLIC_BE_APP_URL=https://api.com
AUTH_EMAIL=email@gmail.com
AUTH_PASSWORD=password
```

**Install the dependencies:**

Navigate to the project's root directory and run:

```bash
npm i
```

## Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
# build the app
npm run build
# run the production build
npm run start
# or simply
npm run build && npm run start
# combine the two
```

## Troubleshooting

If the project is not installing or running, make sure your node version is at least `18.18.0`.
