import React from "react";
import BillDetails from "./Component/BillDetails";
import ItemList from "./Component/ItemList";
import TotalAmount from "./Component/TotalAmount";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [items, setItems] = React.useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Invoice", 105, 20, { align: "center" });

    pdf.setLineWidth(0.5);
    pdf.line(20, 25, 190, 25);

    pdf.setFontSize(12);
    items.forEach((item, index) => {
      const yPos = 40 + index * 10;
      pdf.text(`Item: ${item.item}`, 20, yPos);
      pdf.text(`Quantity: ${item.quantity}`, 80, yPos);
      pdf.text(`Price: $${item.price}`, 140, yPos);
    });

    pdf.line(20, 160, 190, 160);

    const totalAmount = calculateTotalAmount();
    pdf.setFontSize(14);
    pdf.text(`Total Amount: $${totalAmount.toFixed(2)}`, 140, 170);

    pdf.save("invoice.pdf");
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <BillDetails onAddItem={handleAddItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
      <TotalAmount total={calculateTotalAmount()} />
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
