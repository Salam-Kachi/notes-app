import { useState } from "react";
import "./App.css";
import Preview from "./components/Preview";
import Message from "./components/Message";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  // اضافة عنوان الملاحظة
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  // اضافة نص الملاحظة
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };

  // حفظ الملاحظة
  const saveNoteHandler = () => {
    const note = {
      id: new Date(),
      title: title,
      content: content,
    };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setTitle("");
    setContent("");
  };

  const getAddNote = () => {
    return (
      <div>
        <h2>إضافة ملاحظة جديدة</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="العنوان"
            value={title}
            onChange={changeTitleHandler}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="النص"
            value={content}
            onChange={changeContentHandler}
          />

          <a href="#" className="button green" onClick={saveNoteHandler}>
            حفظ
          </a>
        </div>
      </div>
    );
  };

  const getPreview = () => {
    if (notes.length === 0) {
      return <Message title="لا يوجد ملاحظة" />;
    }
    if (!selectedNote) {
      return <Message title="يرجى اختيار ملاحظة لعرضها" />;
    }

    const note = notes.find((note) => note.id === selectedNote);

    return (
      <div>
        <div className="note-operations">
          <a href="#">
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#">
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      </div>
    );
  };

  const addNoteHandler = () => {
    setCreating(true);
  };
  return (
    <div className="App">
      <div className="notes-section">
        <ul className="notes-list">
          <li className="note-item">ملاحظة رقم #1</li>
          <li className="note-item">ملاحظة رقم #2</li>
          <li className="note-item">ملاحظة رقم #3</li>
          <li className="note-item">ملاحظة رقم #4</li>
        </ul>
        <button className="add-btn" onClick={addNoteHandler}>
          +
        </button>
      </div>
      <Preview>{creating ? getAddNote() : getPreview()}</Preview>
    </div>
  );
}

export default App;
