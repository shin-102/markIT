import React, { useEffect, useState } from 'react';
import '../index.css';

type Props = {
  counter: number;
  content: string;
  onDelete: () => void;
  onUpdate: (newContent: string) => void;
};

const Markblock: React.FC<Props> = ({ counter, content, onDelete, onUpdate }) => {
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

  return (
    <div>
      <div className="block">
        <div className="block-title">
          <h2>Block {counter}</h2>
          <div className="block-buttons">
            {editing ? (
              <>
                <button onClick={handleSave} className="mode-switch">
                  Save
                </button>
                <button onClick={handleCancel} className="mode-switch">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="mode-switch">
                Edit
              </button>
            )}
            <button onClick={onDelete} className="mode-switch">
              Delete
            </button>
          </div>
        </div>
        <div className="block-content">
          {editing ? (
            <textarea
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              rows={4}
              title="block-edit_field"
            />
          ) : (
            <p>{editableContent}</p>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Markblock;
