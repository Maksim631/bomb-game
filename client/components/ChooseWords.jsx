import { useState } from "react";
import { useChooseWordsMutation, useGetGameStateQuery } from "../store/api";

export const ChooseWords = () => {
  const { data = {} } = useGetGameStateQuery();
  const [ chooseWords ] = useChooseWordsMutation();
  const { randomWords = [] } = data;
  const [ selectedWords, setSelectedWords ] = useState(new Set());

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedWords((prevSelectedWords) => new Set([...prevSelectedWords, value]));
    } else {
      setSelectedWords((prevSelectedWords) => {
        const newSelectedWords = new Set(prevSelectedWords);
        newSelectedWords.delete(value);
        return newSelectedWords;
      });
    }
  };

  return (
    <div>
      {randomWords.map((word, i) => (
        <div key={i}>
          <input
            id={word}
            type="checkbox"
            value={word}
            checked={selectedWords.has(word)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={word}>{word}</label>
        </div>
      ))}
      <button onClick={() => chooseWords({ words: [...selectedWords] })}>Choose Words</button>
    </div>
  );

};