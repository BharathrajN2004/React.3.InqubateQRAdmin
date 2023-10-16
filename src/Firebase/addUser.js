import { setDoc, doc } from 'firebase/firestore';
import { firestore } from './config';

const addUser = async (email, name, password) => {
  const userData = {
    email: email,
    name: name,
    password: password
  };

  try {
    const userRef = doc(firestore, 'users', email);
    await setDoc(userRef, userData);
    console.log('User added successfully.');
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

export {addUser};

// Example usage
const email = 'example@example.com';
const name = 'John Doe';
const password = 'password123';
