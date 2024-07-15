import React from "react";
import "./Explore.css";
import Card from "../Card/Card";

function Explore() {
  return (
    <div className="explore-container">
         <h2>Explore</h2>
    <div className="explore-parent">
       
      {" "}
      <Card title="Dahi Papdi Chaat" description="A delicious street food snack made with crispy papdi, yogurt, and tangy chutneys." />
      <Card title="Paneer Butter Masala" description="A rich and creamy curry made with paneer cubes in a buttery tomato sauce." />
      <Card title="Aloo Paratha" description="Stuffed Indian flatbread with a spiced potato filling, served with yogurt or pickle." />
      <Card title="Chole Bhature" description="A popular Punjabi dish consisting of spicy chickpea curry served with deep-fried bread." />
      <Card title="Mango Lassi" description="A refreshing and sweet yogurt-based drink made with ripe mangoes and a hint of cardamom." />
      <Card title="Pav Bhaji" description="A spicy vegetable mash served with buttered pav buns, garnished with onions and lime." />
      <Card title="Gulab Jamun" description="Deep-fried milk-based dumplings soaked in a sweet cardamom-flavored syrup." />
      <Card title="Masala Dosa" description="A thin, crispy South Indian crepe made from fermented rice batter, filled with spiced potatoes." />
    
     
    </div>

    </div>
  );
}

export default Explore;
