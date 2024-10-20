import { Dropzone } from "./components/Dropzone";
import { useTaskList } from "./providers/TaskContext";
import { FileList } from "./components/FileList";
import { loadFfmpeg } from "./lib/utils";

const ffmpeg = await loadFfmpeg();

function App() {
  const { taskList } = useTaskList();

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="p-2 text-3xl">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>

      {/* Dropzone */}
      <Dropzone />
      <FileList files={taskList} converter={ffmpeg} />
    </div>
  );
}

export default App;
