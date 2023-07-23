import "./App.css";
import NoteList from "./components/NoteList";
import Bar from "./components/Bar";
import NoteEditor from "./components/NoteEditor";
import TagFilter from "./components/TagFilter";
import { useEffect } from "react";
import { getNotesFromIndexedDB } from "./utils/indexedDB";
import { useDispatch } from "react-redux";
import { Note, setInitialNotes } from "./redux/slices/noteListSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesFromIndexedDB = await getNotesFromIndexedDB();
        dispatch(setInitialNotes(notesFromIndexedDB));
      } catch (error) {
        console.error("Error fetching notes from IndexedDB:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="App">
      <Bar />
      <NoteList />
      <NoteEditor />
      <TagFilter />
    </div>
  );
};

export default App;