// baseAxios.js
import axios from "axios";
const SHEET_ID = '1rWSZDHbINnCV0rS6G5aAbMnPLHd0_HoN9rIsYh33MCQ';
export const API_BASE = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
// Create an axios instance
const baseAxios = axios.create( {
  baseURL: API_BASE, // Replace with your API's base URL
  timeout: 10000, // Set a timeout (optional)
} );

// Request interceptor
baseAxios.interceptors.request.use(
  ( config ) => {
    // Add authorization headers or other custom headers here
    const token = localStorage.getItem( "token" ); // Adjust as per your token storage
    if ( token ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  ( error ) => {
    // Handle request errors here
    console.error( "Request error:", error );
    return Promise.reject( error );
  }
);

// Response interceptor
baseAxios.interceptors.response.use(
  ( response ) => {
    // Modify response if needed
    return response;
  },
  ( error ) => {
    // Graceful error handling
    if ( error.response ) {
      // Server responded with a status code outside the 2xx range
      const { status, data } = error.response;
      console.error( `Error ${status}:`, data.message || data );

      // Custom error handling based on status codes
      switch ( status ) {
        case 401:
          // Handle unauthorized errors (e.g., token expiry)
          alert( "Session expired. Please log in again." );
          localStorage.removeItem( "token" ); // Clear token or session
          window.location.href = "/"; // Redirect to login page
          break;
        case 403:
          alert( "You don't have permission to perform this action." );
          break;
        case 404:
          alert( "Resource not found." );
          break;
        case 500:
          alert( "Server error. Please try again later." );
          break;
        default:
          alert( data.message || "An error occurred. Please try again." );
      }
    } else if ( error.request ) {
      // No response from server
      console.error( "No response received:", error.request );
      alert( "Network error. Please check your internet connection." );
    } else {
      // Other errors
      console.error( "Error:", error.message );
    }
    return Promise.reject( error );
  }
);

export default baseAxios;
