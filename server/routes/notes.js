
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { summarizeText } = require('../controllers/notesController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/text', async (req, res) => {
  try {
    const summary = await summarizeText(req.body);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

router.post('/upload',upload.single('note'),async(req,res)=>{
 try {
   const buffer=req.file.buffer
   const mimetype=req.file.mimetype
   let text=''
  
   if(mimetype==='text/plain'){
     text=buffer.toString('utf-8')
   }
   else if(mimetype==='application/pdf'){
    const data=await pdfParse(buffer)
    text=data.text
   }else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ){
     const result=await mammoth.extractRawText({buffer})
     text=result.value
   }else{
    return res.status(400).json({error:'unsupported file type'})
   }
 
   const summary=await summarizeText(text)
   res.json({summary})
 } catch (error) {
  console.error('upload summarisation error',error);
  return res.status(500).json({error:"failed to summarise uploaded file"})
  
 }

})




module.exports = router;
