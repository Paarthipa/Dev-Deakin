import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";
import ReactMarkdown from "react-markdown";
import "../styles/PostEditor.css";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("// your code here");
  const [markdownText, setMarkdownText] = useState("## Preview\nWrite *markdown* here.");

  const savePost = async () => {
    const payload = { title, code, markdown: markdownText, createdAt: Date.now() };
    const res = await fetch("/.netlify/functions/save-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    alert(data.ok ? "Post saved!" : "Error saving post");
  };

  return (
    <div className="post-editor">
      <h1>New Post</h1>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />

      <div className="editor-grid">
        <div>
          <h3>Code</h3>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[javascript(), css()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        <div>
          <h3>Markdown</h3>
          <textarea
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            rows={12}
          />
          <h3 style={{ marginTop: 16 }}>Live Preview</h3>
          <div className="markdown-preview">
            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </div>
        </div>
      </div>

      <button onClick={savePost}>Save Post</button>
    </div>
  );
}
