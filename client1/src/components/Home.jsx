import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Add this import for CSS
import Navbar from './Navbar.jsx'; 

export default function Home() {
  const { user } = useContext(AuthContext);
  const [noteText, setNoteText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTextSubmit = async () => {
    if (!noteText.trim()) {
      alert('Please enter some text');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/notes/text', { text: noteText });
      const summary = res.data.summary || res.data.text;
      if (!summary) throw new Error("No summary found");
      navigate('/summary', { state: { summary } });
    } catch (err) {
      console.error("Summarizing failed:", err);
      alert('Error summarizing note');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('note', file);

    try {
      setLoading(true);
      const res = await axios.post('/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const summary = res.data.summary || res.data.text;
      if (!summary) throw new Error("No summary found");
      navigate('/summary', { state: { summary } });
    } catch (err) {
      console.error("File upload failed:", err);
      alert('File upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="home-container">
      <div className="home-card">
        <h1 className="welcome-heading">Welcome, {user?.name || user?.email || 'User'}!</h1>
        {/* <p className="subtext">This page is personalized for you.</p> */}

        <h3 className="section-title">Paste Your Notes</h3>
        <textarea
          rows={8}
          className="note-textarea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Paste or write your notes here..."
        />
        <button onClick={handleTextSubmit} className="submit-button" disabled={loading}>
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>

        <h3 className="section-title">Or Upload a File</h3>
        <input
          type="file"
          className="file-input"
          accept=".txt,.docx,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFileSubmit} className="submit-button" disabled={loading}>
          {loading ? "Uploading..." : "Upload & Summarize"}
        </button>
      </div>
    </div>
    </>
  );
}
