export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* The value of the input element with type "checkbox" will be true/false */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => onToggleItem(item.id)}
      />
      {/* conditionally styling: if the item is packed, then we strike through that item */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
