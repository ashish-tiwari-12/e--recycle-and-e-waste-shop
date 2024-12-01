document.getElementById("calculate-btn").addEventListener("click", calculatePrice);

document.getElementById("recycle-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const itemType = document.getElementById("item-type").value;
  const condition = document.getElementById("condition").value;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const materials = Array.from(
    document.querySelectorAll('input[name="materials"]:checked')
  ).map((checkbox) => checkbox.value);
  const price = document.getElementById("price-value").textContent;

  // Create item object
  const item = { itemType, condition, weight, materials, price };

  // Get existing items from LocalStorage
  const items = JSON.parse(localStorage.getItem("recycledItems")) || [];
  items.push(item);

  // Save updated items back to LocalStorage
  localStorage.setItem("recycledItems", JSON.stringify(items));

  // Reset the form and update the price display
  document.getElementById("recycle-form").reset();
  document.getElementById("price-value").textContent = "₹0";

  // Confirm success
  alert("Thank you for submitting your item!");

  // Debugging logs
  if (localStorage.length > 0) {
    console.log("Data is stored in localStorage.");
    console.log(localStorage);
  } else {
    console.log("No data in localStorage.");
  }
});

function calculatePrice() {
  const itemType = document.getElementById("item-type").value;
  const condition = document.getElementById("condition").value;
  const materials = Array.from(
    document.querySelectorAll('input[name="materials"]:checked')
  );
  const weight = parseFloat(document.getElementById("weight").value);

  // Base price logic for additional items
  let basePrice = 0;
  switch (itemType) {
    case "Smartphone":
      basePrice = 200;
      break;
    case "Tablet":
      basePrice = 100;
      break;
    case "Laptop":
      basePrice = 500;
      break;
    case "Desktop":
      basePrice = 200;
      break;
    case "Refrigerator":
    case "Washing Machine":
      basePrice = 300;
      break;
    case "Microwave":
      basePrice = 100;
      break;
    case "Air Conditioner":
      basePrice = 150;
      break;
    case "TV":
      basePrice = 250;
      break;
    case "Printer":
      basePrice = 90;
      break;
    case "Gaming Console":
      basePrice = 120;
      break;
    case "Router":
      basePrice = 50;
      break;
    case "Smartwatch":
      basePrice = 40;
      break;
    case "Digital Camera":
      basePrice = 254;
      break;
    case "Electric Kettle":
    case "Blender":
    case "Toaster":
      basePrice = 70;
      break;
    default: // "Other"
      basePrice = 25;
      break;
  }

  // Adjust for condition
  if (condition === "Damaged") basePrice *= 0.7;
  else if (condition === "Non-Functional") basePrice *= 0.4;

  // Add material bonus
  materials.forEach((material) => {
    if (material.value === "Gold") basePrice += 20;
    else if (material.value === "Silver") basePrice += 15;
    else if (material.value === "Copper") basePrice += 10;
    else if (material.value === "Plastic") basePrice += 5;
  });

  // Weight multiplier (assuming weight in kg)
  if (!isNaN(weight) && weight > 0) {
    basePrice += weight * 5;
  }

  // Update price output
  document.getElementById("price-value").textContent = `₹${basePrice.toFixed(2)}`;
}
