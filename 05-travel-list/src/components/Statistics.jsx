function Statistics({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🧳</em>
      </footer>
    );
  }

  const itemsTotalNum = items.length;
  const itemsPackedNum = items.filter(item => item.packed === true).length;
  const itemsPercentagePacked = Math.round((itemsPackedNum / itemsTotalNum) * 100) || 0;

  return (
    <footer className="stats">
      <em>
        {itemsPercentagePacked === 100
          ? 'You got everything! Ready to go ✈️'
          : `
        💼 You have ${itemsTotalNum} items on your FileList, and you already have packed ${itemsPackedNum} (
        ${itemsPercentagePacked}%)`}
      </em>
    </footer>
  );
}

export default Statistics;
