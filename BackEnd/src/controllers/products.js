import Joi from 'joi';
import Products from '../model/products';
import Category from '../model/category';

const productsSchema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    description: Joi.string(),
    image: Joi.string().required(),
    categoryId: Joi.string().required(),
});

export const getAll = async (req, res) => {
    const { _limit = 8, _sort = 'createAt', _order = 'asc', _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _sort == 'desc' ? -1 : 1,
        },
    };
    try {
        const data = await Products.paginate({}, options);
        if (data.length == 0) {
            return res.json({
                message: 'Không có sản phẩm nào',
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getAllAdmin = async (req, res) => {
    const { _limit = 1000, _sort = 'createAt', _order = 'asc', _page = 1 } = req.query;
    const options = {
        page: parseInt(_page, 10),
        limit: _limit,
        sort: {
            [_sort]: _sort == 'desc' ? -1 : 1,
        },
    };
    try {
        const data = await Products.paginate({}, options);
        if (data.length == 0) {
            return res.json({
                message: 'Không có sản phẩm nào',
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Products.findOne({ _id: id });
        // .populate('categoryId', '-_v');
        if (data.length === 0) {
            return res.status(200).json({
                message: 'Không có sản phẩm',
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const product = new Products({ ...body });
        console.log(product);
        const { error } = productsSchema.validate(body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        // const product = await Products.create(body);
        // const product = new Products({ ...body });
        // console.log(product);
        await product.save();

        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        if (product.length === 0) {
            return res.status(400).json({
                message: 'Thêm sản phẩm thất bại',
            });
        }
        return res.status(200).json({
            message: 'thêm sp thành công',
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const data = await Products.findByIdAndDelete(req.params.id);
        return res.json({
            message: 'Xóa sân phẩm thành công',
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const data = await Products.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                message: 'Cập nhật sẩn phẩm thất bại',
            });
        }
        return res.json({
            message: 'Cập nhật sp thành công',
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
