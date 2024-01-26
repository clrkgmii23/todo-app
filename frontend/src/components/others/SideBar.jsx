export default function SideBar({
  setMode,
  setInclude,
  setExclude,
  include,
  exclude,
  setVisible,
  visible,
}) {
  const handleChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <div className="side-bar">
      <div className="option">
        <div className="lab">ALL</div>
        <input
          type="radio"
          className="radio"
          name="toggle"
          value="all"
          onChange={handleChange}
          defaultChecked
        />
      </div>
      <div className="option">
        <div className="lab">NOT COMPLETED</div>
        <input
          type="radio"
          className="radio"
          name="toggle"
          value="not completed"
          onChange={handleChange}
        />
      </div>
      <div className="option">
        <div className="lab">ONLY COMPLETED</div>
        <input
          type="radio"
          className="radio"
          name="toggle"
          value="only completed"
          onChange={handleChange}
        />
      </div>
      <div className="option fle">
        <label htmlFor="text" className="lab">
          SEARCH
        </label>
        <input
          type="text"
          className="search-input"
          value={include}
          onChange={(e) => {
            setInclude(e.target.value);
          }}
        />
      </div>
      <div className="option fle">
        <label htmlFor="text" className="lab">
          EXCLUDE
        </label>
        <input
          type="text"
          className="search-input"
          value={exclude}
          onChange={(e) => {
            setExclude(e.target.value);
          }}
        />
      </div>
      <div className="new-note">
        <div
          className="plus"
          onClick={(e) => {
            setVisible(!visible);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}
