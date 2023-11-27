import axios from "axios";
import { useEffect, useState } from "react";

const Library = () => {
  const [library, setLibrary] = useState([]);

  const getLibrary = async () => {
    try {
      const response = await axios.get("api/library");
      setLibrary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLibrary();
  }, []);
  return (
    <div className="w-5/6 mx-auto flex flex-col gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
      <div id="list" className="w-full">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="p-1 w-full"
        />
      </div>
      <div
        id="gallery"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-l border-white/40 gap-2 pl-2"
      >
        {library.length !== 0 ? (
          library.map((game) => (
            <div key={game.id} className="flex flex-col items-center mb-2">
              <img
                src={game.background_image}
                alt="games"
                className="w-full h-auto rounded shadow-xl border border-white/40 mb-2"
                style={{ height: "100%", width: "100%" }}
              />
              <p className="text-slate-200 font-bold text-sm">{game.name}</p>
            </div>
          ))
        ) : (
          <p className="text-white font-bold">Loading images</p>
        )}
      </div>
    </div>
  );
};

export default Library;
