import React, { useState, useEffect } from 'react';

const ListComparison = () => {
  const [list1, setList1] = useState('');
  const [list2, setList2] = useState('');
  const [uniqueRows1, setUniqueRows1] = useState([]);
  const [uniqueRows2, setUniqueRows2] = useState([]);

  useEffect(() => {
    const compareListsHandler = () => {
      const rows1 = list1.split('\n').filter(row => row.trim() !== '');
      const rows2 = list2.split('\n').filter(row => row.trim() !== '');
      
      setUniqueRows1(rows1.filter(row => !rows2.includes(row)));
      setUniqueRows2(rows2.filter(row => !rows1.includes(row)));
    };

    compareListsHandler();
  }, [list1, list2]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const ListColumn = ({ listNumber, list, setList, uniqueRows }) => (
    <div className="flex-1">
      <div className="mb-2">
        List {listNumber} (Total Rows: {list.split('\n').filter(row => row.trim() !== '').length}, 
        Unique Rows: {uniqueRows.length})
      </div>
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={list}
        onChange={(e) => setList(e.target.value)}
        placeholder={`Enter list ${listNumber} here`}
      />
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Unique rows in List {listNumber} ({uniqueRows.length}):</h3>
          <button
            onClick={() => copyToClipboard(uniqueRows.join('\n'))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Copy Unique Rows
          </button>
        </div>
        <ul className="list-disc pl-5 mt-2">
          {uniqueRows.map((row, index) => (
            <li key={index}>{row}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex space-x-8">
        <ListColumn
          listNumber={1}
          list={list1}
          setList={setList1}
          uniqueRows={uniqueRows1}
        />
        <ListColumn
          listNumber={2}
          list={list2}
          setList={setList2}
          uniqueRows={uniqueRows2}
        />
      </div>
    </div>
  );
};

export default ListComparison;