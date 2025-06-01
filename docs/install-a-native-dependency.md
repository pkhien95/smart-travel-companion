# Installing Native Dependencies in React Native

This guide explains how to add new libraries with native iOS and Android configurations to your React Native project. We'll cover the general process and provide specific examples using libraries from our project.

## General Process

### 1. Install the Package

```bash
yarn add <package-name>
```

### 2. Link the Native Code

For React Native 0.60 and above, [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) is used to automatically link native dependencies. After installing the package:

```bash
# For iOS, install pods
yarn pod

# For Android, sync the project with Gradle
cd android && ./gradlew clean && cd ..
```

### 3. Configure Native Platforms

Depending on the library, you may need to add specific configurations to:

- **Android**: 
  - `AndroidManifest.xml` for permissions and features
  - `build.gradle` files for dependencies and settings
  
- **iOS**: 
  - `Info.plist` for permissions and capabilities
  - `Podfile` for specific pod configurations

### 4. Rebuild Your App

```bash
# For iOS
yarn ios

# For Android
yarn android
```

## Examples from Our Project

Let's look at how we've integrated some common native dependencies:

### 1. React Native Permissions

[react-native-permissions](https://github.com/zoontek/react-native-permissions) provides a unified way to handle permissions in React Native.

#### Installation

```bash
yarn add react-native-permissions
```

#### Android Configuration

In `android/app/src/main/AndroidManifest.xml`, add the required permissions:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- For location permissions -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  
  <!-- For camera and photo library permissions -->
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
  
  <!-- Rest of your manifest -->
</manifest>
```

#### iOS Configuration

In `ios/YourApp/Info.plist`, add the required permission descriptions:

```xml
<dict>
  <!-- Location permissions -->
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>We need your location to show your position on the map.</string>
  
  <!-- Camera permissions -->
  <key>NSCameraUsageDescription</key>
  <string>Take photo of your places</string>
  
  <!-- Photo library permissions -->
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Add photos to your saved places</string>
  
  <!-- Rest of your Info.plist -->
</dict>
```

### 2. React Native Image Picker

[react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker) provides access to the device's image library and camera.

#### Installation

```bash
yarn add react-native-image-picker
```

#### Android Configuration

In `android/app/src/main/AndroidManifest.xml`, add:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
  <!-- For Android 9 and below -->
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  
  <!-- Rest of your manifest -->
</manifest>
```

#### iOS Configuration

In `ios/YourApp/Info.plist`, add:

```xml
<dict>
  <key>NSCameraUsageDescription</key>
  <string>Take photo of your places</string>
  
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Add photos to your saved places</string>
  
  <!-- Rest of your Info.plist -->
</dict>
```

### 3. React Native Geolocation Service

[react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service) provides geolocation services for React Native.

#### Installation

```bash
yarn add react-native-geolocation-service
```

#### Android Configuration

In `android/app/src/main/AndroidManifest.xml`, add:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  
  <!-- For Android 10+ (API level 29+) -->
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  
  <!-- Rest of your manifest -->
</manifest>
```

#### iOS Configuration

In `ios/YourApp/Info.plist`, add:

```xml
<dict>
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>We need your location to show your position on the map.</string>
  
  <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
  <string>We need your location to show your position on the map and provide navigation.</string>
  
  <!-- Rest of your Info.plist -->
</dict>
```

### 4. React Native Maps

[react-native-maps](https://github.com/react-native-maps/react-native-maps) provides map components for React Native.

#### Installation

```bash
yarn add react-native-maps
```

#### Android Configuration

1. In `android/app/src/main/AndroidManifest.xml`, add:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- Inside the application tag -->
  <application>
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="YOUR_API_KEY_HERE"/>
  </application>
</manifest>
```

2. In `android/app/build.gradle`, add:

```gradle
android {
  defaultConfig {
    // Use this if you're using react-native-config
    resValue "string", "google_maps_key", project.env.get("GOOGLE_MAPS_API_KEY")
    
    // Or hardcode the key (not recommended for production)
    // resValue "string", "google_maps_key", "YOUR_API_KEY_HERE"
  }
}
```

#### iOS Configuration

1. In `ios/Podfile`, you may need to specify the Google Maps version:

```ruby
target 'YourApp' do
  # ...
  
  # Specify the version of Google Maps
  pod 'GoogleMaps', '7.4.0'
  
  # ...
end
```

2. Add your API key to `AppDelegate.mm`:

```objective-c
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Add this line before the RCTBridge initialization
  [GMSServices provideAPIKey:@"YOUR_API_KEY_HERE"];
  
  // Rest of your AppDelegate implementation
}
@end
```

## Common Issues and Troubleshooting

### Android

1. **Manifest Merger Failures**: If you get manifest merger failures, you may need to add `tools:replace="android:value"` to resolve conflicts.

2. **Gradle Sync Issues**: Make sure your project's Gradle version is compatible with the library you're adding.

3. **Permissions Not Working**: Ensure you're requesting runtime permissions correctly for Android 6.0+.

### iOS

1. **Pod Install Failures**: Try cleaning your pods with `pod deintegrate` and then reinstalling.

2. **Missing Permissions**: Always add the required usage descriptions in Info.plist.

3. **Linking Issues**: If autolinking doesn't work, you may need to manually link the library.

## Best Practices

1. **Keep Dependencies Updated**: Regularly update your dependencies to get bug fixes and new features.

2. **Use Environment Variables**: Store API keys and sensitive information in environment variables using react-native-config.

3. **Test on Both Platforms**: Always test your implementation on both iOS and Android.

4. **Check Library Documentation**: Always refer to the library's official documentation for the most up-to-date installation instructions.
