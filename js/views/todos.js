var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: "li",

    template: _.template($("#item-template").html()),

    events: {
        "dblclick label": 'edit',
        "keypress .edit": "updateOnEnter",
        "blur .edit": "close"
    },

    // Listen for changes to its model
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    // Re-render the title of the todo item.
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        this.$input = this.$(".edit");
        return this;
    },

    // Switch to editing mode
    edit: function() {
        this.$el.addClass("editing");
        this.$input.focus();
    },

    close: function() {
        var value = this.$input.val().trim();

        if(value) {
            this.model.save({title:value});
        }

        this.$el.removeClass("editing");
    },

    updateOnEnter: function(e) {
        if(e.which === ENTER_KEY) {
            this.close();
        }
    }
});