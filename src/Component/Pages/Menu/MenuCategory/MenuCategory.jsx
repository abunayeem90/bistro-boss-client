import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";


const MenuCategory = ({item, title, coverImg}) => {
    return (
        <div className="pt-8">
            {title && <Cover bgimg={coverImg} title={title}></Cover>}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mt-16">
                {
                    item.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link className="flex justify-center" to={`/order/${title}`}>
            <button className="btn btn-outline border-0 border-b-4 mt-4">
                ORDER YOUR FAVOURITE FOOD</button>
            </Link>
        </div>
    );
};

export default MenuCategory;