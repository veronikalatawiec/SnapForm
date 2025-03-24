import jwt_decode from 'jwt-decode';

//get user id
export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return null;
  }
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken.id;
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
}
