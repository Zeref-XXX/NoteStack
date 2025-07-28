import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const BucketName = 'pdf';

const supabaseUrl = 'https://abkmbjrjfhaxncsfchcn.supabase.co'; //add key and url the run 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFia21ianJqZmhheG5jc2ZjaGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExODc5NzQsImV4cCI6MjA2Njc2Mzk3NH0.e7GP5hsmhWvY3ybkMg57sUZ64oZRtR6EZNI5jXBtdYQ';

 

const supabase = createClient(supabaseUrl, supabaseKey);
const PDFUploader = async (file) => {
    // const [publicUrl, setPublicUrl] = useState('');

        const filePath = `pdfs/${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from(`${BucketName}`) // Replace with your bucket name
            .upload(filePath, file, {
                contentType: 'application/pdf',
                upsert: true,
            });

        if (uploadError) {
            console.log(uploadError); 
            return;
        }

        const { data: urlData } = supabase
            .storage
            .from(`${BucketName}`) // Same bucket name here
            .getPublicUrl(filePath);

        // setPublicUrl(urlData.publicUrl);
        // setUploading(false);

        // return  publicUrl;
        return urlData.publicUrl;
    };
// handleUpload(file)


// module.exports = PDFUploader;
export default PDFUploader;