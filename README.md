# WDI-Project-2
# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Approval From Squad Lead
|---|---| ---|
|Day 1: Wed| Game Idea| Yes
|Day 2: Thur| Wireframes and Priority Matrix| Yes
|Day 3: Fri| Pseudocode\actual code| Yes
|Day 4: Sat| Basic Clickable Model | Yes
|Day 5: Sun| Working Prototype | Yes
|Day 6: Mon| Game Completed / Slides | Yes
|Day 7: Tue| Project Presentations | Yes

## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality.

My final project is a fully working CRUD app making use of the Spotify API to obtain Artist/Album/Track info as well as User information. The user is able to create Playlists that are displayed on the app and existing in Spotify. From there the user has capabilities of editing the Playlist info and adding/removing tracks to specific playlists. Once tracks are selected, the user is able to play their music straight from the app.

https://docs.google.com/presentation/d/1vJ-nl0rbBBLNhqT537rAcNjzv9q0_fL0BJYy59vw3_o/edit?usp=sharing

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

http://res.cloudinary.com/camcash17/image/upload/v1515476008/p2_wireframe_kreiss.jpg

## MVP

Include the full list of features that will be part of your MVP

-The user will create a playlist and perform full CRUD capabilities on the playlist name.

-The user will be able to search any music artist, view their albums and tracks and add any track to whichever playlist they choose.

-The user will be able to perform full CRUD capabilities on selected tracks chosen using Spotify API.

-The user will be able to play music from their playlist using Spotify web player.


## POST MVP

Include the full list of features that you are considering for POST MVP

POST MVP features are laid out to essentially make the game as realistic as possible:

-The user will be able to actually create a playlist in spotfity and add/remove tracks from a real playlist.

-The playlist will render using a spotify widget and play continuously on the page.

-Animations will be included to make the app better designed for UX.

-User Authentication.


## Wireframes

Include images of your wireframes.

http://res.cloudinary.com/camcash17/image/upload/v1515476008/p2_wireframe_kreiss.jpg


## App Components

### Creating Items

### Deleting Items

### Editing Items

### Getting Items

## Functional Components

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method.

playlists.findAll().then(playlists => { res.render('tracks/playlist', { playlists: playlists })
    -List all of the playlists and display them on the main page

axios.get(`https://api.spotify.com/v1/albums/${req.body.album}/tracks?&limit=30`)
    -Use the Spotify API to request the tracks from the selected album name.

<% playlists.forEach(playlists => { %>
  <%= playlists.title %>
    -Loop through existing playlist names and display them.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| CRUD APP | H | 4hrs| 4hrs | 4hrs |
| API | H | 2hrs| 3hrs | 3hrs |
| DB SETUP | H | 3hrs| 4hrs | 4hrs |
| CSS | M | 4hrs| 5hrs | 3hrs |
| USER AUTH | L | 2hrs| 2hrs | 2hrs |

## Helper Functions
Helper functions should be generic enough that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description |
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string |
| playlists.findById(req.params.id) | This will search the specific playlist ID and allow the embedded javscript to render any given playlist |
| "<%= tracks.playlist_id == playlists.playlist_id %>" | Used in an if function in EJS to determine if the playlist ID# was equal to the playlist ID# associated with the Track. |


## Additional Libraries
 Use this section to list all supporting libraries and their role in the project.
 JQuery, Bootstrap,
 Passport-Spotify/Scroll Animation Github reference:
 https://github.com/jmperez/passport-spotify
 https://github.com/thelinmichael/spotify-web-api-node
 https://github.com/Alex-Ginsberg/Spot-Me/blob/master/server/users.js
 https://github.com/jlmakes/scrollreveal


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  

<script src="https://unpkg.com/scrollreveal/dist/scrollreveal.min.js"></script>
<script>window.sr = ScrollReveal({ reset: true });</script>
<script>sr.reveal('.camsjamz', { duration: 3000 });</script>

The use of this code allowed me to add a cool scroll feature where the divs would appear upon scrolling.

## jQuery Discoveries
 Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

 $(window).scroll(function() {
   if($(this).scrollTop() > 0)  /*height in pixels when the navbar becomes non opaque*/
   {
       $('.opaque-navbar').removeClass('opaque');
   } else {
       $('.opaque-navbar').addClass('opaque');
   }
 });

This jQuery discovery allowed my navbar to turn fully opaque once the user starts to scroll the page.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.
 -I changed my background many times and different clicking functions to make for better UX.
 -I decided to display all of the artist's album art instead of displaying the names of the albums for a better look.
 -I had the user search for an artists name and spotify ID# all in one form because it is better to consolidate.
 -I decided not to let the user update track information, instead they will be able to updated the playlist information.


## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier

**RESOLUTION**: Missing comma after first object in sources {} object


**ERROR**: music-controller.js:52 'PlaylistsFindAll' is not a function

**RESOLUTION**: The function needed to be defined outside of the .then statement.


**ERROR**: playlist.ejs:27 'Playlist' is not defined

**RESOLUTION**: I needed to added the PlaylistsFindById to the get function in my controller file.


**ERROR**: Added bootstrap and most of my styles had changed.

**RESOLUTION**: I needed to place the normal link to my style sheet beneath the link to bootstrap to override style changes.
