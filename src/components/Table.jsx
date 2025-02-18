import React, { useState } from "react";
import Row from "./Row";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1400,
      originalValue: 1400,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          originalValue: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          originalValue: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          originalValue: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          originalValue: 700,
        },
      ],
    },
  ],
};

const Table = () => {
  const [data, setData] = useState(initialData);

  const updateRowValue = (id, newValue) => {
    const updatedRows = JSON.parse(JSON.stringify(data.rows));

    const findAndUpdate = (rows) => {
      for (let row of rows) {
        if (row.id === id) {
          if (row.children && row.children.length > 0) {
            const totalOldValue = row.children.reduce(
              (sum, child) => sum + child.value,
              0
            );

            if (totalOldValue > 0) {
              row.children.forEach((child) => {
                const percentage = child.value / totalOldValue;
                child.value = parseFloat((percentage * newValue).toFixed(2));
              });
            }
          }
          row.value = newValue;
          return true;
        }

        if (row.children) {
          const found = findAndUpdate(row.children);
          if (found) {
            row.value = row.children.reduce(
              (sum, child) => sum + child.value,
              0
            );
          }
        }
      }
      return false;
    };

    findAndUpdate(updatedRows);
    setData({ rows: updatedRows });
  };

  const calculateGrandTotal = (rows) => {
    let total = 0;

    const sumRowValues = (rows) => {
      for (let row of rows) {
        total += row.value;
        if (row.children) {
          sumRowValues(row.children);
        }
      }
    };

    sumRowValues(rows);
    return total;
  };

  const grandTotal = calculateGrandTotal(data.rows);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Hierarchical Table</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Label</th>
            <th className="border border-gray-300 p-2">Value</th>
            <th className="border border-gray-300 p-2">Input</th>
            <th className="border border-gray-300 p-2">Allocation %</th>
            <th className="border border-gray-300 p-2">Allocation Val</th>
            <th className="border border-gray-300 p-2">Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <Row key={row.id} row={row} updateRowValue={updateRowValue} />
          ))}
          <tr className="bg-gray-100 font-bold">
            <td className="border p-2">Grand Total</td>
            <td className="border p-2">{grandTotal.toFixed(2)}</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
