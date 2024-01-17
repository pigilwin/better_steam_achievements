# Better Steam Achievements

## How the application should work
 - Load the application and initialise the state.
 - Check if the `cookie` exists for the selected profile.
 - - If the cookie exists then load the profile based on the cookie if the cookie is a valid profile.
 - - If no cookie has been found and profiles exist the show the profile selection screen
 - - If no profiles exist then show the page to create a new profile with a small blurb explaining how the application works.
 - Once a profile has been loaded
 