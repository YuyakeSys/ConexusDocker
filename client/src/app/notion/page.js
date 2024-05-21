"use client";
import { useState, useEffect } from "react";

// CSS imports for react-notion
import "react-notion/src/styles.css"; // Core styles for react-notion
import "prismjs/themes/prism-tomorrow.css"; // Syntax highlighting for code blocks

import { NotionRenderer } from "react-notion"; // Import the NotionRenderer component

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://notion-api.splitbee.io/v1/page/calendar-7addd2fb5a3d4341b841aa2098573736"
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const notionData = await response.json();
        console.log(notionData);
        setData(notionData);
      } catch (error) {
        console.error("There was an error fetching the Notion data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading Notion content...</div>;
  }

  return (
    <div className="App">
      <h1>
        How to render Notion pages in React apps | Make your site content
        dynamic
      </h1>
      <NotionRenderer blockMap={data} />
    </div>
  );
}

export default App;
