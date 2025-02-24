import React, { useEffect, useState } from 'react';
import '../index.css';
import Markdown from 'react-markdown';

type Props = {
  counter: number;
  content: string;
  onDelete: () => void;
  onUpdate: (newContent: string) => void;
};

const Markblock: React.FC<Props> = ({ content, onDelete, onUpdate }) => {
  const [editableContent, setEditableContent] = useState(content);
  const [editing, setEditing] = useState(false);
  const [tempContent, setTempContent] = useState(content);

  // Sync component state with props when the content changes
  useEffect(() => {
    setEditableContent(content);
    setTempContent(content);
  }, [content]);

  const handleEdit = () => {
    setTempContent(editableContent);
    setEditing(true);
  };

  const handleSave = () => {
    setEditableContent(tempContent); // Update displayed content
    setEditing(false); // Exit editing mode
    onUpdate(tempContent); // Notify parent of content change
  };

  const handleCancel = () => {
    setTempContent(editableContent); // Revert temporary content
    setEditing(false); // Exit editing mode
  };

  const lineCount = tempContent.split("\n").length;
  
  const renderMarkdown = (content: string) => {
    return content.replace(/\n/g, '  \n'); // Markdown recognizes "  \n" as a line break
  };
  return (
    <div className="block">
      <div className="block-buttons">
        {editing ? (
          <>
            <button onClick={handleSave} >
              Save
            </button>
            <button onClick={handleCancel} >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEdit} >
            Edit
          </button>
        )}
        <button onClick={onDelete} >
          Delete
        </button>
      </div>
      <div className="block-content">
        {editing ? (
          <textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            rows={Math.max(4, lineCount)}
            title="block-edit_field"
          />
        ) : (
          <Markdown>{renderMarkdown(editableContent)}</Markdown>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Markblock;
