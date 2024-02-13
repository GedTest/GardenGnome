import React, { useRef, useState } from 'react';
import useHold from './useHold';


export default function Map() {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [scale, setScale] = useState(1.0);
    const btnPlusRef = useRef(null);
    const btnMinusRef = useRef(null);

    useHold(() => handleZoom(0.1), btnPlusRef, 60);
    useHold(() => handleZoom(-0.1), btnMinusRef, 60);
    


    // TO-DO useEffect


    function handleMouseDown(e) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - offsetX,
            y: e.clientY - offsetY
        });
    }

    function handleMouseMove(e) {
        if(!isDragging) { return; }

        const mapRect = document.querySelector('.map').getBoundingClientRect();
        const bgRect = document.querySelector('.background').getBoundingClientRect();

        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        // prevent dragging too far so the image is out of map rectangle
        if(newX > mapRect.width/2) { newX = mapRect.width/2;}
        if(newY > mapRect.height/2) { newY = mapRect.height/2;}

        // horizontal axis
        const isBeyondLeft = bgRect.x > mapRect.x;
        const isBeyondRight = (bgRect.x + bgRect.width) < (mapRect.x + mapRect.width);
        if( !(isBeyondLeft && (newX-offsetX) > 0) &&
            !(isBeyondRight && (newX-offsetX) < 0) ) {
            setOffsetX(newX);
        }

        // vertical axis
        const isBeyondUpper = bgRect.y > mapRect.y;
        const isBeyondLower = (bgRect.y + bgRect.height) < (mapRect.y + mapRect.height);
        if ( !(isBeyondUpper && (newY-offsetY) > 0) &&
            !(isBeyondLower && (newY-offsetY) < 0) ) {
            setOffsetY(newY);
        }
    }

    function handleMouseUp()  {
        setIsDragging(false);
    }

    function handleZoom(value, max=2.0, min=1.0) {
        const newScale = Math.max(min, Math.min(max, scale + value));
        
        if(newScale < scale) {
            const mapRect = document.querySelector('.map').getBoundingClientRect();
            const bgRect = document.querySelector('.background').getBoundingClientRect();
            const deltaX = (mapRect.width * (newScale - scale)) / 2;
            const deltaY = (mapRect.height * (newScale - scale)) / 2;

            // Calculate the center of the map container
            const mapCenterX = mapRect.left + mapRect.width / 2;
            const mapCenterY = mapRect.top + mapRect.height / 2;
            
            // Calculate the center of the image
            const bgCenterX = bgRect.left + bgRect.width / 2;
            const bgCenterY = bgRect.top + bgRect.height / 2;
            

            const distanceX = Math.abs(bgCenterX - mapCenterX);
            const normalizedDistanceX = (distanceX / (bgRect.width/2)) * 5;

            const dirX = bgCenterX > mapCenterX ? normalizedDistanceX : -normalizedDistanceX;
            setOffsetX(offsetX + (deltaX * dirX));

            const distanceY = Math.abs(bgCenterY - mapCenterY);
            const normalizedDistanceY = (distanceY / (bgRect.height/2)) * 5;
            
            const dirY = bgCenterY > mapCenterY ? normalizedDistanceY : -normalizedDistanceY;
            setOffsetY(offsetY + (deltaY * dirY));
            
        }
        setScale(newScale);
    }


    return (
        <div>
            <div className="zoom-buttons">
                <button ref={btnPlusRef} onClick={ () => handleZoom(0.05) } >+</button>
                <button ref={btnMinusRef} onClick={ () => handleZoom(-0.05) } >-</button>
            </div>
            <div
                className="map-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div className="map">
                    <img
                        className="background"
                        src="img/grass.jpg"
                        alt=""
                        style={{ transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})` }}
                    />
                    <img className="tree-icon" src="img/apple.png" alt="" />
                </div>
            </div>
        </div>
    );
}
