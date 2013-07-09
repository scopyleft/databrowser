(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  module.exports = {
    initialize: function() {
      var Router;
      Router = require('router');
      this.router = new Router();
      Backbone.history.start();
      if (typeof Object.freeze === 'function') {
        return Object.freeze(this);
      }
    }
  };
  
});
window.require.register("collections/doctypes", function(exports, require, module) {
  var DocType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DocType = require("../models/doctype").DocType;

  exports.DocTypeCollection = (function(_super) {
    __extends(DocTypeCollection, _super);

    DocTypeCollection.prototype.model = DocType;

    function DocTypeCollection(view, options) {
      this.view = view;
      this.options = options;
      DocTypeCollection.__super__.constructor.call(this, this.options);
      this.url = "databrowser/#doctype/";
      console.log(this.url);
    }

    DocTypeCollection.prototype.parse = function(response) {
      return response.rows;
    };

    return DocTypeCollection;

  })(Backbone.Collection);
  
});
window.require.register("collections/documents", function(exports, require, module) {
  var Document,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Document = require("../models/document").Document;

  exports.DocumentCollection = (function(_super) {
    __extends(DocumentCollection, _super);

    DocumentCollection.prototype.model = Document;

    function DocumentCollection(view, doctypeId, options) {
      this.view = view;
      this.doctypeId = doctypeId;
      this.options = options;
      DocumentCollection.__super__.constructor.call(this, {
        id: this.doctypeId
      }, this.options);
      this.url = "databrowser/#doctype/" + this.doctypeId + "/documents/";
      console.log(this.url);
    }

    DocumentCollection.prototype.parse = function(response) {
      return response.rows;
    };

    return DocumentCollection;

  })(Backbone.Collection);
  
});
window.require.register("initialize", function(exports, require, module) {
  var app;

  app = require('application');

  $(function() {
    require('lib/app_helpers');
    return app.initialize();
  });
  
});
window.require.register("lib/app_helpers", function(exports, require, module) {
  (function() {
    return (function() {
      var console, dummy, method, methods, _results;
      console = window.console = window.console || {};
      method = void 0;
      dummy = function() {};
      methods = 'assert,count,debug,dir,dirxml,error,exception,\
                   group,groupCollapsed,groupEnd,info,log,markTimeline,\
                   profile,profileEnd,time,timeEnd,trace,warn'.split(',');
      _results = [];
      while (method = methods.pop()) {
        _results.push(console[method] = console[method] || dummy);
      }
      return _results;
    })();
  })();
  
});
window.require.register("lib/base_view", function(exports, require, module) {
  var BaseView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = BaseView = (function(_super) {
    __extends(BaseView, _super);

    function BaseView() {
      _ref = BaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseView.prototype.template = function() {};

    BaseView.prototype.initialize = function() {};

    BaseView.prototype.getRenderData = function() {
      var _ref1;
      return {
        model: (_ref1 = this.model) != null ? _ref1.toJSON() : void 0
      };
    };

    BaseView.prototype.render = function() {
      this.beforeRender();
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    BaseView.prototype.beforeRender = function() {};

    BaseView.prototype.afterRender = function() {};

    BaseView.prototype.destroy = function() {
      this.undelegateEvents();
      this.$el.removeData().unbind();
      this.remove();
      return Backbone.View.prototype.remove.call(this);
    };

    return BaseView;

  })(Backbone.View);
  
});
window.require.register("lib/view_collection", function(exports, require, module) {
  var BaseView, ViewCollection, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseView = require('lib/base_view');

  module.exports = ViewCollection = (function(_super) {
    __extends(ViewCollection, _super);

    function ViewCollection() {
      this.removeItem = __bind(this.removeItem, this);
      this.addItem = __bind(this.addItem, this);
      _ref = ViewCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ViewCollection.prototype.itemview = null;

    ViewCollection.prototype.views = {};

    ViewCollection.prototype.template = function() {
      return '';
    };

    ViewCollection.prototype.itemViewOptions = function() {};

    ViewCollection.prototype.collectionEl = null;

    ViewCollection.prototype.onChange = function() {
      return this.$el.toggleClass('empty', _.size(this.views) === 0);
    };

    ViewCollection.prototype.appendView = function(view) {
      return this.$collectionEl.append(view.el);
    };

    ViewCollection.prototype.initialize = function() {
      var collectionEl;
      ViewCollection.__super__.initialize.apply(this, arguments);
      this.views = {};
      this.listenTo(this.collection, "reset", this.onReset);
      this.listenTo(this.collection, "add", this.addItem);
      this.listenTo(this.collection, "remove", this.removeItem);
      if (this.collectionEl == null) {
        return collectionEl = el;
      }
    };

    ViewCollection.prototype.render = function() {
      var id, view, _ref1;
      _ref1 = this.views;
      for (id in _ref1) {
        view = _ref1[id];
        view.$el.detach();
      }
      return ViewCollection.__super__.render.apply(this, arguments);
    };

    ViewCollection.prototype.afterRender = function() {
      var id, view, _ref1;
      this.$collectionEl = $(this.collectionEl);
      _ref1 = this.views;
      for (id in _ref1) {
        view = _ref1[id];
        this.appendView(view.$el);
      }
      this.onReset(this.collection);
      return this.onChange(this.views);
    };

    ViewCollection.prototype.remove = function() {
      this.onReset([]);
      return ViewCollection.__super__.remove.apply(this, arguments);
    };

    ViewCollection.prototype.onReset = function(newcollection) {
      var id, view, _ref1;
      _ref1 = this.views;
      for (id in _ref1) {
        view = _ref1[id];
        view.remove();
      }
      return newcollection.forEach(this.addItem);
    };

    ViewCollection.prototype.addItem = function(model) {
      var options, view;
      options = _.extend({}, {
        model: model
      }, this.itemViewOptions(model));
      view = new this.itemview(options);
      this.views[model.cid] = view.render();
      this.appendView(view);
      return this.onChange(this.views);
    };

    ViewCollection.prototype.removeItem = function(model) {
      this.views[model.cid].remove();
      delete this.views[model.cid];
      return this.onChange(this.views);
    };

    return ViewCollection;

  })(BaseView);
  
});
window.require.register("models/doctype", function(exports, require, module) {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports.DocType = (function(_super) {
    __extends(DocType, _super);

    function DocType(type) {
      var property;
      DocType.__super__.constructor.apply(this, arguments);
      for (property in type) {
        this[property] = type[property];
      }
    }

    DocType.prototype.url = function() {
      return "databrowser/#doctype/" + this.id;
    };

    DocType.prototype.parse = function(data) {
      if (data.rows) {
        return data.rows[0];
      }
    };

    return DocType;

  })(Backbone.Model);
  
});
window.require.register("models/document", function(exports, require, module) {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports.Document = (function(_super) {
    __extends(Document, _super);

    function Document(doc) {
      var property;
      Document.__super__.constructor.apply(this, arguments);
      for (property in doc) {
        this[property] = doc[property];
      }
    }

    Document.prototype.url = function() {
      return "databrowser/#doctype/" + this.doctypeId + "/documents/" + this.id;
    };

    Document.prototype.parse = function(data) {
      if (data.rows) {
        return data.rows[0];
      }
    };

    return Document;

  })(Backbone.Model);
  
});
window.require.register("router", function(exports, require, module) {
  var Router, views, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  views = require('views/app_view');

  module.exports = Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.routes = {
      '': 'home',
      'doctype/:doctypeId': 'doctype',
      'doctype/:doctypeId/documents/': 'documents',
      'doctype/:doctypeId/document/:documentId': 'document'
    };

    Router.prototype.home = function() {
      var homeView;
      homeView = new views.HomeView();
      return homeView.render();
    };

    Router.prototype.doctype = function(doctypeId) {
      var doctypeView;
      doctypeView = new views.DoctypeView();
      doctypeView.populateData(doctypeId);
      return doctypeView.render();
    };

    Router.prototype.documents = function(doctypeId) {
      var documentsCollection;
      documentsCollection = new views.DocumentsCollection();
      return documentsCollection.render();
    };

    Router.prototype.document = function(doctypeId, documentId) {
      var documentView;
      documentView = new views.DocumentView();
      return documentView.render();
    };

    return Router;

  })(Backbone.Router);
  
});
window.require.register("views/app_view", function(exports, require, module) {
  var BaseView, DocType, DocTypeCollection, Document, DocumentCollection, ViewCollection, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseView = require('../lib/base_view');

  ViewCollection = require('../lib/view_collection');

  DocTypeCollection = require("../collections/doctypes").DocTypeCollection;

  DocType = require("../models/doctype").DocType;

  DocumentCollection = require("../collections/documents").DocumentCollection;

  Document = require("../models/document").Document;

  exports.HomeView = (function(_super) {
    __extends(HomeView, _super);

    HomeView.prototype.el = 'body.application';

    HomeView.prototype.template = require('./templates/home');

    function HomeView() {
      this.doctypes = new DocTypeCollection();
      HomeView.__super__.constructor.call(this);
    }

    HomeView.prototype.afterRender = function() {
      return console.log("write more code here !");
    };

    return HomeView;

  })(BaseView);

  exports.DoctypeView = (function(_super) {
    __extends(DoctypeView, _super);

    function DoctypeView() {
      _ref = DoctypeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DoctypeView.prototype.el = 'body.application';

    DoctypeView.prototype.template = require('./templates/doctype');

    DoctypeView.prototype.afterRender = function() {
      return console.log("write more code here !");
    };

    DoctypeView.prototype.populateData = function(id) {
      return console.log(id);
    };

    return DoctypeView;

  })(BaseView);

  exports.DocumentsCollection = (function(_super) {
    __extends(DocumentsCollection, _super);

    function DocumentsCollection() {
      _ref1 = DocumentsCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DocumentsCollection.prototype.el = 'body.application';

    DocumentsCollection.prototype.template = require('./templates/documents');

    DocumentsCollection.prototype.afterRender = function() {
      return console.log("write more code here !");
    };

    return DocumentsCollection;

  })(ViewCollection);

  exports.DocumentView = (function(_super) {
    __extends(DocumentView, _super);

    function DocumentView() {
      _ref2 = DocumentView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    DocumentView.prototype.el = 'body.application';

    DocumentView.prototype.template = require('./templates/document');

    DocumentView.prototype.afterRender = function() {
      return console.log("write more code here !");
    };

    return DocumentView;

  })(BaseView);
  
});
window.require.register("views/templates/doctype", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="nav"><h4>Your data types</h4><ul><li><a href="#" title="Doctype 1 infos">doctype 1</a></li><li><a href="#" title="Doctype 2 infos">doctype 2</a></li><li><a href="#" title="Doctype 3 infos">doctype 3</a></li></ul></div><div id="content"><h1>Data browser (doctype)</h1><h2>Doctype 1</h2><ul><li><a href="#">Document 1</a></li><li><a href="#">Document 2</a></li><li><a href="#">Document 3</a></li></ul><h2>Doctype 2</h2><ul><li><a href="#">Document 1</a></li><li><a href="#">Document 2</a></li><li><a href="#">Document 3</a></li></ul></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/templates/document", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  }
  return buf.join("");
  };
});
window.require.register("views/templates/documents", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  }
  return buf.join("");
  };
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="nav"><h4>Your data types</h4><ul><li><a href="#doctype/doc1" title="Doctype 1 infos">doctype 1</a></li><li><a href="#" title="Doctype 2 infos">doctype 2</a></li><li><a href="#" title="Doctype 3 infos">doctype 3</a></li></ul></div><div id="content"><h1>Data browser (home)</h1><h2>Doctype 1</h2><ul><li><a href="#">Document 1</a></li><li><a href="#">Document 2</a></li><li><a href="#">Document 3</a></li></ul><h2>Doctype 2</h2><ul><li><a href="#">Document 1</a></li><li><a href="#">Document 2</a></li><li><a href="#">Document 3</a></li></ul></div>');
  }
  return buf.join("");
  };
});
