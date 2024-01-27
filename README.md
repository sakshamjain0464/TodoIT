# TodoIT - A Todo Application with Appwrite Integration

TodoIT is a modern todo application developed using Vite, React, Tailwind, and Appwrite. It offers a comprehensive set of features for managing tasks efficiently and securely.

## Features

### Task Management
- **Add**: Users can add new tasks with a title, description, and optional due date.
- **Edit**: Existing tasks can be edited to update their details.
- **Update**: Users can mark tasks as completed or incomplete.
- **Delete**: Tasks can be deleted individually or in bulk.
- **Filter**: Todo list can be filtered based on status (completed/incomplete) or other attributes.

### Authentication
- **Google Login and Signup**: Users can sign in or sign up using their Google accounts for quick and secure access.

### User Profile
- **Profile Page**: Each user has a dedicated profile page displaying their details and settings.
- **Profile Image and Banner Upload**: Users can upload and manage their profile picture and banner image to customize their profile.

### Email and Phone Verification
- **Email and Phone Verification**: Users can add and verify their email and phone numbers for enhanced security.

## Architecture

### Frontend
- **Vite + React**: The frontend is built using Vite, a next-generation frontend tooling framework, and React, a popular JavaScript library for building user interfaces.
- **Tailwind CSS**: The user interface is styled using Tailwind CSS, a utility-first CSS framework, for rapid development and easy customization.

### Backend
- **Appwrite**: The backend is powered by Appwrite, an open-source platform for building serverless applications. Appwrite is used for user authentication, data storage (todos), file storage (profile images and banners), and email/phone verification.

### Data Structure
- **Collections**: Appwrite's collections are used to store todos, where each todo item contains fields for title, description, due date, status, etc.
- **Buckets**: Appwrite's buckets are utilized to store profile images and banners uploaded by users, providing secure and scalable file storage.

## Deployment
- **Cloud Hosting**: The application is deployed on a cloud hosting platform (e.g., AWS, Google Cloud, etc.) for reliability and scalability.
- **CI/CD**: Continuous integration and deployment pipelines are set up to automate the deployment process, ensuring smooth updates and releases.

## Setup Guide {#setup-guide}

To set up TodoIT locally on your machine, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/todoit.git
   cd todoit
    ```
2. **Setup Appwrite Project**
- Create your Appwrite profile and a project named TodoIT.
- Set up Google Login in your project and add your own OAuth API from Google Console. Refer to - [Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in).
- Paste your Google Login api key in Appwrite Google Login Setup [A Step-by-Step Guide: Enabling Google OAuth 2.0 on Android and Appwrite By Wandell M. - Medium](https://medium.com/@wendell.malpas/a-step-by-step-guide-enabling-google-oauth-2-0-on-android-and-appwrite-1be94e7a09a3#:~:text=Appwrite%20Setup%201%20Step%201%3A%20Sign%20Up%20and,details.%202%20Step%202%3A%20Add%20a%20New%20Platform)

3. **Setup Appwrite Storage**

    Create a Todos Collection in your Appwrite Project Database and define attributes in the collection.

    | Name | Type | Significance | Required |
    |:-----|:----:|:----------:| :--------------: |
    | user | String | For storing User ID | Yes |
    | title | String | For storing Todo Title | Yes |
    | tags | String Array | For storing Tags | No |
    | completed | Boolean | For checking whether the Todo is marked completed or not | Yes |
    | description | String | For storing Todo Description | No |

4. **Set up Environment Variables**
    ```bash 
    VITE_APPWRITE_PROJECT_URL = Appwrite Project Endpoint
    VITE_APPWRITE_PROJECT_ID = Appwrite Project ID
    VITE_APPWRITE_DATABASE_ID = Appwrite Database ID
    VITE_APPWRITE_TODO_COLLECTION_ID = Appwrite Todo Collection ID
    VITE_APPWRITE_PHOTOS_BUCKET_ID = Appwrite Photos Bucket ID
    ```
5. **Install Dependencies**
    ```bash
    npm run dev
    ```

6. **Access the Application**

    Open your web browser and navigate to http://localhost:5173 to access TodoIT.


## Contributing

Contributions are welcome! If you'd like to contribute to TodoIT, please follow these guidelines:

- Fork the repository.
- Follow the Setup Guide [Setup Guide](#setup-guide)
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Push your changes to your fork.
- Submit a pull request to the main branch of the original repository.

## Credits

- Icons from Font Awesome
- Images from [Shufflit](https://sakshamjain0464.github.io/ShufflIt/)