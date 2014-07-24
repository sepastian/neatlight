
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Slider', function(Slider) {


  Slider.View = Backbone.View.extend({


    options: {
      min: 1,
      max: 94
    },


    /**
     * Initialize the slider.
     */
    initialize: function() {

      // Spin up the slider.
      this.$el.noUiSlider({
        range: this.options,
        start: 1,
        connect: 'lower',
        step: 1
      });

      // Select words on slide.
      this.$el.on('slide', _.bind(function(event, val) {
        this.publish(parseInt(val));
      }, this));

      // Keyboard controls.
      Mousetrap.bind('left',  _.bind(this.left, this));
      Mousetrap.bind('right', _.bind(this.right, this));

    },


    /**
     * Step forward.
     */
    left: function() {
      var cid = parseInt(this.$el.val());
      var nid = cid > 1 ? cid-1 : this.options.max;
      this.slide(nid);
    },


    /**
     * Step back.
     */
    right: function() {
      var cid = parseInt(this.$el.val());
      var nid = cid < this.options.max ? cid+1 : 1;
      this.slide(nid);
    },


    /**
     * Set the position and trigger `slide`.
     *
     * @param {Number} id
     */
    slide: function(id) {
      this.$el.val(id);
      this.publish(id);
    },


    /**
     * Zoom to a word.
     *
     * @param Number id
     */
    publish: function(id) {

      // Load the word record from the map.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: 'w'+id
      });

      // Select the record.
      Neatline.vent.trigger('select', {
        model: record, source: 'SLIDER'
      });

    }


  });


});