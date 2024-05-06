import { ApiError } from './types/ApiError'

// export const getError = (error: ApiError) => {
//   return error.response && error.response.data.message
//     ? error.response.data.message
//     : error.message
// }
export const getError = (error: Error | ApiError) => {
  if (
    'response' in error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message
  } else {
    return error.message
  }
}
