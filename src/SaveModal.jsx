import { useState } from 'react';
import './Library.css';

function SaveModal({ defaultName, onSave, onCancel }) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="save-modal-overlay" onClick={onCancel}>
      <div className="save-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="save-modal__title">Save Campaign to Library</h3>
        <input
          type="text"
          className="save-modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Campaign name..."
          autoFocus
        />
        <div className="save-modal__actions">
          <button className="save-modal__btn save-modal__btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="save-modal__btn save-modal__btn--save"
            onClick={() => onSave(name)}
            disabled={!name.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
