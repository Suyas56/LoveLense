import React from 'react';

const SimpleTest = () => {
  console.log('SimpleTest component rendered');

  const testClick = () => {
    console.log('Test button clicked');
    alert('Simple test works!');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Simple Test Page</h1>
      <p>If you can see this, React is working.</p>
      <button onClick={testClick} style={{ padding: '10px 20px', margin: '10px' }}>
        Click Me - Test Basic JS
      </button>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Check the browser console for debug messages.</p>
      </div>
    </div>
  );
};

export default SimpleTest;
