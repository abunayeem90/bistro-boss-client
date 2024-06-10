import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecured from "../../../hooks/useAxiosSecured";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const {name, recipe, _id, category, price} = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic =useAxiosPublic();
    const axiosSecured = useAxiosSecured();
    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type' : 'multipart/form-data'
                
            }
        });
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            //
            const menuRes = await axiosSecured.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount > 0){
                //show  success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is Update to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });   
            }
        }
        console.log('with image url',res.data);
    }

    return (
        <div>
            <SectionTitle heading={'Update Item'} subHeading={'Update info'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input 
                        defaultValue={name}
                        {...register("name", {required: true})}
                        type="text" 
                        placeholder="Recipe Name" 
                        className="input input-bordered w-full" />
                        
                    </div>

                    <div className="flex gap-2">
                        {/* category */}
                        <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue={category} {...register("category", {required: true})}
                        className="select select-bordered w-full">
                        <option disabled value='default'>Selected a category</option>
                        <option value="salad">salad</option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                        <option value="dessert">dessert</option>
                        <option value="drinks">drinks</option>
                    </select>
                        
                    </div>

                        {/* Price */}
                        <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input 
                        defaultValue={price}
                        {...register("price", {required: true})}
                        type="number" 
                        placeholder="price" 
                        className="input input-bordered w-full" />
                        
                    </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea 
                        defaultValue={recipe}
                        {...register('recipe',{required: true})}
                        className="textarea textarea-bordered h-24" 
                        placeholder="Recipe Details"
                        ></textarea>
                    </div>
                    <div className="form-control w-full my-4">
                    <input {...register('image', {required: true})}
                    type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">
                       Update Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;