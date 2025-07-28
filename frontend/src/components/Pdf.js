// Make sure to install supabase-js first:
// npm install @supabase/supabase-js

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abkmbjrjfhaxncsfchcn.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFia21ianJqZmhheG5jc2ZjaGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExODc5NzQsImV4cCI6MjA2Njc2Mzk3NH0.e7GP5hsmhWvY3ybkMg57sUZ64oZRtR6EZNI5jXBtdYQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const PDFUploader = (file) => {
  // const [file, setFile] = useState(null);
  const [publicUrl, setPublicUrl] = useState('');
  // const [uploading, setUploading] = useState(false);
  // const [error, setError] = useState('');

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   setError('');
  //   setPublicUrl('');
  // };

  const handleUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    // setUploading(true);
    const filePath = `pdfs/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('pdf') // Replace with your bucket name
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
    // setUploading(false);
  };

  handleUpload(file)
  return (
    <div className="pdf-uploader" style={{ maxWidth: 500, margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}>
    //   <h2>Upload a PDF</h2>
    //   <input type="file" accept="application/pdf" onChange={handleFileChange} />
    //   <br /><br />
    //   <button onClick={handleUpload} disabled={uploading}>
    //     {uploading ? 'Uploading...' : 'Upload'}
    //   </button>
    //   <br /><br />
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
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
