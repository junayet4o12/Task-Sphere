/* eslint-disable react/prop-types */
// import React from 'react';

const ClientCard = ({ client }) => {
    const {name, img, description} = client;
    return (
        
            <div className="card w-full max-w-sm md:max-w-3xl bg-base-100 shadow-xl grid md:grid-cols-2">
                <figure><img className=" h-full" src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl">{name}</h2>
                    <p className="text-base font-medium">{description}</p>
                    
                </div>
            </div>
        
    );
};

export default ClientCard;