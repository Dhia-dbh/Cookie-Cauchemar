import React, { useState, useEffect } from 'react';
import DescriptionCard from './descriptionCard.jsx';
import Navbar from './navbar.jsx';
import ImageContent from './imageContent';  // Assuming this is your image component
import './App.css'; // Assuming you have the necessary styles
import Podcast from './podcast.jsx';
import Cookie from './cookie.jsx';


const App = () => {
  // Predefined list of points with coordinates
  const predefinedPoints = [
    { id: "Poumon L", cx: 180, cy: 200, dataX: 180, dataY: 200, title: "🌬️ Poumons (Le Cycle de l’Eau ☔)", describ: "Les poumons fonctionnent comme le cycle de l’eau sur Terre ☁️, où l’évaporation et la condensation maintiennent l’équilibre atmosphérique. L’eau 💦 dans les poumons garde les voies respiratoires humides, facilitant les échanges d’oxygène et de dioxyde de carbone. Une déshydratation assèche ce cycle, tout comme une planète privée de pluie devient aride 🌵, rendant la vie difficile." },
    { id: "Poumon R", cx: 250, cy: 200, dataX: 250, dataY: 200, title: "🌬️ Poumons (Le Cycle de l’Eau ☔)", describ: "Les poumons fonctionnent comme le cycle de l’eau sur Terre ☁️, où l’évaporation et la condensation maintiennent l’équilibre atmosphérique. L’eau 💦 dans les poumons garde les voies respiratoires humides, facilitant les échanges d’oxygène et de dioxyde de carbone. Une déshydratation assèche ce cycle, tout comme une planète privée de pluie devient aride 🌵, rendant la vie difficile." },
    {
      id: "Coeur", cx: 215, cy: 225, dataX: 215, dataY: 225, title: "❤️ Cœur (Les Courants Océaniques 🌊)", describ: "Tout comme les courants océaniques 🌊 distribuent la chaleur et les nutriments à travers la planète, l’eau 💧 dans le corps permet au cœur de pomper le sang efficacement. Elle garantit une bonne circulation pour transporter l’oxygène et les nutriments nécessaires à la vie. Sans eau, le cœur travaille plus dur, tout comme un déséquilibre des courants océaniques perturbe le climat global, mettant en danger les écosystèmes 🌍."
    },
    { id: "Mulscle", cx: 125, cy: 250, dataX: 190, dataY: 270, title: "Muscles (Les Marées 🌊)", describ: "Les muscles dépendent de l’eau 💧, tout comme les marées dépendent de la fluidité et des forces gravitationnelles 🌙. L’eau permet aux muscles de se contracter et de se relâcher efficacement. En cas de déshydratation, les muscles se contractent douloureusement 😖, tout comme des marées perturbées peuvent causer des déséquilibres dans les écosystèmes côtiers 🦀." },
    { id: "Sys urinaire", cx: 212, cy: 440, dataX: 190, dataY: 270, title: "🛡️ Reins et Système Urinaire (Les Zones Humides 🐊)", describ: "Les reins sont comme les zones humides de la Terre 🐊, des filtres naturels qui purifient l’eau et maintiennent un équilibre vital. L’eau 💦 permet aux reins d’éliminer les toxines et de produire l’urine. Sans eau, ces “zones humides internes” ne fonctionnent plus correctement, laissant les toxines s’accumuler, comme les marécages drainés ne peuvent plus filtrer l’eau naturellement 🏞️." },
    {
      id: "Os", cx: 180, cy: 500, dataX: 190, dataY: 270, title: "🦴 Os (La Croûte Terrestre 🌋)", describ: "Les os sont comme la croûte terrestre 🌋 : solides mais flexibles grâce à l’eau présente dans la moelle osseuse et le cartilage. L’eau permet de lubrifier les articulations et d’amortir les chocs 🤸. Sans hydratation, les os deviennent rigides, tout comme une terre asséchée perd sa capacité à supporter la végétation et les constructions 🌾."
    },
    { id: "Peau", cx: 98, cy: 390, dataX: 190, dataY: 270, title: "🌍 Peau (La Surface de la Terre 🌄)", describ: "La peau peut être comparée à la surface terrestre 🌏, qui a besoin d’humidité pour rester robuste et protectrice. L’eau 💦 aide à maintenir l’élasticité de la peau et à réguler la température grâce à la transpiration 🌡️, tout comme les océans tempèrent le climat terrestre. En cas de manque d’eau, la peau devient sèche et craquelée, comme un sol desséché perdant sa capacité à abriter la vie 🐜." },
    { id: "Intesteins", cx: 190, cy: 370, dataX: 190, dataY: 320, title: "🍽️ Intestins (Les Fleuves et Rivières 🏞️)", describ: "Les intestins ressemblent aux rivières 🏞️ qui transportent l’eau, les nutriments et éliminent les déchets. De la même manière que les rivières sculptent les paysages et nourrissent les sols 🌱, l’eau 💧 dans les intestins facilite la digestion et le transit intestinal. En cas de déshydratation, ces “fleuves internes” s’assèchent, causant des blocages, à l’image des rivières taries en période de sécheresse 🌾." },
    // Add more points as needed
  ];

  const [pinFormVisible, setPinFormVisible] = useState(false);
  const [pinConfirmVisible, setPinConfirmVisible] = useState(false);
  const [pinConfirmSuccessVisible, setPinConfirmSuccessVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [card_x, setCardX] = useState(0);
  const [card_y, setCardY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState('acceuil');

  useEffect(() => {
    const handleClick = (e) => {
      // Only handle the click event if it is on a circle element
      if (e.target.tagName === 'circle') {
        //console.log(e.target.id)
        // Get the coordinates of the clicked circle
        const newX = e.clientX;
        const newY = e.clientY - navbarHeight; // Adjust for the navbar height

        // Update card position only when clicking on a circle
        setCardX((newX + 150) * 1.2); // Adjust for the circle's position;
        setCardY(newY - navbarHeight - 100); // Adjust for the navbar height
      }
    };

    document.addEventListener('click', handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [navbarHeight]);

  const handleCircleClick = (point) => {
    setSelectedPoint(point); // Set the selected point when a circle is clicked
    setPinConfirmVisible(true); // Show the confirmation modal
    setCardX(point.dataX); // Update card position with circle's coordinates
    setCardY(point.dataY); // Update card position with circle's coordinates
  };

  const handleConfirmTrue = () => {
    setPinConfirmVisible(false);
    setPinFormVisible(true); // Show the form after confirmation
  };

  const handleCancelPin = () => {
    setPinConfirmVisible(false);
    setSelectedPoint(null); // Deselect the point and hide the confirmation modal
  };

  const handleFormSubmit = () => {
    setPinFormVisible(false);
    setPinConfirmSuccessVisible(true); // Show success message
  };

  const handleFormCancel = () => {
    setPinFormVisible(false);
    setPinConfirmVisible(true); // Show confirmation modal again
  };

  const handleSuccessClick = () => {
    setPinConfirmSuccessVisible(false);
  };

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      {
      currentPage=='acceuil'?<>
        <div >
        <svg
          className='humanAnatomy'
          id="humanAnatomy"
          xmlns="http://www.w3.org/2000/svg"
          width="420px"
          height="780px"
          viewBox="0 0 420 780"
        >
          <g id="humanInner">
            {/* Image content */}
            <ImageContent />

            {/* Points (circles) rendered above the image */}
            {predefinedPoints.map((point) => (
              <circle
                key={point.id}
                id={point.id}
                cx={point.cx}
                cy={point.cy}
                r="10"
                className={"newcircle " + (selectedPoint?.id === point.id ? "selected" : "")}
                data-x={point.dataX}
                data-y={point.dataY}
                onClick={() => handleCircleClick(point)} // Handle click to select point
              />
            ))}
          </g>
        </svg>

        {pinConfirmVisible && (
          <div id="pinConfirm" className="pin-confirm">
            <div id="pinConfirmBtns">
              <button className="btn btn-success" onClick={handleConfirmTrue}>
                &#10004;
              </button>
              <button className="btn btn-danger" onClick={handleCancelPin}>
                &#10007;
              </button>
            </div>
          </div>
        )}

        {pinFormVisible && (
          <form id="pinForm" className="pin-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Pin Form</legend>
              <div className="form-group">
                <label htmlFor="textinput">Name of sick</label>
                <input id="textinput" name="textinput" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="textinput">Marked area</label>
                <input id="textinput" name="textinput" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="textarea">Comment</label>
                <textarea id="textarea" name="textarea"></textarea>
              </div>
              <div className="form-group">
                <label>Confirm</label>
                <button type="button" className="btn btn-success" onClick={handleFormSubmit}>
                  OK
                </button>
                <button type="button" className="btn btn-danger" onClick={handleFormCancel} style={{zIndex:"2005"}}>
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        )}

        {pinConfirmSuccessVisible && (
          <div id="pinConfirmSucces" className="pin-confirm-succes">
            <button className="btn btn-success" onClick={handleSuccessClick}>
              &#10004; Registration Successful
            </button>
          </div>
        )}
      </div>
      
      <DescriptionCard selectedPoint={selectedPoint} x={card_x} y={card_y} navbarHeight={navbarHeight} />
      <Cookie  />
      </>         : <>
      <Podcast/>
      
      </>
      }
      
    </>
  );
};

export default App;
