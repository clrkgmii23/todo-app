export default function NewNotePopUp({
  visible,
  setVisible,
  setDefaultNotes,
  user,
}) {
  const url = import.meta.env.VITE_API_URL;
  return (
    <div
      className={
        visible ? "new-note-pop-up visible" : "new-note-pop-up not-visible"
      }
    >
      <div
        className="new-note-flex"
        onClick={(e) => {
          if (e.target === e.currentTarget) setVisible(false);
        }}
      >
        <form
          className="new-note-form"
          onSubmit={async (e) => {
            e.preventDefault();
            //make post request to add note
            const formData = new FormData(e.target);
            let jsonData = {};
            formData.forEach((value, key) => {
              jsonData[key] = value;
            });

            const response = await fetch(url + "/notes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...jsonData, id: user.id }),
            });
            const jsonResponse = await response.json();
            setDefaultNotes((prevValue) => {
              return [...prevValue, jsonResponse.data.newNote];
            });
            e.target.reset();
            setVisible(false);
          }}
        >
          <div className="new-note-text">NEW NOTE</div>
          <input className="new-note-content" type="text" name="content" />
          <button className="btn sumbit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
