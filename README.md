# This is an application which allow user to manage a simple "to-do list".

This project uses redux and redux persist to synchronize and store the data even when there is no internet connexion.
There is a service who allow the user to the post data to a backend (the url of the backend can be changed in that service).

Feature:

- Add/Edit/Remove item in list
- Filter item by item state (Done or To do)
- Draggable item inside list

Requirement:

- react-native: 0.68.2
- node: 16.15.0

Installation:

- Clone the project
- Open the terminal and "cd" into project directory
- Run "yarn" inside terminal

For IOS:

- cd ios
- and run "pod install"
- run "react-native run-ios"

For android:

- run "react-native start" inside terminal
- open another tab inside terminal and run "react-native run-android"
