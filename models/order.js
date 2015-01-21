var mongoose = require('mongoose'), Schema = mongoose.Schema;
var Item = new Schema({
	createdAt: {type: Date, default: Date.now},
	name: [{type: String}]
});
var StockItem = new Schema({
	item: {type: Schema.Types.ObjectId, ref: "Item"},
	count: {type: Number},
	_id: false,
	id: false
});
mongoose.model("Order", new Schema({
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	items: [StockItem],
	stock: {type: Schema.Types.ObjectId, ref: "Stock"}
}));
