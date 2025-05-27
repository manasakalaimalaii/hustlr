import React from 'react';

const MixedHeadline = ({ text }) => {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className={char === char.toUpperCase() && char.match(/[A-Z]/) ? "font-clashDisplay" : "font-satoshi"}>
          {char}
        </span>
      ))}
    </>
  );
};

export default MixedHeadline;