import { storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToFirebase = async (file, prefix='') => {
  console.log('Uploading file...');

  if (!file){ 
    console.error('No file selected'); 
    return null;
  }

  const randomName = prefix + uuidv4();

  const storageRef = ref(storage, `images/${randomName}`);
  console.log('Uploading file to', storageRef.fullPath);

  try {
    await uploadBytes(storageRef, file);

    console.log('Getting download URL...');
    const downloadURL = await getDownloadURL(storageRef);

    console.log('Download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};