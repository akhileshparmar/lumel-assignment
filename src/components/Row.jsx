import React, { useState } from "react";

const Row = ({ row, updateRowValue, level = 0 }) => {
    const [inputValue, setInputValue] = useState("");
  
    const handleAllocationPercentage = () => {
      const percentage = parseFloat(inputValue);
      if (!isNaN(percentage)) {
        const newValue = row.value + (row.value * percentage) / 100;
        updateRowValue(row.id, parseFloat(newValue.toFixed(2)));
      }
    };
  
    const handleAllocationValue = () => {
      const newValue = parseFloat(inputValue);
      if (!isNaN(newValue)) {
        updateRowValue(row.id, newValue);
      }
    };
  
    const variance = ((row.value - row.originalValue) / row.originalValue) * 100;
  
    return (
      <>
        <tr>
          <td className="border p-2" style={{ paddingLeft: `${level * 20}px` }}>
            {row.label}
          </td>
          <td className="border p-2">{row.value.toFixed(2)}</td>
          <td className="border p-2">
            <input
              type="number"
              className="border p-1 w-20"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </td>
          <td className="border p-2">
            <button className="bg-blue-500 text-white px-2 py-1" onClick={handleAllocationPercentage}>
              %
            </button>
          </td>
          <td className="border p-2">
            <button className="bg-green-500 text-white px-2 py-1" onClick={handleAllocationValue}>
              Val
            </button>
          </td>
          <td className="border p-2">{variance.toFixed(2)}%</td>
        </tr>
        {row.children &&
          row.children.map((child) => (
            <Row key={child.id} row={child} updateRowValue={updateRowValue} level={level + 1} />
          ))}
      </>
    );
  };
  

export default Row;
