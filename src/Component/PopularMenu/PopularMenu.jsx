import SectionTitle from "../SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";


const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category == 'popular')
   
    return (
        <section>
            <SectionTitle
            heading={"From Our Menu"}
            subHeading={"Popular Items"}
            ></SectionTitle>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 ">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="flex justify-center">
            <button className="btn btn-outline border-0 border-b-4">View Full  Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;