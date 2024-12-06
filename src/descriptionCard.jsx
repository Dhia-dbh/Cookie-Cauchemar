import React, { useEffect, useState } from 'react';
import "./descriptionCard.css";

const DescriptionCard = ({ selectedPoint, x, y, navbarHeight }) => {

  const cardStyle = {
    position: 'absolute',
    top: `${y == 0 ? 170 : y}px`,
    left: `${x == 0 ? 560 : x}px`,
    zIndex: 9999,
  };

  return (
    <div className="container" style={{ marginTop: `${navbarHeight}px` }}>
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <h1>{selectedPoint?.title || "Bienvenue sur le site éducatif de Race for Water"}</h1>
          <p>{selectedPoint?.describ || "Race for Water est une initiative mondiale visant à sensibiliser et à lutter contre la pollution plastique des océans. Notre mission est de protéger les ressources en eau et de garantir un avenir plus durable pour notre planète. À travers ce site, nous vous invitons à découvrir les actions menées par la fondation Race for Water, à comprendre les enjeux liés à la pollution plastique et à l’eau, et à explorer des solutions innovantes pour préserver notre environnement.Nous proposons une série de ressources éducatives interactives, comprenant des articles, des vidéos, des infographies et des outils pédagogiques destinés à sensibiliser tous les publics, des enfants aux adultes. Que vous soyez un étudiant, un enseignant, un chercheur ou un citoyen engagé, notre site est un lieu où l'éducation et l'action se rejoignent pour inspirer des changements concrets dans la lutte contre la pollution des océans et la gestion durable des ressources en eau.Explorez nos projets sur le terrain, nos événements et apprenez comment vous pouvez contribuer à cette cause essentielle. Chaque petit geste compte pour préserver les océans, protéger l'eau potable et protéger notre planète pour les générations futures"}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;

// Usage Example:
// <DescriptionCard text="Click anywhere to move me!" initialX={100} initialY={100} />
