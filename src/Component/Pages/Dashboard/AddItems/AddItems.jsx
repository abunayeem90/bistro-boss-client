import { useForm } from "react-hook-form";
import SectionTitle from "../../../SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import Swal from 'sweetalert2'


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
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
            const menuRes = await axiosSecured.post('/menu', menuItem)
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                //show  success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been Added`,
                    showConfirmButton: false,
                    timer: 1500
                  });   
            }
        }
        console.log('with image url',res.data);
    }
    return (
        <div>
            <SectionTitle heading={'add an item'}
                subHeading={`What's new?`}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input {...register("name", {required: true})}
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
                        <select defaultValue="default" {...register("category", {required: true})}
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
                        <input {...register("price", {required: true})}
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
                        Add Item <FaUtensils className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;