import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        author: {
            type: String,
        },
        price: Number,
        image: {
            type: String,
        },
        quantity: Number,
        description: {
            type: String,
            require: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    },
    { timestamps: true, versionKey: false },
);
productsSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productsSchema);
