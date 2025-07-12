import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Summary.css';
import Navbar from './Navbar';
import { jsPDF } from  'jspdf';


export default function Summary() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const summary = location.state?.summary || "No summary available.";

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(summary || '', 180); // wrap text to fit width
    doc.text(lines, 10, 10);
    doc.save('summary.pdf');
  };


  return (
    <>
    <Navbar />
    <div className="summary-background">
      <div className="summary-card">
        <h2 className="summary-title">Summarized Notes</h2>
        <textarea
          className="summary-text"
          readOnly
          value={summary}
        />
        <button className="summary-button" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Summary"}
        </button>
        <button className='dowload-btn' onClick={downloadPDF}>Download as PDF</button>
      </div>
    </div>
    </>
  );
}
