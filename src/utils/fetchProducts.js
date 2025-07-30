import axios from 'axios';

const fetchProducts = async () => {
  const sheetId = import.meta.env.VITE_SHEET_ID;
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    const res = await axios.get(url);
    const text = res.data;
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const headers = json.table.cols.map(col => col.label);
    const data = json.table.rows.map(row => {
      const obj = {};
      row.c.forEach((cell, i) => {
        obj[headers[i]] = cell?.v || "";
      });
      return {
        admin: obj["admin"],
        image: obj["imageUrl"],
        title: obj["productName"],
        description: `${obj["storage"]}GB - ${obj["color"]}`,
        price: parseFloat(obj["currentPrice"] || 0),
        discount: parseInt(obj["discount"], 10) || 0,
      };
    });
    return data;
  } catch (err) {
    console.error("Error fetching sheet:", err);
    return [];
  }
};

export default fetchProducts; 