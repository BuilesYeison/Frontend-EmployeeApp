# UiEmployeeapp

This project is the fronted for the backend project created in django

## Steps:
1. Create the angular project with routes
2. Add bootstrap
3. Create the components, navigation  and routes to these new components

### To connect with backend
1. Got o environment.ts
2. Add the follow props into environment constant list:
  * `API-URL: "http://127.0.0.1:8000/"` put the link to backend server
  * `PHOTO_URL:"http://127.0.0.1:8000/Photos/"` put the link where the media is saved
3. Import http modules and consume rest api in components
