# Google Sheet

This guide walks you through setting up this repo.
To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aimun-naharr/google-sheet.git;
   cd google-sheet
   ```
2. Install the packages:
   `npm i`
3. Run the local server:
   `npm run dev`

# Guide: Create OAuth Client ID for Google Sheets API

Follow these steps to create an OAuth Client ID for accessing the Google Sheets API to create, read, update, and delete data.

---

# Guide: Create OAuth Client ID for Google Sheets API

Follow these steps to create an OAuth Client ID for accessing the Google Sheets API to create, read, update, and delete data.

---

## **Step 1: Set Up a Google Cloud Project**

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Sign in with your Google account if prompted.
3. Click on the **"Select a Project"** dropdown at the top.
4. Select an existing project or click **"New Project"**:
   - Enter a project name.
   - Select a location (optional).
   - Click **"Create"**.

---

## **Step 2: Enable the Google Sheets API**

1. Navigate to **"API & Services"** from the left-hand menu.
2. Click **"Library"**.
3. Search for **"Google Sheets API"** in the search bar.
4. Select the API and click **"Enable"**.

---

## **Step 3: Set Up OAuth Consent Screen**

1. Go to the **"OAuth consent screen"** tab under **"APIs & Services"**.
2. Choose **"External"** and click **"Create"** (use "External" ).
3. Fill in the required details:
   - **App Name**: Enter a name for your app (e.g., _My Sheets App_).
   - **User Support Email**: Provide a valid email address.
   - **Developer Contact Information**: Enter an email address for communication.
4. Click **"Save and Continue"** (you can skip optional fields for now).
5. Skip the **Scopes** and **Test Users** sections by clicking **"Save and Continue"** until you finish.

---

## **Step 4: Create OAuth Client ID**

1. Navigate to **"Credentials"** under the **"APIs & Services"** section.
2. Click **"Create Credentials"** and select **"OAuth Client ID"**.
3. Select **"Web application"** as the application type.
4. Provide a **Name** for the client (e.g., _Sheets API Client_).
5. Add your **Authorized Redirect URIs**:
   - Enter your app's URL where Google redirects after authentication.
   - For development, you can use `http://localhost:5173` (adjust the port if needed).
6. Click **"Create"**.

---

## **Step 5: Download Client Credentials**

1. After creating the OAuth Client ID, a dialog will display your **Client ID** and **Client Secret**.
2. Copy the **Client Id** and paste it in the app to login.

---

## **Step 6: Integrate the Credentials in Your App**

1. Place the downloaded JSON file in your app's working directory.
2. Use the file to authenticate with the Google Sheets API. For example:
   - In Node.js, use libraries like `google-auth-library` or `googleapis`.
   - Specify the required API scopes for accessing Google Sheets:
     ```plaintext
     https://www.googleapis.com/auth/spreadsheets
     ```

---

## **Step 7: Test Your Application**

1. Run your app and use the OAuth flow to authenticate with your Google account.
2. Once authenticated, your app will receive an access token to interact with Google Sheets.
3. Use the Google Sheets API to perform operations like creating, reading, updating, and deleting data.

---

## **Additional Resources**

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google API Client Libraries](https://developers.google.com/api-client-library)

---

With these steps, your app is ready to interact with Google Sheets using OAuth authentication.

## How to use this app:

1. Obtain the client ID from the Google Cloud Console.
2. Paste the client ID and log in using your Google account.
3. Once logged in, you can use the app to create, read, update, and delete data in your Google Sheets.
