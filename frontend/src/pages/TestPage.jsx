import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadFileToFirebase } from '../utils/uploadFileToFirebase';

function MyComponent() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const downloadUrl = await uploadFileToFirebase(file);
    console.log('Download URL:', downloadUrl);
    setImageUrl(downloadUrl);
  };

  return (
    <div className='flex flex-col items-center'>
   
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" onChange={handleFileChange}/>
      </div>


        {/* Upload Button */}
        <button
          onClick={uploadFile}
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        >
          Upload
        </button>

      {/* Display Uploaded Image */}
      {imageUrl && (
        <div className='mt-4'>
          <img src={imageUrl} alt="Uploaded" className='h-48 w-48 object-cover' />
        </div>
      )}
    </div>
  );
}

export default MyComponent;
