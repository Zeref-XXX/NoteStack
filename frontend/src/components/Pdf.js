import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.SUPAURL;

const supabaseKey = process.env.SUPAKEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const PDFUploader = (file) => {
  const [publicUrl, setPublicUrl] = useState('');


  const handleUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    const filePath = `pdfs/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('pdf') //bucket name
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase
      .storage
      .from('pdf') // Same bucket name here
      .getPublicUrl(filePath);

    setPublicUrl(urlData.publicUrl);
  };

  handleUpload(file)
  return (
    <div className="pdf-uploader" style={{ maxWidth: 500, margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}>

      {publicUrl && (
        <div>
          <p>Uploaded Successfully!</p>
          <a href={publicUrl} target="_blank" rel="noopener noreferrer">{publicUrl}</a>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
