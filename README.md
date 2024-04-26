# comp413FrontEnd
This is the DermoScan frontend. 
We use react native to build an AR guided TBP(total body picture) capturing mobile app on IOS platform.

Pages and corresponding info:

LoginPage
This is the page where all users log in their account. Patients will have their account starts with P and doctors will have their account starts with D.

RegistrationPage
This is the Registration Page where new users can register a new account.

TBPPage
This is the page to browse all TBP pictures. Users can choose the date and side of the picture and view their TBP.

CameraPage
This is the camera page where doctors or nurses can choose the side of pictures they want to take and will direct to the website with our AR guided camera to take TBP.

DocMailPage
This is the page where doctors can send the announcement of transfering patients to another doctor.

PatientMainPage
This page is the mail page for patients where they can see the announcement of transfer doctors. Patients will have the option to decide accept or reject the transfer request.

ProfilePage
This is the profile page that displays the user User profile, showing their ID, hospital, doctor, name, age, and sex. User can also update their password in this page.

Process to start frontend
1. install XCode
2. Clone the repository
3. go to AwesomeProject directory
4. install all the corresponding package using "npm install"
5. type “npx expo start” to start the iphone simulator
6. press i to start IOS platform
