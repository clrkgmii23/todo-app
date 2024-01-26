export default function Note({
  content,
  onDelete,
  onDone,
  completed,
  include,
  id,
  dateCreated,
}) {
  //the date the note was made in
  const date = new Date(dateCreated);
  // get year month day etc:
  const [d, m, y] = date.toLocaleDateString().split("/");
  const h = date.getHours();
  const min = date.getMinutes();
  const formatedDate = `${d}/${m}/${y} ${h}:${min}`;
  //add a class if the content of the note includes the 'include' input
  if (include.length != 0) {
    content = content.split(include).map((value, index, arr) => {
      if (index == arr.length - 1) {
        return value;
      }
      return (
        <span key={index} className="note-content">
          <span>{value}</span>
          <span className="found">{include}</span>
        </span>
      );
    });
  }
  return (
    <div className={completed ? "note done" : "note"}>
      <div className="date-created">{formatedDate}</div>
      <div className="content">{content}</div>
      <div className="buttons">
        <button
          onClick={() => {
            onDone(id);
          }}
          className="btn done"
        >
          {completed ? "unDone" : "Done"}
        </button>
        <button
          onClick={() => {
            onDelete(id);
          }}
          className="btn delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
