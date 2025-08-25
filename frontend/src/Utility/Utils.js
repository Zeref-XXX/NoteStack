import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const BucketName = 'pdf';
 
const supabaseUrl =process.env.SUPAURL; 
const supabaseKey=process.env.SUPAKEY;

 

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