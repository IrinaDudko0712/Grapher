import React, { useState, useEffect } from 'react';

const MathKeyboard = ({ onKeyClick }) => {
    const [expanded, setExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [buttonColor, setButtonColor] = useState(Array(20).fill('#ffffff')); // Assuming 20 buttons, adjust if needed
    const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

    const handleKeyClick = (key, index) => {
        if (key === '\u232b') { // символ "⌫" (значок клавиатуры для удаления)
            onKeyClick('delete');
        } else {
            let expression = '';
            if (key === 'delete') {
                expression = key;
            } else {
                if (['sqrt', 'sin', 'cos', 'tan', 'ctg', 'ln', 'log'].includes(key)) {
                    expression = `${key}(`;
                } else {
                    expression = key;
                }
            }
            onKeyClick(expression);
        }
        setClickedButtonIndex(index);
        setButtonColor(prevState => prevState.map((color, i) => i === index ? '#d3d1d1' : '#ffffff'));
        setTimeout(() => {
            setClickedButtonIndex(null);
            setButtonColor(prevState => prevState.map((color, i) => i === index ? '#ffffff' : color));
        }, 200); // Change this value to adjust the duration of button lighting
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calculate the width of each button dynamically based on the window width
    const buttonWidth = Math.floor((windowWidth / 5) * 0.8); // Divide by the number of buttons in a row

    const buttonStyle = {
        flex: '1',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        color: '#333333',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '2px',
        width: `${buttonWidth}px` // Set the width dynamically
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                display: expanded ? 'flex' : 'none',
                flexDirection: 'row',
                justifyContent: 'center',
                height: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '10px',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '10px',
                    flex: '1'
                }}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 0 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('x', 0)}>x</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 1 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('y', 1)}>y</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 2 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('ln( )', 2)}>ln</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 3 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('log(a, x)', 3)}>log</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 4 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('cos( )', 4)}>cos</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 5 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('(', 5)}>(</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 6 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick(')', 6)}>)</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 7 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('<', 7)}>{"<"}</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 8 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('>', 8)}>{">"}</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 9 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('sin( )', 9)}>sin</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 10 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('| |', 10)}>|x|</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 11 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('≤', 11)}>≤</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 12 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('≥', 12)}>≥</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 13 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('=', 13)}>=</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 14 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('tan( )', 14)}>tan</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 15 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('√', 15)}>√</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 16 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('^', 16)}>^</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 17 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('e', 17)}>e</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 18 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('π', 18)}>π</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 19 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('.', 19)}>,</button>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '10px',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '10px',
                    flex: expanded ? '1' : '0'
                }}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 20 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('7', 20)}>7</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 21 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('8', 21)}>8</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 22 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('9', 22)}>9</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 23 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('\u232b', 23)}>
                            ⌫
                        </button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 24 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('4', 24)}>4</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 25 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('5', 25)}>5</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 26 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('6', 26)}>6</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 27 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('*', 27)}>*</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 28 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('1', 28)}>1</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 29 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('2', 29)}>2</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 30 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('3', 30)}>3</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 31 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('-', 31)}>-</button>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 32 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('0', 32)}>0</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 33 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('=', 33)}>=</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 34 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('+', 34)}>+</button>
                        <button style={{ ...buttonStyle, backgroundColor: clickedButtonIndex === 35 ? '#d3d1d1' : '#ffffff'}}
                                onClick={() => handleKeyClick('/', 35)}>/</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MathKeyboard;


