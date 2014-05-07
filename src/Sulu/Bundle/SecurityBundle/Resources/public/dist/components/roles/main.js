define(["sulusecurity/models/role"],function(a){"use strict";return{view:!0,name:"Sulu Security Role",initialize:function(){this.role=null,this.idDelete=null,this.loading="delete","list"===this.options.display?this.renderList():"form"===this.options.display&&this.renderForm(),this.bindCustomEvents()},bindCustomEvents:function(){this.sandbox.on("sulu.roles.new",function(){this.add()}.bind(this)),this.sandbox.on("sulu.roles.load",function(a){this.load(a)}.bind(this)),this.sandbox.on("sulu.roles.save",function(a){this.save(a)}.bind(this)),this.sandbox.on("sulu.role.delete",function(a){this.loading="delete",this.del(a)}.bind(this)),this.sandbox.on("sulu.roles.list",function(){this.sandbox.emit("sulu.router.navigate","settings/roles")}.bind(this)),this.sandbox.on("sulu.roles.delete",function(a){this.loading="add",this.del(a)}.bind(this))},add:function(){this.sandbox.emit("sulu.router.navigate","settings/roles/new")},load:function(a){this.sandbox.emit("sulu.router.navigate","settings/roles/edit:"+a+"/details")},save:function(a){this.sandbox.emit("sulu.header.toolbar.item.loading","save-button"),this.role.set(a),this.role.save(null,{success:function(a){this.options.id?this.sandbox.emit("sulu.role.saved",a.id):this.sandbox.emit("sulu.router.navigate","settings/roles/edit:"+a.id+"/details")}.bind(this),error:function(){this.sandbox.logger.log("An error occured while saving a role")}.bind(this)})},del:function(a){this.idDelete=a,this.confirmDeleteDialog(function(a){a&&(this.sandbox.emit("sulu.header.toolbar.item.loading","options-button"),"number"==typeof this.idDelete||"string"==typeof this.idDelete?this.delSubmitOnce(this.idDelete,!0):this.sandbox.util.each(this.idDelete,function(a,b){this.delSubmitOnce(b,!1)}.bind(this)))}.bind(this))},delSubmitOnce:function(b,c){null===this.role&&(this.role=new a),this.role.set({id:b}),this.role.destroy({success:function(){c?this.sandbox.emit("sulu.router.navigate","settings/roles"):this.sandbox.emit("husky.datagrid.row.remove",b)}.bind(this),error:function(){this.sandbox.emit("husky.header.button-state","standard")}.bind(this)})},renderList:function(){var a=this.sandbox.dom.createElement('<div id="roles-list-container"/>');this.html(a),this.sandbox.start([{name:"roles/components/list@sulusecurity",options:{el:a}}])},renderForm:function(){this.role=new a;var b=this.sandbox.dom.createElement('<div id="roles-form-container"/>'),c={name:"roles/components/form@sulusecurity",options:{el:b,data:this.role.defaults()}};this.html(b),this.options.id?(this.role.set({id:this.options.id}),this.role.fetch({success:function(a){c.options.data=a.toJSON(),this.sandbox.start([c])}.bind(this)})):this.sandbox.start([c])},confirmDeleteDialog:function(a){if(a&&"function"!=typeof a)throw"callback is not a function";this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.delete-desc",function(){a(!1)}.bind(this),function(){a(!0)}.bind(this))}}});