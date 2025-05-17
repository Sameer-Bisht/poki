import React from 'react';

const PokemonCard = ({
    name,
    image,
    type,
    audio,
    height,
    weight,
    experience,
    abilities,
    stats,
    setSearch
})=> {
    const abilityName = abilities.map((curr)=>  curr.ability.name).join(', ')
    const statsName = stats.map((element)=> {
        return {[element.stat.name] : element.base_stat}
    } )
  const speedObj = statsName.filter(stat => stat.hasOwnProperty('speed'))[0];
  const speed = speedObj.speed ?  speedObj.speed : 'N/A';
  const attackObj = statsName.filter(stat => stat.hasOwnProperty('attack'))[0];
  const attack = attackObj.attack ?attackObj.attack  : 'N/A';



   return ( <div  className='poki-card' style={{
      
    }}>
        <img
            src={image}
            alt={name}
            onClick={() => {
                const aud = new Audio(audio);
                aud.play();
            }}
            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
        />
        <h2 style={{ margin: '12px 0 8px' }}>{name}</h2>
        <p style={{
            background: '#eee',
            borderRadius: '8px',
            display: 'inline-block',
            padding: '4px 12px',
            fontWeight: 'bold'
        }}>
            {type.join(' - ')}
        </p>
        <div style={{ marginTop: '10px', textAlign: 'left', fontSize: '14px' }}>
            <div><strong>Height:</strong> {height}</div>
            <div><strong>Weight:</strong> {weight}</div>
            <div><strong>Experience:</strong> {experience}</div>
            <div><strong>Attack:</strong> {attack}</div>
            <div><strong>Speed:</strong> {speed}</div>
            <div>
                <strong>Abilities:</strong> {abilityName}
            </div>
        </div>
    </div>)
};

export default PokemonCard;