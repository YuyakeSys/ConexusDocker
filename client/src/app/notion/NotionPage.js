"use client";

import { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const transformNotionData = (rawData) => {
  const blockMap = {};

  for (const blockId in rawData) {
    const block = rawData[blockId].value;
    blockMap[blockId] = block;
  }

  return blockMap;
};

const NotionPage = ({ pageId }) => {
  const [notionPageData, setNotionPageData] = useState(null);

  useEffect(() => {
    const fetchNotionPage = async () => {
      const response = await fetch(
        `https://notion-api.splitbee.io/v1/page/${pageId}`
      );
      const data = await response.json();
      const transformedData = transformNotionData(data);
      setNotionPageData(transformedData);
    };
    fetchNotionPage();
  }, [pageId]);

  if (!notionPageData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 768 }}>
      <NotionRenderer blockMap={notionPageData} fullPage={true} />
    </div>
  );
};

export default NotionPage;
