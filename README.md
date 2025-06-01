# Smart Travel Companion

## Setup Instructions

### Step 1: Set up your environment
Follow the React Native environment setup guide at [reactnative.dev](https://reactnative.dev/docs/set-up-your-environment)

### Step 2: Install dependencies
```sh
yarn
```

### Step 3: Install iOS dependencies
```sh
yarn pod
```

### Step 4: Set up environment variables
```sh
cp env-example .env
```
Then fill in the real values in the `.env` file.

### Step 5: Start the Metro bundler with a clean cache
```sh
yarn start:clean
```

### Step 6: Run the application
Open another terminal window and run:
```sh
yarn ios     # For iOS
```
or
```sh
yarn android # For Android
```

## Debugging

- Use default React Native Dev tools by pressing `J` on the Metro terminal.
- Download Reactotron: https://github.com/infinitered/reactotron

## Testing
Run Jest unit tests with
```sh
yarn test
```

## Linting
Run ESLint with
```sh
yarn lint
```

## Folder Structure

```
/app                    # Main application code
  /assets               # Static assets (images, fonts, etc.)
  /components           # Reusable UI components
  /constants            # Application constants and configuration
  /features             # Feature modules
    /auth               # Authentication features
    /dashboard          # Main dashboard/home screen
    /place-details      # Place details features
    /settings           # Application settings
    /trip-planner       # Trip planning features
  /hooks                # Custom React hooks
  /localization         # Internationalization and localization
  /mocks                # Mock data for testing
  /navigation           # Navigation configuration
  /services             # API services and external integrations
  /state                # State management (Redux)
  /theme                # UI theming
  /utils                # Utility functions
/android                # Android-specific code
/ios                    # iOS-specific code
/assets                 # Global assets
/__tests__              # Tests
```
