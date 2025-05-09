export function parseApiError(error: any): { [key: string]: string } {
  if (error.response?.data?.errors) {
    // Laravel validation errors
    return error.response.data.errors;
  }
  if (error.response?.data?.message) {
    return { general: error.response.data.message };
  }
  return { general: 'An unexpected error occurred.' };
}
