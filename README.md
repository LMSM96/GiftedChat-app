# Project Log

## Create Template - React Native TypeScript with Navigation
- ``` yarn create expo-app --template ```
- Select TypeScript with Navigation.
- ``` yarn add react-native-elements ```
- ``` yarn add react-native-gifted-chat ```
- ``` npx expo install firebase ```

## Create Firebase Project
- Go to [Firebase](https://firebase.google.com/)
- Click  `Add Project` and complete the process of creating Project.
- Go To Project Setting, find "Your Apps" section.
- Click `Add app` and create `Web App </>`.

## Configure Firebase in React Native App
- Create ``service`` folder.
- Create `firebase` service file and all the config in it.

## Screens
- We will make 3 screen, Login, Register and Chat.
- For adding Screen, changes needs to be done in :-
  1. `navigation/LinkingConfiguration.ts`
  2. `navigation/index.tsx`
