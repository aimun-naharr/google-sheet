import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn( ...inputs ) {
  return twMerge( clsx( inputs ) );
}

export const generateHeaders = ( headers ) => {
  const headersArr = headers?.map( ( header, index ) => {
    const columnLetter = String.fromCharCode( 65 + index ); // Convert index to A, B, C...
    return {
      name: `${columnLetter}1`, // Google Sheets reference (e.g., A1)
      value: header,           // The actual header name
    };
  } );
  return headersArr
};

export const generateFormattedData = ( sheetData ) => {

  const formattedData = sheetData?.map( ( row, rowIndex ) => {
    const rowNumber = rowIndex + 2; // Start from row 2, assuming row 1 is headers
    const obj = {};

    row.forEach( ( value, colIndex ) => {
      const columnLetter = String.fromCharCode( 65 + colIndex ); // Convert index to A, B, C, etc.
      const cellReference = `${columnLetter}${rowNumber}`;    // Create cell reference (e.g., A2)
      obj[cellReference] = value || null;                     // Assign value to the cell reference
    } );

    return obj;
  } );
  return formattedData
}