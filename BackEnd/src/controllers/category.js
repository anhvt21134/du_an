import Joi from "joi";
import Products from "../model/products";
import Category from "../model/category"

const categorySchema = Joi.object({
    name: Joi.string().required(),
});

export const getAll = async (req, res) =>{
    try {
        const data  = await Category.find();
        if(data.length == 0){
            return res.json({
                message:"Không có sản phẩm nào",
            })
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async (req, res) =>{
    try {
        const id = req.params.id;
        const category = await Category.findOne({_id: id}).populate("products");
        console.log("category: ", category)
        if (category.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm"
            });
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

export const create = async (req, res) =>{
    try {
        const body = req.body;
        const { error } = categorySchema.validate(body);
        if(error){

            return res.json({
                message: error.details.map((item) => item.message),
            })
        }
        const data  = await Category.create(body);
        if(data.length === 0){
            return res.status(400).json({
                message:"Thêm sản phẩm thất bại"
            });
        }
        return res.status(200).json({
            message: "thêm sp thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const remove = async (req, res) =>{
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sân phẩm thành công",
            data,
        })
    } catch (error) {
    return res.status(404).json({
        message: error,
    });
    }
}

export const update = async (req, res ) =>{
    try {
        const data = await Category.findOneAndUpdate({_id:req.params.id}, req.body, {new:true});
        if(!data){
            return res.status(404).json({
                message: "Cập nhật sẩn phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sp thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}