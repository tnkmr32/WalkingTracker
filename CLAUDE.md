# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run

```bash
# Build debug APK
./gradlew assembleDebug

# Install on connected device/emulator
./gradlew installDebug

# Run unit tests
./gradlew test

# Run a single unit test class
./gradlew test --tests "com.example.walkingtracker.ExampleUnitTest"

# Run instrumented (on-device) tests
./gradlew connectedAndroidTest

# Lint
./gradlew lint
```

## Project Overview

Single-module Android app (`app/`) using **Jetpack Compose** with Material3. The project is at the blank-slate stage — `MainActivity` renders a placeholder "Hello Android" screen. The intended feature is a walking/step tracker.

- **minSdk 33** (Android 13), **targetSdk 36**
- **AGP 9.1.1**, **Kotlin 2.2.10**, **Compose BOM 2024.09.00**
- All dependency versions are centralized in `gradle/libs.versions.toml`

## Architecture

The app uses a single `ComponentActivity` with Compose as the UI layer. The theme (`ui/theme/`) supports dynamic color (Android 12+), dark mode, and fallback static color schemes.

When adding features, the expected pattern for this type of app is:
- `ViewModel` (via `lifecycle-viewmodel-compose`) for state — the dependency is not yet added
- `STATE_PERMISSION` / `ACTIVITY_RECOGNITION` manifest permission for step counting via `SensorManager` or `HealthConnect`
- Compose `@Composable` screens wired up through `NavHost` if multiple screens are needed

## Key Files

| File | Purpose |
|---|---|
| `app/src/main/java/…/MainActivity.kt` | Entry point; replace placeholder content here |
| `app/src/main/AndroidManifest.xml` | Add permissions (e.g., `ACTIVITY_RECOGNITION`) here |
| `app/src/main/java/…/ui/theme/` | Theme, colors, typography |
| `gradle/libs.versions.toml` | All dependency and plugin versions |
| `app/build.gradle.kts` | Module-level build config |
