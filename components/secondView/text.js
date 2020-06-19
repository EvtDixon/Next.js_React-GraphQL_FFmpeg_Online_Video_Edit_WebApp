import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';

const Texts = () => {
   //    let stage = new Stage({
   //       height: 600,
   //       width: 600,
   //       container: 'konva-holder',
   //    });
   //    let layer = new Layer();
   //    stage.add(layer);
   //    let rect = new Rect({
   //       fill: '#d1d1d1',
   //       width: 200,
   //       height: 200,
   //    });
   const handleDragStart = (e) => {
      e.target.setAttrs({
         shadowOffset: {
            x: 15,
            y: 15,
         },
         scaleX: 1.1,
         scaleY: 1.1,
      });
   };
   const handleDragEnd = (e) => {
      e.target.to({
         duration: 0.5,
         easing: Konva.Easings.ElasticEaseOut,
         scaleX: 1,
         scaleY: 1,
         shadowOffsetX: 5,
         shadowOffsetY: 5,
      });
   };
   return (
      <div>
         <div className='addText'>add text</div>

         <div className='text'>
            <h1>simple text</h1>
         </div>
         <div className='text'>
            <h1>simple text</h1>
         </div>
         <div className='text'>
            <h1>simple text</h1>
         </div>
      </div>
      //   <Stage width={window.innerWidth} height={window.innerHeight}>
      //      <Layer>
      //         <Text
      //            fontSize='17'
      //            fontFamily='Calibri'
      //            text='Try to drag me'
      //            //    onDragStart={handleDragStart}
      //            //    onDragEnd={handleDragEnd}
      //            draggable={true}
      //         />
      //         {/* {[...Array(10)].map((_, i) => (
      //            <Star
      //               key={i}
      //               x={Math.random() * window.innerWidth}
      //               y={Math.random() * window.innerHeight}
      //               numPoints={5}
      //               innerRadius={20}
      //               outerRadius={40}
      //               fill='#89b717'
      //               opacity={0.8}
      //               draggable
      //               rotation={Math.random() * 180}
      //               shadowColor='black'
      //               shadowBlur={10}
      //               shadowOpacity={0.6}
      //               onDragStart={handleDragStart}
      //               onDragEnd={handleDragEnd}
      //            />
      //         ))} */}
      //      </Layer>
      //   </Stage>
   );
};
export default Texts;
