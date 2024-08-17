import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { FaDownload } from 'react-icons/fa';
import "./App.css";

const fonts = ["Open Sans", "Roboto", "Poppins", "Dancing Script", "Libre Baskerville"];

function App() {
  const [color, setColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [textSizeInput, setTextSizeInput] = useState(`${14}px`);
  const [textSize, setTextSize] = useState(`${14}px`);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [textareaValue, setTextareaValue] = useState('');

  const printRef = useRef(null);



  const handleDownload = () => {
    const doc = new jsPDF();
    const content = textareaValue.trim();

    if (!content) {
      alert('No content to download');
      return;
    }

    // Get textarea background color
    const textarea = document.querySelector('.textarea');
    const backgroundColor = window.getComputedStyle(textarea).backgroundColor;
    const textclor = window.getComputedStyle(textarea).color;

    // Set PDF background color
    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setTextColor(textclor); // Set text color to black
    doc.text(content, 10, 10);

    doc.save('Rohit Mishra.pdf');
  };

  function handleChangeColor(e) {
    setColor(e.target.value);
  }

  function handleTextColor(e) {
    setTextColor(e.target.value);
  }

  function handleTextSizeChange(e) {
    setTextSizeInput(e.target.value);
  }

  const debouncedTextSizeUpdate = () => {
    setTextSize(textSizeInput + "px"); // Ensure "px" unit
  };

  useEffect(() => {
    const timer = setTimeout(debouncedTextSizeUpdate, 500);
    return () => clearTimeout(timer);
  }, [textSizeInput]);

  function handleFontChange(e) {
    setSelectedFont(e.target.value);
  }

  return (
    <div className="mainContainer">
      <div className="navBar">
        <span className="fileOption" style={{color: "white"}} onClick={handleDownload}>
          <FaDownload />
        </span>

        <span className="bgColor">
          <input type="color" onChange={handleChangeColor} />
        </span>

        <span className="textColor">
          <span>
            <input type="color" onChange={handleTextColor} />
          </span>
          <span style={{ color: textColor }}> T </span>
        </span>

        <div className="div">
          <span className="textOption">
            <select value={selectedFont} onChange={handleFontChange}>
              {fonts.map((font, index) => (
                <option key={index} value={font}>{font}</option>
              ))}
            </select>
          </span>
          <span className="textSize">
            <input
              type="number"
              placeholder="Size"
              value={textSizeInput} // Display current input value
              onChange={handleTextSizeChange}
            />
          </span>
        
        </div>
        <h3 style={{backgroundColor:"white", height:"5vh", marginLeft:"15%", marginTop:"1.3%", width:"10vw", textAlign:"center", borderRadius:"18px 0px 18px 0px", fontFamily: selectedFont}}>Note Pad</h3>
      </div>

      <div className="texside">
        <textarea
          className="textarea"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          style={{
            backgroundColor: color,
            color: textColor,
            fontSize: textSize,
            fontFamily: selectedFont,
          }}
        />
      </div>
    </div>
  );
}

export default App;
