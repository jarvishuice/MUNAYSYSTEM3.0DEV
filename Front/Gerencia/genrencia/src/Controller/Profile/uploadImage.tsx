import { Button } from '@mui/joy';
import React, { useState } from 'react';

interface UploadImageProps {
    idUser: number;
  }
  const UploadImage: React.FC<UploadImageProps> = ({ idUser }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`http://191.97.17.26:8011/MUNAY/nest/User/upImageProfile/${idUser}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Guardar</Button>
    </div>
  );
};

export default UploadImage;
