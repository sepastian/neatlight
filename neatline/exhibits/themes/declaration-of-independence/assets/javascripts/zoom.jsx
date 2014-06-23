
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Zoom', function(Lines) {


  var ZoomWidget = React.createClass({


    /**
     * Render the markup.
     */
    render: function() {
      return (
        <div className="buttons">
          <div className="btn in" onClick={this.zoomIn}>+</div>
          <div className="btn out" onClick={this.zoomOut}>-</div>
        </div>
      );
    },


    /**
     * Zoom the map in.
     */
    zoomIn: function() {
      Neatline.request('MAP:getMap').zoomIn();
    },


    /**
     * Zoom the map out.
     */
    zoomOut: function() {
      Neatline.request('MAP:getMap').zoomOut();
    }


  });


  // Render the component.
  Neatline.on('start', function() {
    React.renderComponent(
      <ZoomWidget />,
      $('#zoom').get(0)
    );
  });


});